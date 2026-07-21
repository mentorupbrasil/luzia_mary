import Link from "next/link";
import { CalendarDays, CheckSquare2, FileText, Gauge, LogOut, MessageSquareText, Newspaper, SearchCheck } from "lucide-react";
import { SiteLogo } from "./site-logo";
import { logoutAction } from "@/app/admin/login/actions";

const links = [
  { href: "/admin", label: "Visão geral", icon: Gauge },
  { href: "/admin/demandas", label: "Demandas", icon: MessageSquareText },
  { href: "/admin/propostas", label: "Propostas", icon: FileText },
  { href: "/admin/compromissos", label: "Compromissos", icon: CheckSquare2 },
  { href: "/admin/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/admin/checagens", label: "Checagens", icon: SearchCheck },
  { href: "/admin/noticias", label: "Notícias", icon: Newspaper },
];

export function AdminSidebar() {
  return <aside className="border-r border-black/[.06] bg-white p-5 lg:sticky lg:top-0 lg:h-screen"><SiteLogo/><nav className="mt-10 grid gap-1">{links.map(({href,label,icon:Icon})=><Link key={href} href={href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-black/55 transition hover:bg-[var(--brand-soft)] hover:text-[var(--brand-dark)]"><Icon size={18}/>{label}</Link>)}</nav><form action={logoutAction} className="mt-8"><button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"><LogOut size={18}/>Sair</button></form></aside>;
}
