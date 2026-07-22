import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { getProposalBySlug, getProposals } from "@/lib/data";

export async function generateStaticParams() {
  const items = await getProposals();
  return items.map((item) => ({ slug: item.slug }));
}

export default async function ProposalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = await getProposalBySlug(slug);
  if (!proposal) notFound();

  return (
    <>
      <section className="border-b border-[var(--border)] bg-[linear-gradient(160deg,#eef4ff_0%,#faf9f7_70%)] py-12 sm:py-14">
        <Container>
          <Link href="/propostas" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)]">
            <ArrowLeft size={16} aria-hidden /> Voltar às bandeiras
          </Link>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            {proposal.category}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold tracking-[-0.04em]">
            {proposal.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-muted)]">{proposal.summary}</p>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_0.4fr]">
        <article className="prose-public">
          <h2>Contexto</h2>
          <p>{proposal.summary}</p>
          <h2>Caminho de atuação</h2>
          <p>{proposal.body}</p>
          <h2>Como acompanhar</h2>
          <ul>
            <li>Atualizações em notícias e compromissos públicos.</li>
            <li>Canal de demandas para contribuições relacionadas ao tema.</li>
            <li>Prestação de contas em linguagem acessível.</li>
          </ul>
        </article>
        <aside>
          <div className="sticky top-24 rounded-3xl bg-[var(--brand-dark)] p-6 text-white">
            <h2 className="font-display text-xl font-bold">Contribua com esta bandeira</h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Envie uma experiência ou sugestão relacionada a este tema.
            </p>
            <Link
              href={`/demandas?tema=${encodeURIComponent(proposal.category)}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-bold"
            >
              Participar <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </aside>
      </Container>
    </>
  );
}
