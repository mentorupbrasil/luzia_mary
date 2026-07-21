import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
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
      <section className="border-b border-[var(--border)] bg-[var(--hero)] py-14 text-white sm:py-16">
        <Container>
          <Link href="/propostas" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white">
            <ArrowLeft size={16} aria-hidden /> Voltar às prioridades
          </Link>
          <div className="mt-8">
            <Badge tone="brand" className="bg-white/10 text-white">
              {proposal.category}
            </Badge>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold tracking-[-0.035em]">
            {proposal.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">{proposal.summary}</p>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_0.42fr]">
        <article className="prose-public">
          <h2>O problema</h2>
          <p>{proposal.summary}</p>

          <h2>A proposta</h2>
          <p>{proposal.body}</p>

          <h2>Atuação possível</h2>
          <ul>
            <li>Definição clara do problema e do resultado esperado.</li>
            <li>Uso de instrumentos compatíveis com o mandato federal: legislação, fiscalização, orçamento e articulação institucional.</li>
            <li>Publicação de indicadores e atualizações em linguagem acessível.</li>
          </ul>

          <h2>Acompanhamento</h2>
          <p>
            O andamento desta prioridade poderá ser acompanhado por meio dos compromissos públicos,
            notícias oficiais e do canal de participação desta plataforma.
          </p>

          <h2>Impacto esperado</h2>
          <p>
            Melhor organização das demandas do território e respostas públicas mais claras sobre o
            caminho entre escuta, prioridade e resultado.
          </p>
        </article>

        <aside>
          <div
            className="sticky top-28 border border-[var(--border)] bg-[var(--brand-dark)] p-7 text-white"
            style={{ borderRadius: "var(--radius)" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Participe
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.025em]">
              Ajude a aperfeiçoar esta prioridade
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Envie uma experiência, necessidade ou sugestão relacionada a este tema.
            </p>
            <Link
              href={`/demandas?tema=${encodeURIComponent(proposal.category)}`}
              className="mt-6 inline-flex items-center gap-2 bg-[var(--accent)] px-5 py-3 text-sm font-bold text-white"
              style={{ borderRadius: "999px" }}
            >
              Participar <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </aside>
      </Container>
    </>
  );
}
