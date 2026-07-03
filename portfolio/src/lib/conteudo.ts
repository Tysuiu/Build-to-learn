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
  {
    id: "local-eventos",
    slug: "eventos",
    nome: "Eventos",
    descricao: "De Paris a Campos do Jordão — a energia do evento em vídeo",
    capa_url: null,
    ordem: 1,
    criado_em: "",
  },
];

export const VIDEOS_LOCAIS: VideoLocal[] = [
  // ---- Institucional: CARDE (Museu do Automóvel) ----
  // "Acervo em Movimento" fora do ar até o CARDE postar (não publicar antes
  // do cliente) — guid 0a5237fc-9d20-429a-86e4-d04781d131ca continua no Bunny.
  {
    id: "local-filho-da-humanidade",
    categoria_slug: "institucional",
    titulo: "O Filho da Humanidade",
    cliente: "Fundação Lia Maria Aguiar",
    bunny_video_id: "cd7e6826-2690-4fa7-a8ca-158886172f18",
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
  // Fora do ar por decisão do Miguel (03/07/2026) — vídeos continuam no Bunny:
  //   "ASMR F50"            guid 0afa01e1-15a1-4029-bcc7-6731bf547a99
  //   "Anoitecer na Murano" guid 09edf0af-4016-4a9e-8792-3c9329184556
  //   "Café na Murano"      guid dc6cf4b4-b532-4518-9ef7-e228ae43943b
  //   "Experiência Murano"  guid cdfd47bf-5db4-46fc-bc5e-213ab092e3cd

  // ---- Eventos ----
  {
    id: "local-paris-retromobile",
    categoria_slug: "eventos",
    titulo: "Paris Rétromobile",
    cliente: "Evento em Paris, França",
    bunny_video_id: "d2279cf4-eacc-4f95-bf9f-2e937ad4ce66",
    vertical: true,
    ordem: 1,
  },
  {
    id: "local-corso-carnavalesco",
    categoria_slug: "eventos",
    titulo: "Corso Carnavalesco",
    cliente: "Carnaval 2026",
    bunny_video_id: "524766ac-6191-48e2-82a1-984e30d42388",
    vertical: true,
    ordem: 2,
  },
  // ---- Casamento ----
  // Versão horizontal 1920x1080 original (sem re-encode). A "vertical"
  // (guid f41865ac-2238-46d8-9882-741672a84c6c) está com os pixels
  // rotacionados dentro do arquivo e toca deitada — fora do ar.
  {
    id: "local-vivi-andre",
    categoria_slug: "casamento",
    titulo: "Vivi & André",
    bunny_video_id: "1e02f337-ce6b-41b3-9025-74ea0890f250",
    vertical: false,
    ordem: 1,
  },
  // Fora do ar por decisão do Miguel (03/07/2026) — continua no Bunny:
  //   "Brenda & Mariana" (Pré-Wedding) guid 573e11e3-6261-44ae-b1d7-76c60b354d03

  // ---- Social Media ----
  // Categoria retirada da home por decisão do Miguel (03/07/2026) — sem
  // vídeos locais ela não aparece (mesma regra que oculta a Corporativo).
  // "Barbearia" fora do ar (nome do cliente não identificado p/ marcar) —
  // guid 167d85bc-4332-4504-9b4c-23772c3fab04 continua no Bunny.
  // "Mobility Gym" fora do ar junto com a categoria —
  // guid 8df6b068-40f9-4481-af21-b7624680a44a continua no Bunny.
];

// Formação — cursos e imersões (também vira base para o LinkedIn do Miguel).
export type Curso = {
  nome: string;
  escola: string;
  status: "concluído" | "em andamento";
};

export const CURSOS: Curso[] = [
  {
    nome: "Filmmaker Pro — DaVinci Resolve do Básico ao Avançado",
    escola: "Curso completo de edição",
    status: "concluído",
  },
  {
    nome: "Color Pro Express",
    escola: "Marcelo Santana",
    status: "em andamento",
  },
  {
    nome: "Imersão: O Guia Completo do Sound Design de Filmes e Séries",
    escola: "Áudio Didata",
    status: "em andamento",
  },
];

// Capas dos cards de categoria na home — frames extraídos dos próprios
// vídeos (ffmpeg), servidos de public/capas/. Se a categoria tiver
// capa_url no banco, o banco vence.
export const CAPAS_LOCAIS: Record<string, string> = {
  institucional: "/capas/institucional.jpg",
  eventos: "/capas/eventos.jpg",
  casamento: "/capas/casamento.jpg",
  social: "/capas/social.jpg",
};

// Vídeo em destaque no topo da home (hero) — toca inteiro, mudo, em loop.
export const DESTAQUE = {
  bunny_video_id: "1e02f337-ce6b-41b3-9025-74ea0890f250",
  titulo: "Vivi & André",
  cliente: "Casamento",
  vertical: false,
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
