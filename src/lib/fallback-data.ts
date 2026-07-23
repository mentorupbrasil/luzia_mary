export const fallbackProposals = [
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

/** Sem eventos ou notícias demonstrativas apresentados como reais */
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
}> = [];
