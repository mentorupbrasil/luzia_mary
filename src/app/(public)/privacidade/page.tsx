import { Container } from "@/components/container";
import { PublicPageHero } from "@/components/page-hero";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Política de privacidade" };

export default function PrivacyPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Privacidade"
        title="Política de privacidade"
        description="Modelo inicial a ser revisado pelo jurídico eleitoral e por profissional de proteção de dados."
      />
      <Container className="py-12">
        <article className="prose-public max-w-3xl">
          <h2>1. Finalidade</h2>
          <p>
            Os dados enviados por esta plataforma são utilizados para registrar demandas, responder
            contatos, organizar contribuições e, quando houver consentimento específico, enviar
            atualizações da campanha.
          </p>
          <h2>2. Dados coletados</h2>
          <p>
            Podem ser coletados nome, município, bairro, e-mail, telefone e o conteúdo
            voluntariamente informado. Evite inserir dados sensíveis ou informações de terceiros.
          </p>
          <h2>3. Compartilhamento</h2>
          <p>
            Os dados não devem ser vendidos nem cedidos para listas de marketing. O acesso interno
            deve ser limitado às pessoas responsáveis pelo atendimento e coordenação.
          </p>
          <h2>4. Segurança e retenção</h2>
          <p>
            Controles de acesso, autenticação e cópias de segurança devem ser adotados. Prazos de
            retenção seguem a finalidade e a orientação jurídica.
          </p>
          <h2>5. Direitos do titular</h2>
          <p>
            Solicitações de acesso, correção, exclusão ou cancelamento de comunicações podem ser
            encaminhadas para {siteConfig.contact.email || "o canal oficial de contato"}.
          </p>
        </article>
      </Container>
    </>
  );
}
