import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound(){return <main className="grid min-h-screen place-items-center px-5"><div className="max-w-lg text-center"><p className="text-sm font-bold uppercase tracking-[.2em] text-[var(--brand)]">Erro 404</p><h1 className="mt-4 text-5xl font-semibold tracking-[-.05em]">Esta página não foi encontrada.</h1><p className="mt-5 text-black/55">O conteúdo pode ter sido movido, atualizado ou ainda não publicado.</p><Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 font-bold text-white"><ArrowLeft size={17}/> Voltar ao início</Link></div></main>}
