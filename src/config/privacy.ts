/**
 * Dados confirmados pela auditoria do código (jul/2026).
 * Não inventar fornecedores, cookies ou operações ausentes do projeto.
 *
 * Achados técnicos:
 * - Formulário público: /participe (DemandForm + submitDemand); /demandas redireciona 301
 * - Campos: name*, city*, email?, phone?, neighborhood?, category*, title*, description*, consent*, updates?
 * - Persistência: Neon Postgres (tabelas demands e contacts)
 * - Hospedagem prevista: Vercel (NEXT_PUBLIC_SITE_URL / mensagem de erro do formulário)
 * - Sem Google Analytics, Meta Pixel ou scripts de marketing no layout
 * - Cookie de sessão admin (mandato_admin_session) apenas para /admin
 * - Sem coleta explícita de IP, user-agent ou páginas visitadas no código da aplicação
 *
 * TODO jurídico (não exibir na página): confirmar se a identificação do controlador
 * deve incluir CPF, CNPJ, endereço ou outro dado oficial antes da publicação definitiva.
 */

export const privacyMeta = {
  title: "Política de Privacidade",
  description:
    "Saiba como os dados pessoais são coletados, utilizados, protegidos e tratados no site de Luzia Mary.",
  lastUpdatedLabel: "22 de julho de 2026",
  contactEmail: "contato@luziamary.com.br",
} as const;

export const privacyController = {
  name: "Luzia Mary de Araújo, por meio de sua equipe responsável pelo site e pelas atividades de pré-campanha",
} as const;

/** Serviços identificados no código / configuração do projeto. */
export const privacyInfrastructure = {
  database: "Neon (PostgreSQL)",
  hosting: "Vercel",
} as const;

/**
 * Preencher após confirmar a região efetiva do banco e as garantias contratuais.
 * Enquanto vazio, a página informa transferência internacional de forma cautelosa,
 * sem afirmar país ou cláusulas específicas.
 */
export const PRIVACY_DATA_REGION_NOTE = "" as string;

export const privacyCollectedFields = [
  "nome",
  "endereço de e-mail",
  "telefone",
  "município",
  "bairro ou localidade",
  "assunto ou tema da contribuição",
  "conteúdo da mensagem, demanda ou proposta enviada",
  "informações fornecidas voluntariamente pelo usuário",
  "registro de consentimento para o tratamento da demanda",
  "opção de receber atualizações, quando marcada pelo usuário",
] as const;

export const privacyToc = [
  { href: "#responsavel", label: "1. Quem é responsável pelos dados", short: "Responsável" },
  { href: "#dados-coletados", label: "2. Quais dados podemos coletar", short: "Dados coletados" },
  { href: "#como-coletamos", label: "3. Como os dados são coletados", short: "Como coletamos" },
  { href: "#finalidades", label: "4. Para que utilizamos os dados", short: "Finalidades" },
  { href: "#bases-legais", label: "5. Bases legais", short: "Bases legais" },
  { href: "#dados-sensiveis", label: "6. Dados sensíveis e contexto eleitoral", short: "Dados sensíveis" },
  { href: "#compartilhamento", label: "7. Compartilhamento", short: "Compartilhamento" },
  { href: "#cookies", label: "8. Cookies e tecnologias semelhantes", short: "Cookies" },
  { href: "#armazenamento", label: "9. Armazenamento e retenção", short: "Armazenamento" },
  { href: "#seguranca", label: "10. Segurança", short: "Segurança" },
  { href: "#direitos", label: "11. Direitos dos titulares", short: "Direitos" },
  { href: "#criancas", label: "12. Crianças e adolescentes", short: "Crianças" },
  { href: "#alteracoes", label: "13. Alterações desta política", short: "Alterações" },
  { href: "#contato", label: "14. Contato", short: "Contato" },
] as const;
