import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--background)] px-5">
      <div className="max-w-lg text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand)]">Erro 404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em]">
          Esta página não foi encontrada.
        </h1>
        <p className="mt-5 text-[var(--text-muted)]">
          O conteúdo pode ter sido movido, atualizado ou ainda não publicado.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 bg-[var(--brand)] px-6 py-3 font-bold text-white"
          style={{ borderRadius: "999px" }}
        >
          <ArrowLeft size={17} aria-hidden /> Voltar ao início
        </Link>
      </div>
    </main>
  );
}
