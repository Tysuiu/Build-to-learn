import { supabase, type Categoria, type Video } from "./supabase";

// Busca todas as categorias, ordenadas pelo campo "ordem".
export async function getCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("ordem", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

// Busca uma categoria pelo slug (ex: "casamento").
export async function getCategoriaPorSlug(
  slug: string
): Promise<Categoria | null> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Busca os vídeos de uma categoria, ordenados pelo campo "ordem".
export async function getVideosPorCategoria(
  categoriaId: string
): Promise<Video[]> {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("categoria_id", categoriaId)
    .order("ordem", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
