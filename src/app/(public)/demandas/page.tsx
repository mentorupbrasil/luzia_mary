import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { Container } from "@/components/container";
import { DemandForm } from "@/components/demand-form";
import { PublicPageHero } from "@/components/page-hero";
import { getPublicDemandStats } from "@/lib/data";

export const metadata = { title: "Envie sua demanda" };

const steps = [
  {
    title: "Conte o que está acontecendo",
    text: "Descreva a necessidade, o município e o tema com clareza. Quanto mais objetiva a informação, melhor a organização.",
  },
  {
    title: "A equipe organiza e analisa",
    text: "A contribuição é classificada por tema e localidade para apoiar propostas, posicionamentos e atendimento.",
  },
  {
    title: "Você recebe um protocolo",
    text: "O sistema gera um número de acompanhamento. Guarde-o para localizar seu registro junto à equipe.",
  },
];

export default async function DemandsPage({
  searchParams,
}: {
  searchParams: Promise<{ tema?: string }>;
}) {
  const [{ tema }, stats] = await Promise.all([searchParams, getPublicDemandStats()]);

  return (
    <>
      <PublicPageHero
        eyebrow="Participação"
        title="Envie sua demanda com segurança e acompanhamento"
        description="Um canal organizado para registrar necessidades, sugestões e problemas do seu município — com protocolo e proteção dos dados pessoais."
      />

      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <Container className="grid gap-0 py-0 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`px-0 py-10 md:px-8 ${index > 0 ? "border-t border-[var(--border)] md:border-l md:border-t-0" : ""}`}
            >
              <p className="font-display text-3xl font-semibold text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em]">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{step.text}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div
          className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
          style={{ borderRadius: "var(--radius)" }}
        >
          <h2 className="font-display text-2xl font-semibold tracking-[-0.025em]">Formulário de participação</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            Campos com asterisco são obrigatórios. Evite enviar dados sensíveis, documentos ou informações de terceiros.
          </p>
          <div className="mt-8">
            <DemandForm defaultCategory={tema || ""} />
          </div>
        </div>

        <aside className="space-y-5">
          <div
            className="border border-[var(--border)] bg-[var(--surface)] p-6"
            style={{ borderRadius: "var(--radius)" }}
          >
            <LockKeyhole className="text-[var(--brand)]" strokeWidth={1.6} aria-hidden />
            <h2 className="mt-4 font-display text-xl font-semibold">Proteção dos dados</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
              Informações pessoais não aparecem no painel público. Estatísticas, quando existirem, são
              apresentadas de forma agregada.
            </p>
            <Link href="/privacidade" className="mt-4 inline-block text-sm font-bold text-[var(--brand-dark)]">
              Ler política de privacidade
            </Link>
          </div>

          {(stats.total > 0 || stats.cities > 0) && (
            <div
              className="border border-[var(--border)] bg-[var(--brand-dark)] p-6 text-white"
              style={{ borderRadius: "var(--radius)" }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                Participação registrada
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-3xl font-semibold">{stats.total}</p>
                  <p className="mt-1 text-xs text-white/55">demandas</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold">{stats.cities}</p>
                  <p className="mt-1 text-xs text-white/55">municípios</p>
                </div>
              </div>
              {stats.categories.length > 0 && (
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/45">Temas mais citados</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stats.categories.map((item) => (
                      <span
                        key={item.category}
                        className="bg-white/10 px-3 py-1 text-xs"
                        style={{ borderRadius: "999px" }}
                      >
                        {item.category} · {item.total}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>
      </Container>
    </>
  );
}
