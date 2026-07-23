# Luzia Mary — mandato aberto

Site público e painel operacional da pré-candidatura de Luzia Mary a deputada federal. Stack: **Next.js (App Router)**, **Neon (PostgreSQL)**, **Drizzle ORM**, deploy na **Vercel**.

## Requisitos

- Node.js 20+ (recomendado)
- Conta Neon (banco) e Vercel (produção), quando for publicar

## Instalação

```bash
npm install
cp .env.example .env.local
```

Edite `.env.local` com os valores do ambiente (nunca versione esse arquivo).

## Variáveis de ambiente

| Variável | Uso |
|----------|-----|
| `DATABASE_URL` | Connection string do Neon (PostgreSQL). Sem ela, o site público usa conteúdo de fallback e o formulário de demandas fica desativado. |
| `NEXT_PUBLIC_SITE_URL` | URL canônica do site (sitemap, OG, ICS). Em produção, use o domínio oficial. |
| `AUTH_SECRET` | Segredo para assinar o cookie de sessão do painel (string longa e aleatória). |
| `ADMIN_EMAIL` | E-mail permitido no login administrativo. |
| `ADMIN_PASSWORD` | Senha em texto (apenas desenvolvimento / bootstrap). Prefira `ADMIN_PASSWORD_HASH` em produção. |
| `ADMIN_PASSWORD_HASH` | Hash bcrypt da senha do admin (recomendado). |

Modelo comentado: [`.env.example`](.env.example).

**Não** grave senhas, tokens ou connection strings no repositório, no README ou em issues.

## Banco de dados

- ORM: Drizzle (`src/db/schema.ts`)
- Cliente serverless Neon (`src/db/index.ts`)
- Sem `DATABASE_URL`, eventos do painel podem ir para store local em `.data/` (não usar como fonte de verdade em produção)

### Migrações / schema

```bash
# Gera SQL a partir do schema Drizzle
npm run db:generate

# Aplica o schema no banco apontado por DATABASE_URL
npm run db:push

# Popula dados iniciais (requer DATABASE_URL)
npm run db:seed
```

Fluxo típico local/produção (primeira vez):

1. Criar projeto no Neon e copiar a connection string para `DATABASE_URL`
2. `npm run db:push`
3. `npm run db:seed`
4. Configurar `AUTH_SECRET`, `ADMIN_EMAIL` e senha/hash

## Painel administrativo

- Login: `/admin/login`
- Áreas protegidas: `/admin` (demandas, propostas, compromissos, agenda, checagens, notícias)
- Sessão via cookie HTTP-only; rotas internas exigem login
- Metadata e header `X-Robots-Tag: noindex, nofollow` no `/admin` (não indexar o painel)

Configure as variáveis de autenticação antes de acessar. Sem banco, o painel mostra avisos e usa fallback onde aplicável; cadastros que dependem do Neon ficam indisponíveis.

## Comandos disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build (`next start`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm test` | Testes Vitest (fluxos críticos) |
| `npm run test:watch` | Vitest em modo watch |
| `npm run check` | lint → typecheck → test → build |
| `npm run db:generate` | Gera artefatos Drizzle Kit |
| `npm run db:push` | Empurra schema para o Neon |
| `npm run db:seed` | Seed inicial |

## Deploy na Vercel

1. Importe o repositório no [Vercel](https://vercel.com)
2. Framework: Next.js (detectado automaticamente)
3. Defina as variáveis de ambiente do projeto (Production / Preview)
4. Em Production, use `NEXT_PUBLIC_SITE_URL` com o domínio canônico (HTTPS)
5. Após o primeiro deploy com `DATABASE_URL`, rode `db:push` e `db:seed` a partir de uma máquina local (ou job CI) apontando para o mesmo banco — o `npm run build` na Vercel **não** aplica migrações sozinho
6. Confirme `/admin/login` e o site público após o deploy

Headers de segurança (CSP, HSTS, etc.) e o redirect `/demandas` → `/participe` estão em `next.config.ts`.

## Estrutura principal

```
src/
  app/
    (public)/          # Site público (home, sobre, propostas, agenda, participe…)
    admin/             # Login + painel protegido
    layout.tsx         # Layout raiz, fontes, metadata
    robots.ts
    sitemap.ts
  components/          # UI compartilhada (header, footer, formulários, admin…)
  config/              # Conteúdo e constantes (site, agenda, bandeiras, privacidade)
  db/                  # Schema e conexão Neon
  lib/                 # Dados, auth, agenda/ICS, demandas, JSON-LD…
  styles/              # CSS por página/componente (importados em globals.css)
tests/                 # Testes Vitest
scripts/               # Seed e utilitários
public/                # Assets estáticos (imagens, hero…)
```

## Site público sem banco

O site permanece navegável com propostas/conteúdo de fallback. Formulário de participação (`/participe`) e operações de escrita do painel exigem `DATABASE_URL` configurada.
