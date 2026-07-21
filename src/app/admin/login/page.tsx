import Link from "next/link";
import { AdminLoginForm } from "@/components/admin-login-form";
import { SiteLogo } from "@/components/site-logo";

export const metadata = { title: "Acesso administrativo" };

export default function LoginPage() {
  return <main className="grid min-h-screen lg:grid-cols-[.9fr_1.1fr]"><section className="flex items-center justify-center p-6 sm:p-10"><div className="w-full max-w-md"><SiteLogo/><div className="mt-12 rounded-[32px] border border-black/[.07] bg-white p-7 shadow-[0_25px_80px_rgba(27,45,38,.12)] sm:p-9"><AdminLoginForm/></div><Link href="/" className="mt-6 block text-center text-sm font-semibold text-black/45 hover:text-[var(--brand)]">Voltar ao site público</Link></div></section><section className="relative hidden overflow-hidden bg-[#10251d] p-12 text-white lg:flex lg:flex-col lg:justify-end"><div className="absolute inset-0 noise opacity-70"/><div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--brand)]/60 blur-3xl"/><div className="relative max-w-xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-[var(--accent)]">Operação digital</p><h2 className="mt-5 text-5xl font-semibold leading-tight tracking-[-.05em]">Dados organizados. Decisões melhores. Compromissos públicos.</h2><p className="mt-6 text-lg leading-8 text-white/55">O painel reúne demandas, conteúdo, agenda e indicadores em um ambiente preparado para a equipe.</p></div></section></main>;
}
