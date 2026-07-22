import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Baby,
  Cookie,
  Database,
  FilePenLine,
  Gavel,
  Handshake,
  HardDrive,
  Mail,
  RefreshCw,
  Scale,
  Share2,
  Shield,
  ShieldAlert,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { PrivacyToc } from "@/components/privacy-toc";
import {
  PRIVACY_DATA_REGION_NOTE,
  privacyCollectedFields,
  privacyController,
  privacyInfrastructure,
  privacyMeta,
  privacyToc,
} from "@/config/privacy";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: privacyMeta.title,
  description: privacyMeta.description,
  alternates: {
    canonical: "/privacidade",
  },
  openGraph: {
    title: `${privacyMeta.title} | Luzia Mary`,
    description: privacyMeta.description,
    url: `${getSiteUrl()}/privacidade`,
  },
};

const privacyMailto = `mailto:${privacyMeta.contactEmail}?subject=${encodeURIComponent(
  "Solicitação sobre meus dados pessoais",
)}&body=${encodeURIComponent(
  "Olá,\n\nGostaria de exercer um direito previsto na LGPD em relação aos meus dados pessoais.\n\nNome completo:\nE-mail utilizado no site (se houver):\nPedido (acesso, correção, exclusão, informação etc.):\n\nObrigado(a).",
)}`;

type SectionProps = {
  id: string;
  number: string;
  title: string;
  Icon: LucideIcon;
  children: ReactNode;
};

