import { CampaignBanner } from "@/components/campaign-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#conteudo" className="absolute left-4 top-0 z-[100] -translate-y-[120%] rounded-full bg-white px-4 py-2 text-sm font-bold shadow-lg transition focus:translate-y-4">
        Ir para o conteúdo
      </a>
      <CampaignBanner />
      <SiteHeader />
      <main id="conteudo">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
