import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "./container";

export function TerritorySection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">Território</p>
            <h2 className="display-balance mt-4 font-display text-[clamp(2rem,4vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Imperatriz, a Região Tocantina e o Maranhão no centro da narrativa.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-muted)]">
              A pré-candidatura nasce da convivência com a realidade local e do compromisso de levar
              a voz do território para Brasília — com escuta, método e prestação de contas.
            </p>
            <Link
              href="/sobre"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]"
            >
              Conhecer a trajetória <ArrowRight size={16} aria-hidden />
            </Link>
          </div>

          <div
            className="territory-map relative min-h-[340px] overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-8"
            style={{ borderRadius: "var(--radius)" }}
          >
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand)]">
                {siteConfig.candidate.region}
              </p>
              <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
                {siteConfig.candidate.state}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {siteConfig.territory.cities.map((city) => (
                  <li
                    key={city}
                    className="border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)]"
                    style={{ borderRadius: "999px" }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-sm text-sm leading-7 text-[var(--text-muted)]">
                Municípios da Região Tocantina que orientam a escuta e a atuação da pré-candidatura.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
