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
    { slug: "saude-perto-de-quem-precisa", title: "Saúde perto de quem precisa", summary: "Fortalecer a atenção básica, ampliar a prevenção e cobrar acesso regionalizado a exames e tratamentos.", body: "Defender recursos, fiscalização e articulação para reduzir filas, fortalecer a atenção básica e ampliar o acesso da Região Tocantina a serviços especializados. Cada iniciativa deverá indicar objetivo, instrumento parlamentar, fonte possível de recurso e forma de acompanhamento.", category: "Saúde", icon: "heart-pulse", featured: true, published: true, sortOrder: 1 },
    { slug: "emprego-que-fica-na-regiao", title: "Emprego que fica na região", summary: "Apoiar formação profissional, pequenos negócios e investimentos capazes de gerar renda no Maranhão.", body: "Construir uma agenda de desenvolvimento regional conectando qualificação, inovação, crédito, infraestrutura e apoio aos pequenos negócios. A atuação federal deve ajudar municípios e setores produtivos a transformar potencial em oportunidade.", category: "Emprego e renda", icon: "briefcase-business", featured: true, published: true, sortOrder: 2 },
    { slug: "infraestrutura-com-transparencia", title: "Infraestrutura com transparência", summary: "Buscar investimentos e acompanhar publicamente prazos, valores e resultados das obras apoiadas.", body: "Toda indicação de recurso deve ser acompanhada de informações simples: valor, finalidade, município, situação e resultado esperado. A população precisa conseguir acompanhar o caminho do compromisso até a entrega.", category: "Infraestrutura", icon: "route", featured: true, published: true, sortOrder: 3 },
    { slug: "mulheres-protegidas-e-independentes", title: "Mulheres protegidas e independentes", summary: "Ampliar proteção, autonomia econômica e acesso a serviços especializados para mulheres.", body: "Defender políticas integradas de proteção, atendimento, formação e geração de renda, com atenção especial às mulheres em situação de vulnerabilidade e às realidades do interior do estado.", category: "Direitos das mulheres", icon: "shield-check", published: true, sortOrder: 4 },
    { slug: "educacao-que-abre-caminhos", title: "Educação que abre caminhos", summary: "Apoiar educação técnica, permanência estudantil e conexão entre formação e oportunidades locais.", body: "A educação precisa dialogar com o futuro dos jovens e com as necessidades do território. A proposta é articular recursos, programas e parcerias para qualificação, tecnologia e permanência estudantil.", category: "Educação", icon: "graduation-cap", published: true, sortOrder: 5 },
    { slug: "mandato-aberto-e-fiscalizador", title: "Mandato aberto e fiscalizador", summary: "Publicar compromissos, emendas, agendas, votações e resultados em linguagem acessível.", body: "O mandato deverá manter canais de atendimento, protocolo de demandas, painel de compromissos, prestação de contas e explicações claras sobre decisões e votações.", category: "Transparência", icon: "landmark", published: true, sortOrder: 6 },
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

  await db.insert(posts).values({ slug: "uma-campanha-que-escuta-e-presta-contas", title: "Luzia Mary lança plataforma de participação", excerpt: "Conheça a proposta de uma plataforma pública para organizar demandas, compromissos e informações oficiais da pré-candidatura.", body: "Esta plataforma nasce para tornar a participação mais simples e a informação mais acessível. Aqui, a população de Imperatriz, da Região Tocantina e de todo o Maranhão poderá conhecer propostas, acompanhar compromissos, consultar a agenda pública, enviar demandas e verificar informações oficiais da pré-candidatura de Luzia Mary a Deputada Federal.", category: "Institucional", published: true }).onConflictDoNothing();
  console.log("Banco inicializado com conteúdo demonstrativo.");
}

seed().catch(error => { console.error(error); process.exit(1); });
