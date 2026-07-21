/**
 * Conteúdo central da área pública.
 * Campos vazios são ocultados automaticamente no site.
 * Não invente dados — preencha somente informações confirmadas.
 */
export const content = {
  candidate: {
    name: "Luzia Mary de Araújo",
    ballotName: "Luzia Mary",
    office: "Pré-candidata a Deputada Federal",
    state: "Maranhão",
    city: "Imperatriz",
    region: "Região Tocantina",
    /** Exibir no hero/footer somente se confirmado */
    party: "Podemos",
    partyAcronym: "PODE",
    /** Preencher após registro eleitoral */
    ballotNumber: "",
    slogan: "Uma voz firme para fazer o Maranhão avançar.",
    homeLead:
      "De Imperatriz para o Maranhão: escuta, presença e compromisso com quem vive a Região Tocantina.",
    shortBio:
      "Liderança de Imperatriz com experiência em gestão pública e compromisso com a realidade da Região Tocantina.",
    bio: [
      "Luzia Mary de Araújo construiu sua trajetória em Imperatriz, conhecendo de perto os desafios da gestão pública, das famílias e de quem precisa que o poder público funcione de verdade.",
      "Nas eleições municipais de 2024, colocou seu nome à disposição da cidade e ampliou uma rede de diálogo com lideranças, profissionais, mulheres, jovens e comunidades da Região Tocantina.",
      "Agora, prepara uma pré-candidatura à Câmara dos Deputados com um compromisso simples: transformar escuta em prioridade, prioridade em trabalho e trabalho em resultado para o Maranhão.",
    ],
    /** Motivação adicional — ocultar se vazio */
    motivation: "",
    photos: {
      hero: "/images/luzia-mary-hero.png",
      heroCrowd: "/images/luzia-mary-hero-crowd.jpg",
      about: "/images/luzia-mary-trajetoria.png",
      participate: "/images/luzia-mary-participe.png",
    },
  },

  /**
   * Destaques reais da trajetória (máx. 3 na home).
   * Ex.: { label: "2024", text: "Candidatura municipal em Imperatriz" }
   * Deixe vazio até confirmar.
   */
  highlights: [] as Array<{ label: string; text: string }>,

  /**
   * Resultados / conquistas concretas.
   * A seção inteira some se o array estiver vazio.
   * Ex.: { value: "…", label: "…" }
   */
  achievements: [] as Array<{ value: string; label: string; detail?: string }>,

  values: [
    {
      title: "Clareza",
      text: "Explicar posições e decisões sem esconder a política atrás de linguagem complicada.",
    },
    {
      title: "Presença",
      text: "Diálogo permanente com municípios, lideranças e comunidades da Região Tocantina.",
    },
    {
      title: "Responsabilidade",
      text: "Tratar informação, recursos públicos e compromissos com seriedade.",
    },
  ],

  timeline: [
    {
      label: "Trajetória em Imperatriz",
      text: "Presença pública construída a partir da realidade local e dos desafios do cotidiano.",
    },
    {
      label: "Eleições municipais de 2024",
      text: "Candidatura municipal e ampliação do diálogo com lideranças, mulheres, jovens e comunidades.",
    },
    {
      label: "Pré-candidatura federal",
      text: "Preparação para a Câmara dos Deputados com escuta organizada e prestação de contas.",
    },
  ],

  contact: {
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
} as const;

/** Compatibilidade com imports legados */
export const siteConfig = {
  candidate: {
    name: content.candidate.name,
    ballotName: content.candidate.ballotName,
    initials: "LM",
    office: content.candidate.office,
    state: content.candidate.state,
    cityBase: content.candidate.city,
    region: content.candidate.region,
    party: content.candidate.party,
    partyAcronym: content.candidate.partyAcronym,
    number: content.candidate.ballotNumber,
    slogan: content.candidate.slogan,
    shortBio: content.candidate.shortBio,
    homeIntro: content.candidate.homeLead,
    manifesto: content.candidate.slogan,
    bio: content.candidate.bio,
    candidacyMotivation: content.candidate.motivation,
    photos: content.candidate.photos,
  },
  contact: content.contact,
  social: content.social,
  legal: content.legal,
  values: content.values,
  timeline: content.timeline,
} as const;

export const navPrimary = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Quem é Luzia" },
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
