-- Conteúdo cadastrado no código (src/lib/conteudo.ts) aguardando migração
-- para o banco. Rode este arquivo no SQL Editor do painel Supabase.
-- A anon key é só leitura (RLS), então inserts precisam ser feitos por aqui.

-- Categoria nova: Institucional (CARDE + Murano)
insert into categorias (slug, nome, descricao, ordem)
values ('institucional', 'Institucional', 'Museus, marcas e espaços — o dia a dia contado em vídeo', 0)
on conflict (slug) do nothing;

-- ---- Institucional: CARDE ----
insert into videos (categoria_id, titulo, bunny_video_id, ordem)
select id, v.titulo, v.guid, v.ordem
from categorias,
  (values
    -- fora do ar até o CARDE postar:
    -- ('Acervo em Movimento', '0a5237fc-9d20-429a-86e4-d04781d131ca', 1),
    ('Mercedes SL600', '4837ba90-68de-4753-9e37-2582f0ebeb43', 2),
    -- fora do ar por enquanto (Miguel, 02/07/2026):
    -- ('Noite no Museu', '0eee6fa5-9e16-4c07-9b5f-12f4a37ef76e', 3),
    -- ('Escola de Restauro', '32e78dff-4bc0-4bb0-bc86-f355e9088c4c', 4),
    ('Anoitecer na Murano', '09edf0af-4016-4a9e-8792-3c9329184556', 5),
    ('Café na Murano', 'dc6cf4b4-b532-4518-9ef7-e228ae43943b', 6),
    ('Experiência Murano', 'cdfd47bf-5db4-46fc-bc5e-213ab092e3cd', 7)
  ) as v(titulo, guid, ordem)
where categorias.slug = 'institucional'
on conflict do nothing;

-- ---- Casamento ----
insert into videos (categoria_id, titulo, bunny_video_id, ordem)
select id, v.titulo, v.guid, v.ordem
from categorias,
  (values
    ('Vivi & André', 'f41865ac-2238-46d8-9882-741672a84c6c', 1),
    ('Brenda & Mariana', '573e11e3-6261-44ae-b1d7-76c60b354d03', 2)
  ) as v(titulo, guid, ordem)
where categorias.slug = 'casamento'
on conflict do nothing;

-- ---- Social Media ----
-- fora do ar por enquanto: 'Barbearia' guid 167d85bc-4332-4504-9b4c-23772c3fab04
insert into videos (categoria_id, titulo, bunny_video_id, ordem)
select id, v.titulo, v.guid, v.ordem
from categorias,
  (values
    ('Mobility Gym', '8df6b068-40f9-4481-af21-b7624680a44a', 2)
  ) as v(titulo, guid, ordem)
where categorias.slug = 'social'
on conflict do nothing;
