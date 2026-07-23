/** Fonte única de propostas quando o banco estiver indisponível. */

import type { DemandCategory } from "@/config/site";

export type ProposalRecord = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  icon: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  whyItMatters: string;
  commitments: string[];
  howFederalActs: string[];
  /** Sempre uma opção de `demandCategories` (formulário /participe). */
  demandTheme: DemandCategory;
  createdAt: Date;
  updatedAt: Date;
};

export const fallbackProposals: ProposalRecord[] = [
  {
    id: "p1",
    slug: "dignidade-e-protecao-para-as-familias",
    title: "Dignidade e proteção para as famílias",
    summary:
      "Fortalecer políticas sociais, ampliar a proteção de famílias em situação de vulnerabilidade e apoiar ações de acolhimento, segurança alimentar e atendimento humanizado.",
    body: "Buscar recursos federais, defender programas de proteção social, articular parcerias e prestar contas à população — sem inventar números ou resultados já garantidos.",
    category: "Proteção social",
    featured: true,
    published: true,
    sortOrder: 1,
    icon: "heart-handshake",
    whyItMatters:
      "Muitas famílias de Imperatriz, da Região Tocantina e do Maranhão convivem com vulnerabilidade social, insegurança alimentar e dificuldade de acesso a acolhimento e atendimento humanizado. A proteção social precisa chegar com dignidade, proximidade e continuidade — não como favor, mas como direito.",
    commitments: [
      "Buscar recursos federais para políticas de assistência e proteção social",
      "Defender programas de acolhimento, segurança alimentar e atendimento humanizado",
      "Apresentar e apoiar propostas legislativas que reforcem a dignidade das famílias",
      "Fiscalizar a aplicação de recursos destinados à área social",
      "Articular parcerias com municípios, Estado e União em torno da proteção às famílias",
      "Prestar contas à população sobre encaminhamentos e resultados desta bandeira",
    ],
    howFederalActs: [
      "Emendas parlamentares voltadas a políticas e equipamentos sociais",
      "Projetos de lei e apoio a iniciativas legislativas na área social",
      "Fiscalização do uso de recursos públicos federais",
      "Articulação institucional com gestores e órgãos competentes",
      "Defesa e fortalecimento de programas federais de proteção social",
      "Acompanhamento público dos recursos e encaminhamentos relacionados",
    ],
    demandTheme: "Proteção social",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p2",
    slug: "moradia-digna-e-infraestrutura-nos-bairros",
    title: "Moradia digna e infraestrutura nos bairros",
    summary:
      "Defender recursos, programas e parcerias para habitação, regularização, saneamento, energia, mobilidade e melhoria da infraestrutura das comunidades.",
    body: "Defender habitação e infraestrutura comunitária por meio de emendas, articulação institucional e fiscalização, respeitando as atribuições de cada esfera de governo.",
    category: "Moradia e comunidades",
    featured: true,
    published: true,
    sortOrder: 2,
    icon: "home",
    whyItMatters:
      "Moradia digna e infraestrutura básica definem a qualidade de vida nos bairros. Comunidades de Imperatriz e da Região Tocantina ainda enfrentam desafios de habitação, regularização, saneamento, energia e mobilidade. A atuação federal pode ajudar a trazer recursos, programas e parcerias — sem substituir a responsabilidade dos municípios e do Estado.",
    commitments: [
      "Buscar recursos federais para habitação, regularização e infraestrutura comunitária",
      "Defender programas e políticas públicas de moradia digna e melhoria dos bairros",
      "Apresentar e apoiar propostas legislativas ligadas a habitação e infraestrutura",
      "Fiscalizar a aplicação de recursos destinados a obras e programas habitacionais",
      "Articular parcerias entre municípios, Estado e União em favor das comunidades",
      "Prestar contas à população sobre indicações, acompanhamentos e resultados",
    ],
    howFederalActs: [
      "Emendas parlamentares para habitação, saneamento e infraestrutura",
      "Projetos de lei e apoio a políticas habitacionais e de regularização",
      "Fiscalização da aplicação de recursos públicos",
      "Articulação institucional com prefeituras, Estado e órgãos federais",
      "Defesa de programas federais de moradia e desenvolvimento urbano",
      "Acompanhamento transparente do destino dos recursos defendidos",
    ],
    demandTheme: "Moradia e comunidades",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p3",
    slug: "saude-perto-de-quem-precisa",
    title: "Saúde perto de quem precisa",
    summary:
      "Buscar investimentos para ampliar a atenção básica, a prevenção, os exames, os tratamentos e o acesso regionalizado aos serviços de saúde.",
    body: "Buscar investimentos e defender políticas de saúde com atuação parlamentar federal, sem executar diretamente os serviços municipais.",
    category: "Saúde",
    featured: true,
    published: true,
    sortOrder: 3,
    icon: "heart-pulse",
    whyItMatters:
      "O acesso à saúde continua sendo uma das maiores preocupações das famílias. Atenção básica, prevenção, exames e tratamentos precisam estar mais próximos de quem precisa — inclusive com olhar regionalizado para Imperatriz, a Região Tocantina e o Maranhão. A deputada federal atua buscando recursos, defendendo políticas e cobrando resultados, sem executar diretamente os serviços municipais.",
    commitments: [
      "Buscar investimentos e recursos federais para a saúde da região",
      "Defender a ampliação da atenção básica, da prevenção e do acesso a exames e tratamentos",
      "Apresentar e apoiar propostas legislativas que fortaleçam o SUS e o acesso regionalizado",
      "Fiscalizar a aplicação de recursos públicos na saúde",
      "Articular parcerias com municípios, Estado e União para melhorar o atendimento",
      "Prestar contas à população sobre encaminhamentos e resultados nesta área",
    ],
    howFederalActs: [
      "Emendas parlamentares para equipamentos, programas e ações de saúde",
      "Projetos de lei e apoio a políticas de saúde pública",
      "Fiscalização do uso de recursos federais na área",
      "Articulação institucional com gestores e órgãos de saúde",
      "Defesa de programas federais de atenção básica e acesso regionalizado",
      "Acompanhamento público dos recursos e iniciativas defendidas",
    ],
    demandTheme: "Saúde",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p4",
    slug: "servicos-publicos-que-chegam-onde-o-povo-esta",
    title: "Serviços públicos que chegam onde o povo está",
    summary:
      "Apoiar soluções para que água, energia, saneamento, transporte e outros serviços essenciais alcancem bairros e comunidades ainda desassistidos.",
    body: "Apoiar o alcance de serviços essenciais por meio de recursos federais, articulação e fiscalização, em parceria com municípios, Estado e União.",
    category: "Serviços essenciais",
    featured: true,
    published: true,
    sortOrder: 4,
    icon: "building-2",
    whyItMatters:
      "Água, energia, saneamento, transporte e outros serviços essenciais ainda não chegam com a mesma qualidade a todos os bairros e comunidades. Levar serviços públicos a quem está desassistido é questão de dignidade e de justiça territorial — e exige articulação entre esferas de governo, com papel claro da atuação federal.",
    commitments: [
      "Buscar recursos federais para ampliar o alcance de serviços essenciais",
      "Defender programas e políticas que levem água, energia, saneamento e transporte às comunidades",
      "Apresentar e apoiar propostas legislativas relacionadas a serviços públicos essenciais",
      "Fiscalizar a aplicação de recursos destinados a esses serviços",
      "Articular parcerias com municípios, Estado e União para reduzir desigualdades de acesso",
      "Prestar contas à população sobre ações e resultados desta bandeira",
    ],
    howFederalActs: [
      "Emendas parlamentares voltadas a serviços essenciais e infraestrutura básica",
      "Projetos de lei e apoio a políticas de universalização de serviços",
      "Fiscalização da aplicação de recursos públicos",
      "Articulação institucional entre esferas de governo",
      "Defesa de programas federais que ampliem o acesso a serviços",
      "Acompanhamento transparente dos encaminhamentos e recursos",
    ],
    demandTheme: "Serviços essenciais",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p5",
    slug: "mulheres-protegidas-e-com-oportunidades",
    title: "Mulheres protegidas e com oportunidades",
    summary:
      "Defender políticas de proteção, atendimento especializado, qualificação profissional, autonomia econômica e apoio às mulheres e suas famílias.",
    body: "Defender proteção e autonomia das mulheres com instrumentos do mandato federal e prestação de contas acessível.",
    category: "Mulheres e autonomia",
    featured: false,
    published: true,
    sortOrder: 5,
    icon: "shield",
    whyItMatters:
      "Mulheres precisam de proteção, atendimento especializado e condições reais de autonomia. Em Imperatriz, na Região Tocantina e no Maranhão, essa pauta dialoga diretamente com a trajetória de escuta e presença de Luzia Mary junto às comunidades. A atuação federal deve reforçar políticas, recursos e fiscalização — com respeito às atribuições de cada esfera.",
    commitments: [
      "Buscar recursos federais para proteção, atendimento e autonomia das mulheres",
      "Defender políticas de atendimento especializado, qualificação e apoio às famílias",
      "Apresentar e apoiar propostas legislativas de proteção e oportunidade para mulheres",
      "Fiscalizar a aplicação de recursos públicos nessa área",
      "Articular parcerias com municípios, Estado e União em favor das mulheres",
      "Prestar contas à população sobre encaminhamentos e resultados desta bandeira",
    ],
    howFederalActs: [
      "Emendas parlamentares para políticas de proteção e autonomia feminina",
      "Projetos de lei e apoio a iniciativas legislativas na área",
      "Fiscalização do uso de recursos públicos",
      "Articulação institucional com órgãos e redes de atendimento",
      "Defesa de programas federais de proteção, qualificação e geração de oportunidade",
      "Acompanhamento público das ações e resultados relacionados",
    ],
    demandTheme: "Mulheres e autonomia",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p6",
    slug: "escuta-fiscalizacao-e-transparencia",
    title: "Escuta, fiscalização e transparência",
    summary:
      "Manter diálogo permanente com a população, fiscalizar a aplicação dos recursos públicos e apresentar de forma acessível as ações, votações e resultados do mandato.",
    body: "Manter escuta permanente, fiscalizar recursos públicos e apresentar ações e resultados em linguagem clara e acessível.",
    category: "Mandato aberto",
    featured: false,
    published: true,
    sortOrder: 6,
    icon: "messages-square",
    whyItMatters:
      "Um mandato só faz sentido quando a população consegue acompanhar o que é feito. Escuta permanente, fiscalização séria e transparência em linguagem acessível são compromissos de método — para que prioridades, recursos e decisões não fiquem distantes de quem vive em Imperatriz, na Região Tocantina e no Maranhão.",
    commitments: [
      "Manter canais permanentes de escuta e diálogo com a população",
      "Fiscalizar a aplicação dos recursos públicos com seriedade",
      "Apresentar ações, votações e resultados em linguagem clara e acessível",
      "Organizar demandas e contribuições com protocolo e retorno",
      "Articular o mandato com a realidade dos municípios e das comunidades",
      "Prestar contas de forma contínua sobre o trabalho parlamentar",
    ],
    howFederalActs: [
      "Fiscalização parlamentar do uso de recursos públicos",
      "Publicação acessível de emendas, agendas, votações e encaminhamentos",
      "Articulação institucional transparente com outras esferas",
      "Defesa de práticas de abertura e controle social",
      "Acompanhamento público dos compromissos do mandato",
      "Canais de participação para a população contribuir com prioridades",
    ],
    demandTheme: "Transparência",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p-draft",
    slug: "rascunho-proposta-interna",
    title: "Rascunho interno (não publicar)",
    summary: "Conteúdo de teste/rascunho — não deve aparecer no site público.",
    body: "Rascunho reservado ao painel administrativo.",
    category: "Transparência",
    featured: false,
    published: false,
    sortOrder: 99,
    icon: "messages-square",
    whyItMatters: "Item de rascunho para validar o filtro published nas rotas públicas.",
    commitments: ["Não exibir no site público"],
    howFederalActs: ["Uso interno da equipe"],
    demandTheme: "Transparência",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const fallbackCommitments = [
  { id: "c1", title: "Prestação de contas permanente", summary: "Publicar relatórios periódicos com atividades, despesas, emendas e resultados.", metric: "Relatórios publicados", target: "1 relatório por trimestre", status: "proposto", progress: 0, dueDate: null, published: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: "c2", title: "Demandas com protocolo", summary: "Receber solicitações por um canal organizado, com classificação e retorno da equipe.", metric: "Demandas registradas e respondidas", target: "100% com protocolo", status: "em preparação", progress: 20, dueDate: null, published: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: "c3", title: "Emendas rastreáveis", summary: "Apresentar destino, valor, objetivo e estágio das emendas apoiadas pelo mandato.", metric: "Emendas publicadas no painel", target: "100% das indicações", status: "proposto", progress: 0, dueDate: null, published: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: "c4", title: "Agenda pública", summary: "Divulgar compromissos públicos e registrar as principais agendas de trabalho.", metric: "Agendas atualizadas", target: "Atualização semanal", status: "em preparação", progress: 35, dueDate: null, published: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
];

export const fallbackFactChecks = [
  { id: "f1", slug: "canal-oficial-da-campanha", claim: "Mensagens enviadas por números não divulgados neste site representam a campanha.", verdict: "Atenção", explanation: "Considere oficiais apenas os canais publicados nesta plataforma e nas redes verificadas da candidata. Em caso de dúvida, não forneça dados pessoais e confirme diretamente conosco.", sources: [], published: true, publishedAt: new Date(), createdAt: new Date() },
  { id: "f2", slug: "propostas-publicadas", claim: "As propostas podem ser alteradas sem registro ou explicação.", verdict: "Falso", explanation: "A plataforma foi preparada para manter propostas e compromissos organizados. Mudanças relevantes devem ser explicadas publicamente pela equipe.", sources: [], published: true, publishedAt: new Date(), createdAt: new Date() },
];

/** Sem eventos demonstrativos apresentados como reais — a agenda usa o banco/store. */
export const fallbackEvents: Array<{
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  city: string;
  startAt: Date;
  endAt: Date | null;
  status: string;
  public: boolean;
  featured: boolean;
  category: string;
  region: string | null;
  createdAt: Date;
}> = [];

export const fallbackPosts: Array<{
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  category: string;
  imageUrl: string | null;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}> = [
  {
    id: "n-draft",
    slug: "rascunho-noticia-interna",
    title: "Rascunho de notícia (não publicar)",
    excerpt: "Não deve aparecer no site público.",
    body: "Rascunho reservado ao painel administrativo.",
    category: "Notícias",
    imageUrl: null,
    published: false,
    publishedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
