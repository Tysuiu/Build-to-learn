-- Vídeos cadastrados no código (src/lib/conteudo.ts) aguardando migração
-- para o banco. Rode este arquivo no SQL Editor do painel Supabase.
-- A anon key é só leitura (RLS), então inserts precisam ser feitos por aqui.

-- ACERVO EM MOVIMENTO — CARDE (Reel vertical, Bunny guid abaixo)
insert into videos (categoria_id, titulo, bunny_video_id, ordem)
select id, 'Acervo em Movimento', '0a5237fc-9d20-429a-86e4-d04781d131ca', 1
from categorias
where slug = 'social'
on conflict do nothing;