function PrivacySection({ id, number, title, Icon, children }: SectionProps) {
  return (
    <section id={id} className="privacy-section" aria-labelledby={`${id}-title`}>
      <header className="privacy-section-head">
        <span className="privacy-section-icon" aria-hidden>
          <Icon size={18} strokeWidth={2.2} />
        </span>
        <div className="privacy-section-heading">
          <span className="privacy-section-number">{number}</span>
          <h2 id={`${id}-title`} className="privacy-section-title">
            {title}
          </h2>
        </div>
      </header>
      <div className="privacy-section-body">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      {/*
        TODO jurídico (não exibir na página):
        Confirmar com o responsável jurídico se a identificação do controlador
        (Luzia Mary de Araújo / equipe de pré-campanha) está correta e se deve
        ser acrescentado CPF, CNPJ, endereço ou outra identificação oficial
        antes da publicação definitiva. Esta Política deve passar por revisão
        jurídica e de proteção de dados antes da publicação.
      */}

      <section className="privacy-hero" aria-labelledby="privacy-hero-title">
        <Container className="privacy-shell">
          <div className="privacy-hero-inner">
            <div className="privacy-hero-copy">
              <p className="privacy-eyebrow">PRIVACIDADE E PROTEÇÃO DE DADOS</p>
              <h1 id="privacy-hero-title" className="privacy-title">
                Política de Privacidade
              </h1>
              <p className="privacy-intro">
                A sua privacidade é importante para nós. Esta Política de Privacidade explica como
                os dados pessoais podem ser coletados, utilizados, armazenados e protegidos durante
                a utilização deste site, especialmente no envio de demandas, contribuições, contatos
                e manifestações de interesse.
              </p>
              <p className="privacy-intro">
                O tratamento de dados pessoais deverá respeitar a Lei Geral de Proteção de Dados
                Pessoais — LGPD e os princípios de finalidade, adequação, necessidade,
                transparência, segurança e não discriminação.
              </p>
              <p className="privacy-updated">
                Última atualização: {privacyMeta.lastUpdatedLabel}.
              </p>
            </div>
            <div className="privacy-badge" aria-hidden>
              <Shield size={22} strokeWidth={2.2} />
              <span>LGPD</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="privacy-main" aria-label="Conteúdo da política">
        <Container className="privacy-shell">
          <div className="privacy-layout">
            <article className="privacy-content">
              <PrivacySection
                id="responsavel"
                number="01"
                title="Quem é responsável pelo tratamento"
                Icon={UserCheck}
              >
                <p>
                  Para fins desta Política de Privacidade, o responsável pelas decisões relacionadas
                  ao tratamento dos dados pessoais coletados por este site é:
                </p>
                <p>
                  <strong>Controlador:</strong> {privacyController.name}.
                </p>
                <p>
                  Canal de contato para assuntos de privacidade:{" "}
                  <a href={`mailto:${privacyMeta.contactEmail}`} className="privacy-email">
                    {privacyMeta.contactEmail}
                  </a>
                </p>
              </PrivacySection>

              <PrivacySection
                id="dados-coletados"
                number="02"
                title="Quais dados podemos coletar"
                Icon={Database}
              >
                <p>
                  Dependendo da forma como o visitante utiliza o site, poderão ser tratados os
                  seguintes dados — conforme os formulários e fluxos efetivamente implementados:
                </p>
                <ul>
                  {privacyCollectedFields.map((field) => (
                    <li key={field}>{field};</li>
                  ))}
                </ul>
                <p>
                  Este site não solicita CPF, documento de identidade, data de nascimento ou outros
                  dados cadastrais além dos campos acima. O código da aplicação também não realiza
                  coleta própria de endereço IP, tipo de navegador, dispositivo ou páginas visitadas
                  para fins de análise.
                </p>
              </PrivacySection>

              <PrivacySection
                id="como-coletamos"
                number="03"
                title="Como os dados são coletados"
                Icon={FilePenLine}
              >
                <p>Os dados pessoais podem ser obtidos:</p>
                <ul>
                  <li>quando o usuário preenche o formulário de demandas e contribuições;</li>
                  <li>quando envia uma demanda, contribuição ou mensagem por esse formulário;</li>
                  <li>quando entra em contato pelos canais informados no site;</li>
                  <li>
                    durante o acesso administrativo à área restrita, por meio de cookie de sessão
                    necessário à autenticação;
                  </li>
                  <li>
                    por meio das integrações utilizadas para hospedagem (
                    {privacyInfrastructure.hosting}) e banco de dados (
                    {privacyInfrastructure.database}).
                  </li>
                </ul>
              </PrivacySection>

              <PrivacySection
                id="finalidades"
                number="04"
                title="Para que utilizamos os dados"
                Icon={Handshake}
              >
                <p>Os dados pessoais poderão ser utilizados para:</p>
                <ul>
                  <li>receber, organizar e responder demandas e contribuições;</li>
                  <li>identificar a localidade e o tema das manifestações recebidas;</li>
                  <li>manter contato quando necessário;</li>
                  <li>prestar informações solicitadas pelo usuário;</li>
                  <li>organizar ações de escuta e participação popular;</li>
                  <li>
                    enviar atualizações pelos canais informados, somente quando o usuário optar por
                    essa finalidade;
                  </li>
                  <li>melhorar o funcionamento e a segurança do site;</li>
                  <li>prevenir fraudes, abusos e acessos não autorizados;</li>
                  <li>cumprir obrigações legais ou regulatórias;</li>
                  <li>
                    produzir informações estatísticas agregadas, sempre que possível sem identificar
                    pessoas.
                  </li>
                </ul>
                <aside className="privacy-callout" role="note">
                  <p>
                    O envio de uma demanda ou contribuição não significa filiação, apoio político,
                    obrigação de voto ou inclusão automática em comunicações de campanha.
                  </p>
                </aside>
              </PrivacySection>

              <PrivacySection id="bases-legais" number="05" title="Bases legais" Icon={Scale}>
                <p>
                  O tratamento dos dados pessoais deverá estar fundamentado em uma das hipóteses
                  previstas na LGPD, conforme a finalidade e o contexto de cada operação, incluindo:
                </p>
                <ul>
                  <li>consentimento do titular, quando aplicável;</li>
                  <li>execução de procedimentos solicitados pelo próprio titular;</li>
                  <li>cumprimento de obrigação legal ou regulatória;</li>
                  <li>exercício regular de direitos;</li>
                  <li>
                    legítimo interesse, quando aplicável e após avaliação da necessidade,
                    proporcionalidade e proteção dos direitos do titular;
                  </li>
                  <li>proteção contra fraudes e garantia da segurança do site.</li>
                </ul>
                <p>
                  Nem todo tratamento ocorre exclusivamente por consentimento: a base adequada
                  depende da finalidade concreta de cada operação.
                </p>
              </PrivacySection>

              <PrivacySection
                id="dados-sensiveis"
                number="06"
                title="Dados sensíveis e contexto eleitoral"
                Icon={ShieldAlert}
              >
                <p>
                  Dados relacionados à opinião política, filiação partidária, origem racial ou
                  étnica, religião, saúde, vida sexual, informações genéticas ou biométricas recebem
                  proteção especial.
                </p>
                <p>
                  Este site não solicita que o usuário informe filiação partidária, intenção de voto
                  ou outros dados pessoais sensíveis.
                </p>
                <p>
                  O simples acesso ao site ou envio de uma demanda não deverá ser utilizado para
                  presumir, classificar ou criar perfil sobre a opinião política do visitante.
                </p>
                <p>
                  Solicitamos que o usuário não inclua dados pessoais sensíveis, documentos ou
                  informações de terceiros no campo aberto dos formulários, salvo quando
                  estritamente necessário e devidamente autorizado.
                </p>
              </PrivacySection>

              <PrivacySection
                id="compartilhamento"
                number="07"
                title="Compartilhamento"
                Icon={Share2}
              >
                <p>Os dados pessoais não serão vendidos nem comercializados.</p>
                <p>
                  Quando necessário para o funcionamento do site e atendimento das solicitações, os
                  dados poderão ser compartilhados, de forma limitada, com:
                </p>
                <ul>
                  <li>integrantes autorizados da equipe responsável;</li>
                  <li>
                    provedor de hospedagem e infraestrutura tecnológica ({privacyInfrastructure.hosting});
                  </li>
                  <li>
                    serviço de banco de dados e armazenamento ({privacyInfrastructure.database});
                  </li>
                  <li>prestadores de segurança e suporte técnico, quando contratados;</li>
                  <li>
                    autoridades públicas, quando houver obrigação legal ou determinação válida.
                  </li>
                </ul>
                <p>
                  Neste momento, o fluxo público de formulários grava os dados no banco de dados do
                  projeto e não utiliza, no código atual, serviço separado de envio de e-mail ou
                  automação de marketing.
                </p>
                <p>
                  Todo compartilhamento deverá observar a finalidade informada, a necessidade e
                  medidas adequadas de segurança.
                </p>
              </PrivacySection>

              <PrivacySection
                id="cookies"
                number="08"
                title="Cookies e tecnologias semelhantes"
                Icon={Cookie}
              >
                <p>
                  Cookies são pequenos arquivos armazenados no dispositivo do visitante para
                  permitir o funcionamento do site, lembrar preferências, reforçar a segurança ou
                  analisar a navegação.
                </p>
                <p>Com base no código atual deste site:</p>
                <ul>
                  <li>
                    <strong>Necessários:</strong> cookie de sessão administrativa (
                    <code>mandato_admin_session</code>), utilizado apenas para manter o acesso
                    autenticado à área restrita (<code>/admin</code>). Cookies técnicos próprios da
                    infraestrutura de hospedagem também podem ser empregados para o funcionamento
                    seguro da aplicação.
                  </li>
                  <li>
                    <strong>Funcionais:</strong> não identificados no código público atual.
                  </li>
                  <li>
                    <strong>Analíticos:</strong> não há Google Analytics, Meta Pixel nem outra
                    ferramenta de análise de audiência implementada neste projeto.
                  </li>
                  <li>
                    <strong>Publicidade ou marketing:</strong> não há cookies de publicidade ou
                    remarketing implementados neste projeto.
                  </li>
                </ul>
                <p>
                  Como o site utiliza, para o público geral, apenas cookies estritamente necessários
                  ao funcionamento e à segurança — sem cookies analíticos ou publicitários — não é
                  exibido banner de consentimento de cookies não essenciais.
                </p>
              </PrivacySection>

              <PrivacySection
                id="armazenamento"
                number="09"
                title="Armazenamento e retenção"
                Icon={HardDrive}
              >
                <p>
                  Os dados serão mantidos somente durante o período necessário para cumprir as
                  finalidades informadas, atender solicitações, resguardar direitos e cumprir
                  obrigações legais ou regulatórias.
                </p>
                <p>
                  Após o encerramento da finalidade, os dados deverão ser eliminados, anonimizados
                  ou mantidos apenas nas hipóteses permitidas pela legislação.
                </p>
                <p>
                  Os registros enviados pelos formulários são armazenados em banco de dados{" "}
                  {privacyInfrastructure.database}, e a aplicação é disponibilizada na infraestrutura
                  da {privacyInfrastructure.hosting}.
                </p>
                {PRIVACY_DATA_REGION_NOTE ? <p>{PRIVACY_DATA_REGION_NOTE}</p> : null}
                {/*
                  Preencher PRIVACY_DATA_REGION_NOTE em src/config/privacy.ts após confirmar
                  a região efetiva do banco e as salvaguardas de eventual transferência
                  internacional. Não inventar país, prazo numérico de retenção ou cláusulas
                  contratuais sem confirmação.
                */}
              </PrivacySection>

              <PrivacySection id="seguranca" number="10" title="Segurança" Icon={Shield}>
                <p>
                  São adotadas medidas técnicas e administrativas razoáveis para proteger os dados
                  pessoais contra acesso não autorizado, perda, alteração, divulgação ou tratamento
                  inadequado.
                </p>
                <p>
                  Essas medidas podem incluir controle de acesso, autenticação, backups, atualização
                  de sistemas, restrição de permissões e acompanhamento de incidentes.
                </p>
                <p>
                  Nenhum sistema é completamente imune a riscos. Caso seja identificado incidente
                  relevante envolvendo dados pessoais, serão adotadas as providências cabíveis
                  conforme a legislação aplicável.
                </p>
              </PrivacySection>

              <PrivacySection
                id="direitos"
                number="11"
                title="Direitos dos titulares"
                Icon={Gavel}
              >
                <p>Nos termos da LGPD, o titular poderá solicitar, quando aplicável:</p>
                <ul>
                  <li>confirmação da existência de tratamento;</li>
                  <li>acesso aos dados;</li>
                  <li>correção de dados incompletos, inexatos ou desatualizados;</li>
                  <li>
                    anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em
                    desconformidade;
                  </li>
                  <li>informação sobre compartilhamentos;</li>
                  <li>portabilidade, quando aplicável;</li>
                  <li>revogação do consentimento;</li>
                  <li>
                    eliminação dos dados tratados com consentimento, observadas as exceções legais;
                  </li>
                  <li>oposição a tratamento realizado em desconformidade;</li>
                  <li>revisão de decisões automatizadas, caso existam;</li>
                  <li>
                    informação sobre a possibilidade de não fornecer consentimento e suas
                    consequências.
                  </li>
                </ul>
                <p>
                  Para exercer seus direitos, envie uma solicitação para:{" "}
                  <a href={`mailto:${privacyMeta.contactEmail}`} className="privacy-email">
                    {privacyMeta.contactEmail}
                  </a>
                </p>
                <p>
                  A solicitação poderá exigir informações adicionais para confirmar a identidade do
                  requerente e proteger os dados contra acesso indevido.
                </p>
              </PrivacySection>

              <PrivacySection
                id="criancas"
                number="12"
                title="Crianças e adolescentes"
                Icon={Baby}
              >
                <p>Este site não é direcionado especificamente a crianças.</p>
                <p>
                  Caso sejam tratados dados de crianças ou adolescentes, deverão ser observados o
                  melhor interesse do titular, a necessidade da coleta e as exigências legais
                  aplicáveis, incluindo a participação do responsável quando necessária.
                </p>
              </PrivacySection>

              <PrivacySection
                id="alteracoes"
                number="13"
                title="Alterações desta política"
                Icon={RefreshCw}
              >
                <p>
                  Esta Política de Privacidade poderá ser atualizada para refletir mudanças legais,
                  técnicas ou operacionais.
                </p>
                <p>
                  A versão mais recente permanecerá disponível nesta página, acompanhada da data de
                  sua última atualização.
                </p>
                <p>Alterações relevantes deverão ser apresentadas com transparência.</p>
              </PrivacySection>

              <PrivacySection id="contato" number="14" title="Fale sobre seus dados" Icon={Mail}>
                <p>
                  Dúvidas, solicitações ou manifestações relacionadas à privacidade e à proteção de
                  dados podem ser enviadas para:
                </p>
                <p>
                  <a href={`mailto:${privacyMeta.contactEmail}`} className="privacy-email">
                    {privacyMeta.contactEmail}
                  </a>
                </p>
                <p>
                  Utilize o botão abaixo para abrir uma mensagem já identificada como solicitação
                  sobre dados pessoais — distinta do formulário político de demandas.
                </p>
                <a href={privacyMailto} className="privacy-btn privacy-btn--primary">
                  SOLICITAR ATENDIMENTO SOBRE MEUS DADOS
                </a>
              </PrivacySection>
            </article>

            <aside className="privacy-sidebar">
              <PrivacyToc items={privacyToc} />
            </aside>
          </div>
        </Container>
      </section>

      <section className="privacy-cta" aria-labelledby="privacy-cta-title">
        <Container className="privacy-shell">
          <div className="privacy-cta-inner">
            <div>
              <h2 id="privacy-cta-title" className="privacy-cta-title">
                Quer exercer algum direito sobre seus dados?
              </h2>
              <p className="privacy-cta-text">
                Entre em contato para solicitar acesso, correção, exclusão ou outras informações
                relacionadas ao tratamento de seus dados pessoais.
              </p>
            </div>
            <a href={privacyMailto} className="privacy-btn privacy-btn--cta">
              FALAR SOBRE MEUS DADOS
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
