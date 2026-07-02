# CLAUDE.md — Build to Learn

Espaço de aprendizado e prática de desenvolvimento. Cada projeto fica documentado aqui enquanto ativo; ao concluir, o bloco é colapsado com status `CONCLUIDO` para referência futura sem poluir o contexto.

---

## Como o Claude deve se comportar

- Sempre usar **português brasileiro**
- Foco em ensinar e explicar conceitos enquanto constrói
- Confirmar antes de operações destrutivas
- **Aprender os gostos e preferências do Miguel ao longo do projeto** — anotar decisões de estilo, escolhas visuais e opiniões em memória para aplicar em decisões futuras

---

## Regras de trabalho — válidas para todos os projetos

### 1. Segurança antes de execução
Antes de executar qualquer comando ou bloco de código fornecido pelo usuário:
- Analisar o código e verificar se é seguro (sem injeção, sem risco de dados, sem dependências suspeitas)
- Avaliar se é a melhor abordagem para o objetivo
- Reportar ao Miguel: "Seguro / Tem risco X / Sugiro alternativa Y"
- Só executar após aprovação

### 2. Commits em marcos grandes
Após cada marco significativo (estrutura criada, feature completa, página funcionando):
- Fazer commit com mensagem descritiva
- Push para o repositório no GitHub

### 3. Confirmação antes de impacto
Qualquer alteração que afete o site visualmente ou funcionalmente:
- Descrever o que vai mudar
- Perguntar: "Posso prosseguir?"
- Só executar após confirmação

### 4. Aprendizado contínuo
- Registrar preferências do Miguel (cores, fontes, estilo, decisões) em memória
- Aplicar essas preferências em sugestões futuras sem precisar perguntar de novo

### 5. Squads (agentes especializados)
Pasta `Squads/` contém prompts de squads especializados. Quando for conveniente, usar o Agent tool carregando o prompt do squad relevante:
- **Design Squad** (`09-design-squad.md`) — decisões de UI/UX, design system, acessibilidade
- **Brand Squad** (`02-brand-squad.md`) — identidade visual, posicionamento, paleta de cores
- **Cybersecurity** (`07-cybersecurity.md`) — auditar segurança do código e dependências
- **Copy Master** (`05-copy-master.md`) — textos do site, CTAs, micro-copy
- **Storytelling** (`12-storytelling.md`) — narrativa do portfólio, ordem dos vídeos
- **Claude Code Mastery** (`04-claude-code-mastery.md`) — otimizar o próprio workflow de desenvolvimento

---

# PROJETOS

---

## [EM ANDAMENTO] Portfólio de Vídeos — Miguel Edits

**Objetivo:** Site portfólio profissional para exibir vídeos editados por Miguel, organizado por categorias de serviço.

**Contato WhatsApp:** 12997917416 (rodapé "Fale comigo")

**Repositório:** `Tysuiu/Build-to-learn` (pasta `portfolio/`)

**Pasta local:** `~/Documents/Build to learn/portfolio/`

### Stack

| Tecnologia | Função |
|---|---|
| **Next.js** (React + TypeScript) | Framework do site — rotas, SSR, SEO |
| **Tailwind CSS** | Estilização responsiva |
| **Bunny.net** | Hospedagem e streaming dos vídeos |
| **Supabase** | Banco de dados (categorias, vídeos, metadados) |
| **Vercel** | Hospedagem do site (deploy automático via GitHub) |

### Estrutura do site

```
/                        → Landing page / dashboard com categorias
/categoria/casamento     → Página da categoria com vídeos
/categoria/[slug]        → Qualquer categoria (dinâmica)
```

Cada categoria é uma "pasta" visual. Ao clicar, abre uma página dedicada com os vídeos daquela categoria. Botão de voltar para o dashboard sempre visível. Rodapé com "Fale comigo" → link direto para WhatsApp.

### Etapas do projeto

#### Etapa 1 — Fundação e regras (Claude)
- [x] Definir como o Claude trabalha neste projeto
- [x] Documentar regras de segurança, commits e confirmações
- [x] Escrever CLAUDE.md completo
- [x] Criar repositório no GitHub
- [x] Inicializar projeto Next.js + Tailwind

