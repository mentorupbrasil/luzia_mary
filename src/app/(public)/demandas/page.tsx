import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { Container } from "@/components/container";
import { DemandForm } from "@/components/demand-form";
import { PublicPageHero } from "@/components/page-hero";
import { getPublicDemandStats } from "@/lib/data";

export const metadata = { title: "Envie sua demanda" };

const steps = [
  { title: "Conte o que está acontecendo", text: "Descreva a necessidade do seu município com clareza e objetividade." },
  { title: "A equipe registra e organiza", text: "A contribuição é classificada por tema e localidade para orientar o atendimento." },
  { title: "Você recebe um protocolo", text: "Guarde o número gerado para acompanhar seu registro junto à equipe." },
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
        eyebrow="Participe"
        title="Envie sua demanda com segurança"
        description="Um canal simples para registrar necessidades e sugestões do seu município — com protocolo e proteção dos dados."
      />

      <section className="border-b border-[var(--border)] bg-white">
        <Container className="grid md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`py-9 md:px-7 ${index > 0 ? "border-t border-[var(--border)] md:border-l md:border-t-0" : ""}`}
            >
              <p className="font-display text-3xl font-bold text-[var(--brand)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-display text-lg font-bold">{step.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{step.text}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container className="grid gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-[var(--border)] bg-white p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold">Formulário</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
            Campos com asterisco são obrigatórios. Evite enviar dados sensíveis ou de terceiros.
          </p>
          <div className="mt-7">
            <DemandForm defaultCategory={tema || ""} />
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-muted)]/60 p-6">
            <LockKeyhole className="text-[var(--brand)]" strokeWidth={1.6} aria-hidden />
            <h2 className="mt-4 font-display text-lg font-bold">Seus dados protegidos</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
              Informações pessoais não aparecem publicamente. Estatísticas, quando existirem, são agregadas.
            </p>
            <Link href="/privacidade" className="mt-4 inline-block text-sm font-bold text-[var(--brand-dark)]">
              Política de privacidade
            </Link>
          </div>

          {(stats.total > 0 || stats.cities > 0) && (
            <div className="rounded-[1.75rem] bg-[var(--brand-dark)] p-6 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Participação</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-3xl font-bold">{stats.total}</p>
                  <p className="mt-1 text-xs text-white/55">demandas</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold">{stats.cities}</p>
                  <p className="mt-1 text-xs text-white/55">municípios</p>
                </div>
              </div>
            </div>
          )}
        </aside>
      </Container>
    </>
  );
}
