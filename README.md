# Mandato Aberto

Plataforma completa de campanha e participação pública, construída com **Next.js 16**, **React 19**, **Neon Postgres**, **Drizzle ORM**, **Tailwind CSS 4** e pronta para publicação na **Vercel**.

## O que está incluído

### Site público

- página inicial premium e responsiva;
- apresentação da candidata;
- propostas por tema e páginas detalhadas;
- painel público de compromissos e progresso;
- formulário de demandas com protocolo automático;
- estatísticas agregadas, sem expor dados pessoais;
- agenda pública;
- notícias e posicionamentos;
- central “Verdade ou boato” com fontes;
- página de transparência;
- política de privacidade inicial;
- sitemap, robots e metadados para compartilhamento.

### Painel administrativo

- autenticação por e-mail e senha com sessão assinada;
- visão geral com indicadores;
- gestão e classificação de demandas;
- cadastro de propostas;
- cadastro de compromissos;
- cadastro de eventos;
- cadastro de checagens;
- cadastro de notícias.

> O painel foi pensado como base operacional segura e simples. Para uma equipe grande, recomenda-se evoluir para autenticação com múltiplos usuários, funções, logs de auditoria e autenticação em dois fatores.

## Instalação local

```bash
npm install
cp .env.example .env.local
```

Edite `.env.local` com as credenciais do Neon e do painel.

Depois:

```bash
npm run db:push
npm run db:seed
npm run dev
```

Acesse:

- site: `http://localhost:3000`
- painel: `http://localhost:3000/admin`

## Configurando o Neon

1. Crie um projeto no Neon.
2. Copie a connection string Postgres com `sslmode=require`.
3. Cole em `DATABASE_URL`.
4. Execute `npm run db:push` para criar as tabelas.
5. Execute `npm run db:seed` para inserir conteúdo inicial.

O cliente do banco é inicializado de forma preguiçosa, evitando falhas durante o build quando as variáveis ainda não estão disponíveis.

## Publicando no GitHub e Vercel

1. Crie um repositório vazio no GitHub.
2. Extraia o ZIP e envie todos os arquivos, exceto `node_modules` e `.next`.
3. Na Vercel, importe o repositório.
4. Adicione as variáveis:
   - `NEXT_PUBLIC_SITE_URL`
   - `DATABASE_URL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD` ou `ADMIN_PASSWORD_HASH`
   - `AUTH_SECRET`
5. Faça o deploy.
6. No terminal local, com a mesma `DATABASE_URL`, execute `npm run db:push` e `npm run db:seed`.

Também é possível instalar o Neon pelo Marketplace da Vercel e usar a variável de conexão criada pela integração.

## Senha administrativa

Para começar, o projeto aceita `ADMIN_PASSWORD`. Em produção, prefira um hash bcrypt:

```bash
node -e "console.log(require('bcryptjs').hashSync('SUA-SENHA-FORTE', 12))"
```

Cole o resultado em `ADMIN_PASSWORD_HASH` e remova `ADMIN_PASSWORD`.

Gere o segredo da sessão:

```bash
openssl rand -base64 48
```

## Personalização

Leia:

- `CUSTOMIZACAO.md`
- `CHECKLIST-LANCAMENTO.md`

O principal arquivo é `src/config/site.ts`. Nele você troca nome, número, partido, slogan, biografia, contatos e redes sociais sem mexer na estrutura das páginas.

## Comandos

```bash
npm run dev          # desenvolvimento
npm run lint         # análise estática
npm run typecheck    # validação TypeScript
npm run build        # build de produção
npm run check        # lint + typecheck + build
npm run db:push      # sincroniza o schema com Neon
npm run db:seed      # insere conteúdo inicial
```

## Privacidade e conformidade

Este projeto fornece recursos técnicos, não substitui revisão jurídica. Antes do lançamento:

- revise a política de privacidade;
- defina base legal, retenção e atendimento aos titulares;
- valide todos os textos e fluxos com o jurídico eleitoral;
- não importe listas compradas ou bases institucionais;
- não publique dados pessoais recebidos no formulário;
- mantenha registros de consentimento para comunicações;
- revise conteúdos produzidos com IA e aplique a identificação exigida.

## Estrutura principal

```text
src/
  app/
    (public)/             páginas públicas
    admin/                painel e autenticação
  components/             interface reutilizável
  config/site.ts          dados e identidade da candidata
  db/                     schema e conexão Neon
  lib/                    autenticação, dados e utilidades
scripts/seed.ts            conteúdo inicial
drizzle.config.ts          configuração do banco
```

## Estado do projeto

A aplicação funciona visualmente sem banco usando dados demonstrativos. Formulários e painel de conteúdo passam a operar depois que `DATABASE_URL` é configurada e o schema é criado.
