import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";

export function ParticipationCallout() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div
          className="relative overflow-hidden border border-[var(--border)] bg-[var(--hero)] px-7 py-14 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14"
          style={{ borderRadius: "calc(var(--radius) + 6px)" }}
        >
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[var(--brand)]/25 to-transparent" aria-hidden />
          <div className="relative max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
              Participação
            </p>
            <h2 className="display-balance mt-4 font-display text-[clamp(1.9rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Qual prioridade da sua cidade Brasília precisa enxergar?
            </h2>
            <p className="mt-5 text-base leading-8 text-white/55">
              Conte o que está acontecendo no seu município. A equipe registra, organiza e gera um
              protocolo para acompanhamento.
            </p>
          </div>
          <Link
            href="/demandas"
            className="relative mt-8 inline-flex h-12 shrink-0 items-center gap-2 bg-[var(--accent)] px-6 text-sm font-bold text-white transition hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)] lg:mt-0"
            style={{ borderRadius: "999px" }}
          >
            Enviar minha demanda <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
