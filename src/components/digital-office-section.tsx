import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";

const pillars = [
  {
    title: "Ouvir",
    text: "Receber demandas reais de municípios, bairros e comunidades com protocolo e organização.",
  },
  {
    title: "Organizar",
    text: "Classificar contribuições por tema e localidade para transformar escuta em prioridade.",
  },
  {
    title: "Responder",
    text: "Manter canais oficiais, acompanhamento e retorno da equipe de forma responsável.",
  },
  {
    title: "Prestar contas",
    text: "Publicar compromissos, agendas e atualizações em linguagem acessível.",
  },
];

export function DigitalOfficeSection() {
  return (
    <section className="bg-[var(--brand-dark)] py-20 text-white sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
              Gabinete digital
            </p>
            <h2 className="display-balance mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Tecnologia a serviço da escuta e da responsabilidade.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/60">
              Esta plataforma não existe para impressionar. Existe para aproximar: registrar
              demandas, organizar prioridades e criar uma relação pública de confiança entre
              população e representação.
            </p>
            <Link
              href="/demandas"
              className="mt-8 inline-flex h-12 items-center gap-2 bg-white px-6 text-sm font-bold text-[var(--brand-dark)] transition hover:bg-[var(--accent-soft)]"
              style={{ borderRadius: "999px" }}
            >
              Participar agora <ArrowRight size={16} aria-hidden />
            </Link>
          </div>

          <div className="border border-white/12 bg-white/[0.04]">
            <ol className="divide-y divide-white/10">
              {pillars.map((item, index) => (
                <li key={item.title} className="grid gap-3 px-6 py-6 sm:grid-cols-[72px_1fr] sm:items-start">
                  <span className="font-display text-2xl font-semibold text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/55">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
