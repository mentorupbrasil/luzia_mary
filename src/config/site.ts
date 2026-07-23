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
      heroPlace: "/images/imperatriz-ponte-hero.jpg",
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
    /** Dígitos internacionais (sem +) para https://wa.me/{whatsapp} */
    whatsapp: "559992208000",
    address: "Imperatriz, Maranhão",
  },

  social: {
    instagram: "https://www.instagram.com/luziamary20020/",
    facebook: "https://www.facebook.com/profile.php?id=100024218122253&locale=pt_BR",
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

/** Menu oficial do site público (header, mobile e rodapé). */
export const mainNav = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Biografia" },
  { href: "/propostas", label: "Propostas" },
  { href: "/agenda", label: "Agenda" },
  { href: "/participe", label: "Participe" },
] as const;

export type MainNavItem = (typeof mainNav)[number];

export const demandCategories = [
  "Proteção social",
  "Moradia e comunidades",
  "Saúde",
  "Serviços essenciais",
  "Mulheres e autonomia",
  "Educação",
  "Emprego e renda",
  "Infraestrutura",
  "Segurança",
  "Transparência",
  "Convite para evento",
  "Outro assunto",
] as const;

export type DemandCategory = (typeof demandCategories)[number];

export function isDemandCategory(value: string): value is DemandCategory {
  return (demandCategories as readonly string[]).includes(value);
}
