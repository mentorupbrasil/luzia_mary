import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { commitments, events, factChecks, posts, proposals } from "../src/db/schema";

config({ path: ".env.local" });
config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não configurada. Copie .env.example para .env.local e informe a conexão do Neon.");
}

const db = drizzle(neon(process.env.DATABASE_URL));

async function seed() {
  await db.insert(proposals).values([
    { slug: "dignidade-e-protecao-para-as-familias", title: "Dignidade e proteção para as famílias", summary: "Fortalecer políticas sociais, ampliar a proteção de famílias em situação de vulnerabilidade e apoiar ações de acolhimento, segurança alimentar e atendimento humanizado.", body: "Buscar recursos federais, defender programas de proteção social, articular parcerias e prestar contas à população.", category: "Proteção social", icon: "heart-handshake", featured: true, published: true, sortOrder: 1 },
    { slug: "moradia-digna-e-infraestrutura-nos-bairros", title: "Moradia digna e infraestrutura nos bairros", summary: "Defender recursos, programas e parcerias para habitação, regularização, saneamento, energia, mobilidade e melhoria da infraestrutura das comunidades.", body: "Defender habitação e infraestrutura comunitária por meio de emendas, articulação institucional e fiscalização.", category: "Moradia e comunidades", icon: "home", featured: true, published: true, sortOrder: 2 },
    { slug: "saude-perto-de-quem-precisa", title: "Saúde perto de quem precisa", summary: "Buscar investimentos para ampliar a atenção básica, a prevenção, os exames, os tratamentos e o acesso regionalizado aos serviços de saúde.", body: "Buscar investimentos e defender políticas de saúde com atuação parlamentar federal.", category: "Saúde", icon: "heart-pulse", featured: true, published: true, sortOrder: 3 },
    { slug: "servicos-publicos-que-chegam-onde-o-povo-esta", title: "Serviços públicos que chegam onde o povo está", summary: "Apoiar soluções para que água, energia, saneamento, transporte e outros serviços essenciais alcancem bairros e comunidades ainda desassistidos.", body: "Apoiar o alcance de serviços essenciais por meio de recursos federais, articulação e fiscalização.", category: "Serviços essenciais", icon: "building-2", featured: true, published: true, sortOrder: 4 },
    { slug: "mulheres-protegidas-e-com-oportunidades", title: "Mulheres protegidas e com oportunidades", summary: "Defender políticas de proteção, atendimento especializado, qualificação profissional, autonomia econômica e apoio às mulheres e suas famílias.", body: "Defender proteção e autonomia das mulheres com instrumentos do mandato federal.", category: "Mulheres e autonomia", icon: "shield", published: true, sortOrder: 5 },
    { slug: "escuta-fiscalizacao-e-transparencia", title: "Escuta, fiscalização e transparência", summary: "Manter diálogo permanente com a população, fiscalizar a aplicação dos recursos públicos e apresentar de forma acessível as ações, votações e resultados do mandato.", body: "Manter escuta permanente, fiscalizar recursos públicos e apresentar resultados em linguagem acessível.", category: "Mandato aberto", icon: "messages-square", published: true, sortOrder: 6 },
  ]).onConflictDoNothing();

  await db.insert(commitments).values([
    { title: "Prestação de contas permanente", summary: "Publicar relatórios periódicos com atividades, despesas, emendas e resultados.", metric: "Relatórios publicados", target: "1 relatório por trimestre", status: "proposto", progress: 0, published: true, sortOrder: 1 },
    { title: "Demandas com protocolo", summary: "Receber solicitações por um canal organizado, com classificação e retorno da equipe.", metric: "Demandas registradas e respondidas", target: "100% com protocolo", status: "em preparação", progress: 20, published: true, sortOrder: 2 },
    { title: "Emendas rastreáveis", summary: "Apresentar destino, valor, objetivo e estágio das emendas apoiadas pelo mandato.", metric: "Emendas publicadas no painel", target: "100% das indicações", status: "proposto", progress: 0, published: true, sortOrder: 3 },
    { title: "Agenda pública", summary: "Divulgar compromissos públicos e registrar as principais agendas de trabalho.", metric: "Agendas atualizadas", target: "Atualização semanal", status: "em preparação", progress: 35, published: true, sortOrder: 4 },
  ]);

  await db.insert(factChecks).values([
    { slug: "canal-oficial-da-campanha", claim: "Mensagens enviadas por números não divulgados neste site representam a campanha.", verdict: "Atenção", explanation: "Considere oficiais apenas os canais publicados nesta plataforma e nas redes verificadas da candidata. Em caso de dúvida, não forneça dados pessoais e confirme diretamente conosco.", sources: [], published: true },
    { slug: "propostas-publicadas", claim: "As propostas podem ser alteradas sem registro ou explicação.", verdict: "Falso", explanation: "A plataforma foi preparada para manter propostas e compromissos organizados. Mudanças relevantes devem ser explicadas publicamente pela equipe.", sources: [], published: true },
  ]).onConflictDoNothing();

  await db.insert(events).values({ title: "Lançamento da plataforma de participação", description: "Apresentação dos canais digitais e da metodologia de escuta.", location: "Canal oficial", city: "Imperatriz", startAt: new Date("2026-08-16T19:00:00-03:00"), status: "a confirmar", public: true });

  await db.insert(posts).values({ slug: "uma-campanha-que-escuta-e-presta-contas", title: "Uma campanha que escuta e presta contas", excerpt: "Conheça a proposta de uma plataforma pública para organizar demandas, compromissos e informações oficiais.", body: "Esta plataforma nasce para tornar a participação mais simples e a informação mais acessível. Aqui, a população poderá conhecer propostas, acompanhar compromissos, consultar a agenda pública, enviar demandas e verificar informações oficiais.", category: "Institucional", published: true }).onConflictDoNothing();
  console.log("Banco inicializado com conteúdo demonstrativo.");
}

seed().catch(error => { console.error(error); process.exit(1); });
