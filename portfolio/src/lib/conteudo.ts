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

// Categorias que ainda não existem no banco (a anon key não insere) — são
// mescladas com as do Supabase em data.ts. SQL de migração no mesmo arquivo.
export const CATEGORIAS_LOCAIS = [
  {
    id: "local-institucional",
    slug: "institucional",
    nome: "Institucional",
    descricao: "Museus, marcas e espaços — o dia a dia contado em vídeo",
    capa_url: null,
    ordem: 0, // primeira da home: é o corpo principal do portfólio hoje
    criado_em: "",
  },
];

export const VIDEOS_LOCAIS: VideoLocal[] = [
  // ---- Institucional: CARDE (Museu do Automóvel) ----
  {
    id: "local-acervo-em-movimento",
    categoria_slug: "institucional",
    titulo: "Acervo em Movimento",
    cliente: "CARDE — Museu do Automóvel",
    bunny_video_id: "0a5237fc-9d20-429a-86e4-d04781d131ca",
    vertical: true,
    ordem: 1,
  },
  {
    id: "local-mercedes-sl600",
    categoria_slug: "institucional",
    titulo: "Mercedes SL600",
    cliente: "CARDE — Museu do Automóvel",
    bunny_video_id: "4837ba90-68de-4753-9e37-2582f0ebeb43",
    vertical: true,
    ordem: 2,
  },
  // Fora do ar por decisão do Miguel (02/07/2026) — vídeos continuam no Bunny:
  //   "Noite no Museu"      guid 0eee6fa5-9e16-4c07-9b5f-12f4a37ef76e
  //   "Escola de Restauro"  guid 32e78dff-4bc0-4bb0-bc86-f355e9088c4c

  // ---- Institucional: Murano Pousada Boutique ----
  {
    id: "local-murano-noite",
    categoria_slug: "institucional",
    titulo: "Anoitecer na Murano",
    cliente: "Murano Pousada Boutique",
    bunny_video_id: "09edf0af-4016-4a9e-8792-3c9329184556",
    vertical: true,
    ordem: 5,
  },
  {
    id: "local-cafe-murano",
    categoria_slug: "institucional",
    titulo: "Café na Murano",
    cliente: "Murano Pousada Boutique",
    bunny_video_id: "dc6cf4b4-b532-4518-9ef7-e228ae43943b",
    vertical: true,
    ordem: 6,
  },
  {
    id: "local-ensaio-murano",
    categoria_slug: "institucional",
    titulo: "Experiência Murano",
    cliente: "Murano Pousada Boutique",
    bunny_video_id: "cdfd47bf-5db4-46fc-bc5e-213ab092e3cd",
    vertical: true,
    ordem: 7,
  },
  // ---- Casamento ----
  {
    id: "local-vivi-andre",
    categoria_slug: "casamento",
    titulo: "Vivi & André",
    bunny_video_id: "f41865ac-2238-46d8-9882-741672a84c6c",
    vertical: true,
    ordem: 1,
  },
  {
    id: "local-pre-wedding",
    categoria_slug: "casamento",
    titulo: "Pré-Wedding",
    bunny_video_id: "573e11e3-6261-44ae-b1d7-76c60b354d03",
    vertical: true,
    ordem: 2,
  },
  // ---- Social Media ----
  {
    id: "local-barbearia",
    categoria_slug: "social",
    titulo: "Barbearia",
    bunny_video_id: "167d85bc-4332-4504-9b4c-23772c3fab04",
    vertical: true,
    ordem: 1,
  },
  {
    id: "local-academia",
    categoria_slug: "social",
    titulo: "Mobility Gym",
    cliente: "Mobility GYM — Personal Club · Campos do Jordão",
    bunny_video_id: "8df6b068-40f9-4481-af21-b7624680a44a",
    vertical: true,
    ordem: 2,
  },
];

// Capas dos cards de categoria na home — frames extraídos dos próprios
// vídeos (ffmpeg), servidos de public/capas/. Se a categoria tiver
// capa_url no banco, o banco vence.
export const CAPAS_LOCAIS: Record<string, string> = {
  institucional: "/capas/institucional.jpg",
  casamento: "/capas/casamento.jpg",
  social: "/capas/social.jpg",
};

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
