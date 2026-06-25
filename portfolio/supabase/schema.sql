-- ============================================================
--  PORTFÓLIO — SCHEMA DO BANCO (Supabase / PostgreSQL)
--  Rode este SQL no painel do Supabase: SQL Editor → New query → Run
-- ============================================================

-- ---------- Tabela: categorias ----------
-- Cada serviço (Casamento, Corporativo, etc.) é uma categoria.
create table if not exists public.categorias (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,            -- usado na URL: /categoria/casamento
  nome        text not null,                   -- exibido na tela: "Casamento"
  descricao   text,
  capa_url    text,                            -- thumbnail da categoria no dashboard
  ordem       int  not null default 0,         -- ordem de exibição
  criado_em   timestamptz not null default now()
);

-- ---------- Tabela: videos ----------
-- Cada vídeo pertence a uma categoria e aponta para um vídeo no Bunny Stream.
create table if not exists public.videos (
  id              uuid primary key default gen_random_uuid(),
  categoria_id    uuid not null references public.categorias(id) on delete cascade,
  titulo          text not null,
  bunny_video_id  text not null,               -- GUID do vídeo no Bunny Stream
  ordem           int  not null default 0,     -- ordem dentro da categoria
  criado_em       timestamptz not null default now()
);

-- Índice para buscar vídeos por categoria rapidamente
create index if not exists idx_videos_categoria on public.videos(categoria_id);

-- ============================================================
--  SEGURANÇA (Row Level Security)
--  Portfólio é público para LEITURA. Ninguém pode escrever pela
--  anon key — alterações só pelo painel do Supabase (service_role).
-- ============================================================

alter table public.categorias enable row level security;
alter table public.videos     enable row level security;

-- Permite que qualquer visitante LEIA as categorias e vídeos.
create policy "leitura publica de categorias"
  on public.categorias for select
  using (true);

create policy "leitura publica de videos"
  on public.videos for select
  using (true);

-- (Sem políticas de insert/update/delete = ninguém escreve pela anon key.)

-- ============================================================
--  DADOS DE EXEMPLO (opcional — pode apagar depois)
-- ============================================================
insert into public.categorias (slug, nome, descricao, ordem) values
  ('casamento',   'Casamento',   'Filmagens e edições de casamentos',        1),
  ('corporativo', 'Corporativo', 'Vídeos institucionais e de eventos',       2),
  ('social',      'Social Media','Reels, TikToks e conteúdo vertical',        3)
on conflict (slug) do nothing;
