/**
 * Conteúdo editorial das bandeiras / propostas.
 * Fonte única para listagem e páginas individuais.
 * Não inventar valores, estatísticas, prazos ou recursos garantidos.
 */

export type BandeiraIcon =
  | "heart-handshake"
  | "home"
  | "heart-pulse"
  | "building-2"
  | "shield"
  | "messages-square";

export type Bandeira = {
  number: string;
  slug: string;
  category: string;
  title: string;
  summary: string;
  icon: BandeiraIcon;
  whyItMatters: string;
  commitments: string[];
  howFederalActs: string[];
  demandTheme: string;
};

export const bandeiras: Bandeira[] = [
  {
    number: "01",
    slug: "dignidade-e-protecao-para-as-familias",
    category: "Proteção social",
    title: "Dignidade e proteção para as famílias",
    summary:
      "Fortalecer políticas sociais, ampliar a proteção de famílias em situação de vulnerabilidade e apoiar ações de acolhimento, segurança alimentar e atendimento humanizado.",
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
  },
  {
    number: "02",
    slug: "moradia-digna-e-infraestrutura-nos-bairros",
    category: "Moradia e comunidades",
    title: "Moradia digna e infraestrutura nos bairros",
    summary:
      "Defender recursos, programas e parcerias para habitação, regularização, saneamento, energia, mobilidade e melhoria da infraestrutura das comunidades.",
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
    demandTheme: "Infraestrutura",
  },
  {
    number: "03",
    slug: "saude-perto-de-quem-precisa",
    category: "Saúde",
    title: "Saúde perto de quem precisa",
    summary:
      "Buscar investimentos para ampliar a atenção básica, a prevenção, os exames, os tratamentos e o acesso regionalizado aos serviços de saúde.",
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
  },
  {
    number: "04",
    slug: "servicos-publicos-que-chegam-onde-o-povo-esta",
    category: "Serviços essenciais",
    title: "Serviços públicos que chegam onde o povo está",
    summary:
      "Apoiar soluções para que água, energia, saneamento, transporte e outros serviços essenciais alcancem bairros e comunidades ainda desassistidos.",
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
    demandTheme: "Infraestrutura",
  },
  {
    number: "05",
    slug: "mulheres-protegidas-e-com-oportunidades",
    category: "Mulheres e autonomia",
    title: "Mulheres protegidas e com oportunidades",
    summary:
      "Defender políticas de proteção, atendimento especializado, qualificação profissional, autonomia econômica e apoio às mulheres e suas famílias.",
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
    demandTheme: "Direitos das mulheres",
  },
  {
    number: "06",
    slug: "escuta-fiscalizacao-e-transparencia",
    category: "Mandato aberto",
    title: "Escuta, fiscalização e transparência",
    summary:
      "Manter diálogo permanente com a população, fiscalizar a aplicação dos recursos públicos e apresentar de forma acessível as ações, votações e resultados do mandato.",
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
    demandTheme: "Outro",
  },
];

export const bandeirasPilares = [
  { title: "Escuta da população", tone: "yellow" as const },
  { title: "Atuação federal", tone: "blue" as const },
  { title: "Prestação de contas", tone: "green" as const },
] as const;

export const federalAtuacaoResumo =
  "A deputada federal não executa diretamente obras ou serviços municipais. A atuação pode ocorrer por emendas parlamentares, projetos de lei, fiscalização, articulação institucional, defesa de programas federais e acompanhamento de recursos — sempre em parceria com municípios, Estado e União.";

export const transparenciaCompromisso =
  "Os encaminhamentos, recursos defendidos, votações e resultados relacionados a esta bandeira deverão ser apresentados à população em linguagem clara e acessível.";

export function getBandeiraBySlug(slug: string): Bandeira | undefined {
  return bandeiras.find((item) => item.slug === slug);
}
