import Link from "next/link";
import { Camera, Mail, MapPin, MessageCircle, Play } from "lucide-react";
import { Container } from "./container";
import { SiteLogo } from "./site-logo";
import { navItems, siteConfig } from "@/config/site";

export function SiteFooter() {
  return <footer className="mt-24 border-t border-black/[.06] bg-[#10251d] text-white">
    <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_.8fr_.8fr]">
      <div><SiteLogo/><p className="mt-5 max-w-md text-sm leading-7 text-white/60">{siteConfig.candidate.shortBio}</p><div className="mt-5 flex gap-2">
        <a href={siteConfig.social.instagram} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/15" aria-label="Instagram"><Camera size={17}/></a>
        <a href={siteConfig.social.facebook} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/15" aria-label="Facebook"><MessageCircle size={17}/></a>
        <a href={siteConfig.social.youtube} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/15" aria-label="YouTube"><Play size={17}/></a>
      </div></div>
      <div><h3 className="text-sm font-bold">Navegação</h3><div className="mt-4 grid gap-2">{navItems.slice(0,6).map(i=><Link key={i.href} href={i.href} className="text-sm text-white/60 hover:text-white">{i.label}</Link>)}</div></div>
      <div><h3 className="text-sm font-bold">Contato oficial</h3><div className="mt-4 grid gap-3 text-sm text-white/60"><span className="flex gap-2"><Mail size={17}/>{siteConfig.contact.email}</span><span className="flex gap-2"><MapPin size={17}/>{siteConfig.contact.address}</span></div><Link href="/privacidade" className="mt-6 inline-block text-sm text-white/60 hover:text-white">Política de privacidade</Link></div>
    </Container>
    <div className="border-t border-white/10"><Container className="flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} {siteConfig.candidate.ballotName}. Todos os direitos reservados.</span><span>{siteConfig.legal.cnpj} · {siteConfig.legal.responsible}</span></Container></div>
  </footer>;
}
