import { supabase, type Categoria, type Video } from "./supabase";
import {
  VIDEOS_LOCAIS,
  CATEGORIAS_LOCAIS,
  CATEGORIAS_FALLBACK,
  type VideoLocal,
} from "./conteudo";

// Vídeo pronto para exibição: união do que vem do banco com os campos extras
// do conteúdo local (formato vertical, nome do cliente).
export type VideoExibicao = Pick<Video, "id" | "titulo" | "bunny_video_id" | "ordem"> & {
  vertical: boolean;
  cliente?: string;
};

// Todas as categorias: banco + locais, sem duplicar slug, ordenadas.
// Se o Supabase estiver fora do ar, usa o fallback local — o site nunca abre vazio.
async function getTodasCategorias(): Promise<Categoria[]> {
  let doBanco: Categoria[] = [];
  try {
    const { data, error } = await supabase
      .from("categorias")
      .select("*")
      .order("ordem", { ascending: true });
    if (error) throw error;
    doBanco = data ?? [];
  } catch {
    doBanco = [];
  }
  if (doBanco.length === 0) doBanco = CATEGORIAS_FALLBACK;

  const slugsDoBanco = new Set(doBanco.map((c) => c.slug));
  const locais = CATEGORIAS_LOCAIS.filter((c) => !slugsDoBanco.has(c.slug));

  return [...doBanco, ...locais].sort((a, b) => a.ordem - b.ordem);
}

// Categorias exibidas na home: só as que têm pelo menos um vídeo —
// pasta vazia não aparece no portfólio.
export async function getCategorias(): Promise<Categoria[]> {
  const todas = await getTodasCategorias();

  let idsComVideo = new Set<string>();
  try {
    const { data } = await supabase.from("videos").select("categoria_id");
    idsComVideo = new Set((data ?? []).map((v) => v.categoria_id));
  } catch {
    // sem banco, só os locais contam
  }
  const slugsLocais = new Set(VIDEOS_LOCAIS.map((v) => v.categoria_slug));

  return todas.filter(
    (c) => idsComVideo.has(c.id) || slugsLocais.has(c.slug)
  );
}

// Busca uma categoria pelo slug (ex: "casamento").
export async function getCategoriaPorSlug(
  slug: string
): Promise<Categoria | null> {
  const todas = await getTodasCategorias();
  return todas.find((c) => c.slug === slug) ?? null;
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
        vertical: local?.vertical ?? true,
        cliente: local?.cliente,
      };
    }),
    ...soLocais.map(localParaExibicao),
  ];

  return mesclados.sort((a, b) => a.ordem - b.ordem);
}
