import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { JsonLd } from "@/components/json-ld";
import { buildWebsiteJsonLd } from "@/lib/json-ld";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildWebsiteJsonLd()} />
      <a
        href="#conteudo"
        className="skip-to-content"
      >
        Ir para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
