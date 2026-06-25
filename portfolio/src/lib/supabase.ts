import { createClient } from "@supabase/supabase-js";

// Lê as chaves do .env.local. As variáveis NEXT_PUBLIC_ ficam disponíveis
// tanto no servidor quanto no navegador — seguro, pois a anon key só permite
// o que as políticas (RLS) do Supabase autorizarem.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ----- Tipos das tabelas (espelham o schema do banco) -----

export type Categoria = {
  id: string;
  slug: string; // ex: "casamento" — usado na URL /categoria/casamento
  nome: string; // ex: "Casamento" — exibido na tela
  descricao: string | null;
  capa_url: string | null; // thumbnail da categoria no dashboard
  ordem: number; // ordem de exibição no dashboard
  criado_em: string;
};

export type Video = {
  id: string;
  categoria_id: string;
  titulo: string;
  bunny_video_id: string; // GUID do vídeo no Bunny Stream
  ordem: number; // ordem dentro da categoria
  criado_em: string;
};
