// Conteúdo local do portfólio.
//
// O Supabase é a fonte principal de dados, mas a anon key só tem permissão de
// LEITURA (RLS) — então vídeos novos cadastrados pelo Claude/código entram
// primeiro aqui e são mesclados com o banco em data.ts. Para migrar um vídeo
// daqui para o banco, rode o SQL em supabase/inserts_videos.sql no painel.

export type VideoLocal = {
  id: string; // id sintético estável (prefixo "local-")
  categoria_slug: string;
  titulo: string;
  cliente?: string;
  bunny_video_id: string;
  vertical: boolean; // true = Reel/TikTok 9:16, false = horizontal 16:9
  ordem: number;
};

export const VIDEOS_LOCAIS: VideoLocal[] = [
  {
    id: "local-acervo-em-movimento",
    categoria_slug: "social",
    titulo: "Acervo em Movimento",
    cliente: "CARDE — Museu do Automóvel",
    bunny_video_id: "0a5237fc-9d20-429a-86e4-d04781d131ca",
    vertical: true,
    ordem: 1,
  },
];

// Vídeo em destaque no topo da home (hero).
export const DESTAQUE = {
  bunny_video_id: "0a5237fc-9d20-429a-86e4-d04781d131ca",
  titulo: "Acervo em Movimento",
  cliente: "CARDE — Museu do Automóvel",
  vertical: true,
};

// Fallback das categorias caso o Supabase esteja fora do ar — o site nunca
// abre vazio. Espelha o seed de supabase/schema.sql.
export const CATEGORIAS_FALLBACK = [
  {
    id: "fallback-casamento",
    slug: "casamento",
    nome: "Casamento",
    descricao: "Filmagens e edições de casamentos",
    capa_url: null,
    ordem: 1,
    criado_em: "",
  },
  {
    id: "fallback-corporativo",
    slug: "corporativo",
    nome: "Corporativo",
    descricao: "Vídeos institucionais e de eventos",
    capa_url: null,
    ordem: 2,
    criado_em: "",
  },
  {
    id: "fallback-social",
    slug: "social",
    nome: "Social Media",
    descricao: "Reels, TikToks e conteúdo vertical",
    capa_url: null,
    ordem: 3,
    criado_em: "",
  },
];
