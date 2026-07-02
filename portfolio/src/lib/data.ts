import { supabase, type Categoria, type Video } from "./supabase";
import {
  VIDEOS_LOCAIS,
  CATEGORIAS_FALLBACK,
  type VideoLocal,
} from "./conteudo";

// Vídeo pronto para exibição: união do que vem do banco com os campos extras
// do conteúdo local (formato vertical, nome do cliente).
export type VideoExibicao = Pick<Video, "id" | "titulo" | "bunny_video_id" | "ordem"> & {
  vertical: boolean;
  cliente?: string;
};

// Busca todas as categorias, ordenadas pelo campo "ordem".
// Se o Supabase estiver fora do ar, usa o fallback local — o site nunca abre vazio.
export async function getCategorias(): Promise<Categoria[]> {
  try {
    const { data, error } = await supabase
      .from("categorias")
      .select("*")
      .order("ordem", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return CATEGORIAS_FALLBACK;
    return data;
  } catch {
    return CATEGORIAS_FALLBACK;
  }
}

// Busca uma categoria pelo slug (ex: "casamento").
export async function getCategoriaPorSlug(
  slug: string
): Promise<Categoria | null> {
  try {
    const { data, error } = await supabase
      .from("categorias")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (data) return data;
  } catch {
    // cai no fallback abaixo
  }
  return CATEGORIAS_FALLBACK.find((c) => c.slug === slug) ?? null;
}

function localParaExibicao(v: VideoLocal): VideoExibicao {
  return {
    id: v.id,
    titulo: v.titulo,
    bunny_video_id: v.bunny_video_id,
    ordem: v.ordem,
    vertical: v.vertical,
    cliente: v.cliente,
  };
}

// Busca os vídeos de uma categoria e mescla com os vídeos locais
// (cadastrados em src/lib/conteudo.ts enquanto o banco é só leitura).
export async function getVideosPorCategoria(
  categoria: Pick<Categoria, "id" | "slug">
): Promise<VideoExibicao[]> {
  const locais = VIDEOS_LOCAIS.filter(
    (v) => v.categoria_slug === categoria.slug
  );

  let doBanco: Video[] = [];
  try {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .eq("categoria_id", categoria.id)
      .order("ordem", { ascending: true });
    if (error) throw error;
    doBanco = data ?? [];
  } catch {
    doBanco = [];
  }

  // Dedupe pelo id do Bunny: se o vídeo já foi migrado para o banco,
  // a versão do banco vence.
  const idsDoBanco = new Set(doBanco.map((v) => v.bunny_video_id));
  const soLocais = locais.filter((v) => !idsDoBanco.has(v.bunny_video_id));

  const mesclados: VideoExibicao[] = [
    ...doBanco.map((v) => {
      const local = locais.find((l) => l.bunny_video_id === v.bunny_video_id);
      return {
        id: v.id,
        titulo: v.titulo,
        bunny_video_id: v.bunny_video_id,
        ordem: v.ordem,
        vertical: local?.vertical ?? categoria.slug === "social",
        cliente: local?.cliente,
      };
    }),
    ...soLocais.map(localParaExibicao),
  ];

  return mesclados.sort((a, b) => a.ordem - b.ordem);
}