#### Etapa 2 — Arquitetura e backend
- [x] Configurar Supabase (tabelas `categorias` e `videos`, RLS leitura pública) — `supabase/schema.sql`
- [x] Integrar Bunny.net Stream (helper de URLs em `src/lib/bunny.ts`, player via iframe) — upload de vídeos é manual pelo painel Bunny
- [x] Criar estrutura de rotas (dashboard `/` → categoria `/categoria/[slug]` → vídeos)
- [x] Implementar lógica de dados (`src/lib/data.ts`)
- [x] Botão "Fale comigo" no rodapé → WhatsApp (`src/components/Footer.tsx`)

**Notas técnicas:**
- Next.js 16.2.9: `params` em rotas dinâmicas é `Promise` — sempre `await params`
- Chaves em `portfolio/.env.local` (NÃO versionado): URL+anon do Supabase, Library ID + CDN Hostname + API Key do Bunny
- Dados de exemplo: 3 categorias (Casamento, Corporativo, Social Media) inseridas via schema.sql
- **Upload de vídeo pro Bunny funciona via API** (POST cria o vídeo → PUT do binário com `AccessKey`): não precisa do painel. 1º vídeo real: "Acervo em Movimento" (CARDE), guid `0a5237fc-9d20-429a-86e4-d04781d131ca`
- Anon key do Supabase **não permite INSERT** (RLS leitura) → vídeos novos entram em `src/lib/conteudo.ts` (mesclados em `data.ts`) e o SQL de migração fica em `supabase/inserts_videos.sql` para rodar no painel
- Acesso direto a `thumbnail.jpg`/HLS do Bunny retorna 403 (proteção da library) — só o embed funciona; OG image é frame local (`public/og.jpg`)

#### Etapa 3 — Design e identidade visual
- [x] Referências pesquisadas pelo Claude na web (padrões: dark cinematográfico, hero com reel, grid curado, mobile-first) — v1 aplicada, aguardando aval do Miguel
- [x] Fontes e paleta v1: Space Grotesk (display) + Geist (texto); fundo #0a0a0b, dourado #e0aa3e de acento, verde só no WhatsApp
- [x] Design aplicado nas páginas (home: nav fixa com blur, hero com reel 9:16 em autoplay, grid de categorias, seção "Cada detalhe conta"; categoria: cards 9:16/16:9 conforme formato)
- [x] Responsividade mobile-first
- [ ] Revisão do design com Miguel (ajustes de gosto)

#### Etapa 4 — Deploy e domínio
- [ ] Conectar repositório à Vercel
- [ ] Primeiro deploy (preview)
- [ ] Configurar domínio personalizado (se tiver)
- [ ] SSL e configurações de produção

#### Etapa 5 — Polish e lançamento
- [x] Lazy loading dos vídeos (performance) — `loading="lazy"` nos iframes das categorias
- [x] SEO básico (meta tags pt-BR + Open Graph com frame do reel em `public/og.jpg`)
- [ ] Testes em mobile e desktop
- [ ] Revisão final com Miguel
- [ ] Publicação oficial

### Referências visuais
Pesquisa web (02/07/2026): consenso entre portfólios de editores — tema escuro espaçoso deixando o vídeo como protagonista, hero reel no topo, grade curada (3 ótimos > 10 medianos), papel claro em cada projeto, CTA de contato direto, mobile-first. Fontes: sitebuilderreport.com, lesfm.net, templyo.io.

### Preferências aprendidas
- Vídeos verticais (Reels) devem aparecer em moldura 9:16 tipo celular — formato nativo do trabalho
- Identidade v1 proposta pelo Claude (dourado + dark) inspirada no universo dos clientes (museu CARDE, carros clássicos) — **pendente aval do Miguel**

---

<!-- 
## [CONCLUIDO] Nome do Projeto
Resumo em 1-2 linhas do que foi feito.
Stack: X, Y, Z
Concluído em: DD/MM/AAAA
-->
