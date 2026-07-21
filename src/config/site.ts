export const siteConfig = {
  candidate: {
    name: "Luzia Mary de Araújo",
    ballotName: "Luzia Mary",
    initials: "LM",
    office: "Pré-candidata a Deputada Federal",
    state: "Maranhão",
    cityBase: "Imperatriz",
    region: "Região Tocantina",
    party: "Podemos",
    partyAcronym: "PODE",
    // Preencher após o registro eleitoral
    number: "",
    slogan: "Uma voz firme para fazer o Maranhão avançar.",
    shortBio:
      "Liderança de Imperatriz com experiência em gestão pública e compromisso com quem vive a realidade da Região Tocantina.",
    // Texto curto para a home (máx. ~3 linhas)
    homeIntro:
      "De Imperatriz para o Maranhão: uma pré-candidatura construída com escuta, presença e compromisso com quem vive a Região Tocantina.",
    manifesto:
      "Política de verdade começa ouvindo, continua com trabalho e só faz sentido quando entrega resultado para as pessoas.",
    bio: [
      "Luzia Mary de Araújo construiu sua trajetória em Imperatriz, conhecendo de perto os desafios da gestão pública, das famílias e de quem precisa que o poder público funcione de verdade.",
      "Nas eleições municipais de 2024, colocou seu nome à disposição da cidade e ampliou uma rede de diálogo com lideranças, profissionais, mulheres, jovens e comunidades da Região Tocantina.",
      "Agora, prepara uma pré-candidatura à Câmara dos Deputados com um compromisso simples: transformar escuta em prioridade, prioridade em trabalho e trabalho em resultado para o Maranhão.",
    ],
    // Preencher com motivação adicional validada pela equipe (não publicar vazio)
    candidacyMotivation: "",
    photos: {
      hero: "/images/luzia-mary-hero.jpg",
      about: "/images/luzia-mary-trajetoria.jpg",
      participate: "/images/luzia-mary-participe.jpg",
    },
  },
  contact: {
    // Exibir somente se confirmado
    email: "contato@luziamary.com.br",
    whatsapp: "",
    address: "Imperatriz, Maranhão",
  },
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  legal: {
    cnpj: "",
    responsible: "",
    disclaimer:
      "Pré-candidatura. Conteúdo institucional de apresentação e participação. Número de urna e materiais oficiais serão atualizados após o registro eleitoral.",
  },
  values: [
    {
      title: "Clareza",
      text: "Explicar posições, prioridades e decisões sem esconder a política atrás de linguagem complicada.",
    },
    {
      title: "Presença",
      text: "Manter diálogo permanente com municípios, lideranças, categorias profissionais e comunidades.",
    },
    {
      title: "Responsabilidade",
      text: "Tratar informação, recursos públicos, dados pessoais e compromissos com seriedade.",
    },
  ],
  timeline: [
    {
      label: "Trajetória em Imperatriz",
      text: "Construção de presença pública a partir da realidade local e da convivência com os desafios do cotidiano.",
    },
    {
      label: "Eleições municipais de 2024",
      text: "Candidatura municipal e ampliação do diálogo com lideranças, profissionais, mulheres, jovens e comunidades da Região Tocantina.",
    },
    {
      label: "Pré-candidatura federal",
      text: "Preparação para a Câmara dos Deputados com escuta organizada, prioridades públicas e prestação de contas.",
    },
  ],
} as const;

export const navPrimary = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Conheça" },
  { href: "/propostas", label: "Bandeiras" },
  { href: "/noticias", label: "Notícias" },
  { href: "/demandas", label: "Participe" },
] as const;

export const navSecondary = [
  { href: "/agenda", label: "Agenda" },
  { href: "/compromissos", label: "Compromissos" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/verdade-ou-boato", label: "Verdade ou boato" },
] as const;

export const navItems = [
  ...navPrimary.filter((item) => item.href !== "/"),
  ...navSecondary,
];

export const demandCategories = [
  "Saúde",
  "Educação",
  "Segurança",
  "Emprego e renda",
  "Infraestrutura",
  "Direitos das mulheres",
  "Agricultura",
  "Meio ambiente",
  "Inclusão e acessibilidade",
  "Cultura e esporte",
  "Outro",
] as const;
