import Link from "next/link";
import { ArrowRight, CheckCircle2, BarChart3, MessageSquareText, ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ProposalCard } from "@/components/proposal-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { getCommitments, getPosts, getProposals, getPublicDemandStats } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

export default async function HomePage() {
  const [proposals, commitments, stats, posts] = await Promise.all([
    getProposals(),
    getCommitments(),
    getPublicDemandStats(),
    getPosts(),
  ]);

  return (
    <>
      <section className="relative min-h-[min(92vh,900px)] overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-[var(--hero)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 opacity-40 noise"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_70%_40%,rgba(232,197,106,.22),transparent),radial-gradient(ellipse_50%_80%_at_10%_90%,rgba(15,107,82,.45),transparent)]"
          aria-hidden
        />

        <Container className="flex min-h-[min(92vh,900px)] flex-col justify-center py-16 sm:py-20">
          <div className="max-w-4xl">
            <p className="animate-rise text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
              {siteConfig.candidate.cityBase} · {siteConfig.candidate.state} · {siteConfig.candidate.party}
            </p>

            <h1 className="animate-rise animate-rise-delay-1 mt-5 font-display text-6xl font-medium leading-[0.92] tracking-[-0.03em] text-white sm:text-7xl lg:text-8xl">
              {siteConfig.candidate.ballotName}
            </h1>

            <p className="animate-rise animate-rise-delay-2 mt-6 max-w-xl text-xl font-medium leading-snug text-white/90 sm:text-2xl">
              {siteConfig.candidate.slogan}
            </p>

            <p className="animate-rise animate-rise-delay-2 mt-4 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
              {siteConfig.candidate.shortBio}
            </p>

            <div className="animate-rise animate-rise-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demandas"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 font-bold text-[var(--hero)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]"
              >
                Envie sua demanda <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/sobre"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 font-bold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10"
              >
                Conheça a trajetória
              </Link>
            </div>

            <div className="animate-fade mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--accent)]" aria-hidden /> Canal com protocolo
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--accent)]" aria-hidden /> Dados protegidos
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--accent)]" aria-hidden /> Compromissos públicos
              </span>
            </div>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-3 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <p className="text-2xl font-bold text-white sm:text-3xl">{commitments.length}</p>
              <p className="mt-1 text-xs text-white/45 sm:text-sm">compromissos públicos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white sm:text-3xl">{proposals.length}</p>
              <p className="mt-1 text-xs text-white/45 sm:text-sm">propostas</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-2xl font-bold text-white sm:text-3xl">
                {stats.total > 0 ? stats.total : "Aberto"}
              </p>
              <p className="mt-1 text-xs text-white/45 sm:text-sm">
                {stats.total > 0 ? "demandas recebidas" : "canal de escuta"}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Prioridades"
            title="Propostas claras para problemas reais"
            description="Cada proposta explica o problema, o caminho possível no Congresso e como a população poderá acompanhar o resultado."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {proposals.slice(0, 6).map((p) => (
              <ProposalCard key={p.id} proposal={p} />
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link href="/propostas" className="inline-flex items-center gap-2 font-bold text-[var(--brand)]">
              Ver todas as propostas <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="overflow-hidden rounded-[40px] bg-[#10251d] px-6 py-12 text-white sm:px-10 lg:px-14">
            <SectionHeading
              eyebrow="Tecnologia a serviço das pessoas"
              title="Uma campanha que já funciona como gabinete digital"
              description="A plataforma organiza demandas, informa compromissos e cria uma memória pública do que foi prometido e entregue."
              className="[&_h2]:text-white [&_p:last-child]:text-white/60"
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Card className="border-white/10 bg-white/[.06] text-white shadow-none">
                <CardContent className="pt-6">
                  <MessageSquareText className="text-[var(--accent)]" aria-hidden />
                  <h3 className="mt-5 text-lg font-bold">Sua voz com protocolo</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Envie uma demanda e receba um número para acompanhar o atendimento.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-white/[.06] text-white shadow-none">
                <CardContent className="pt-6">
                  <BarChart3 className="text-[var(--accent)]" aria-hidden />
                  <h3 className="mt-5 text-lg font-bold">Compromissos mensuráveis</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Metas, indicadores e andamento apresentados em linguagem simples.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-white/[.06] text-white shadow-none">
                <CardContent className="pt-6">
                  <ShieldCheck className="text-[var(--accent)]" aria-hidden />
                  <h3 className="mt-5 text-lg font-bold">Informação oficial</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Canal para confirmar mensagens, esclarecer boatos e proteger a população.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Notícias"
              title="Acompanhe o que está acontecendo"
              description="Informações oficiais, atualizações da plataforma e posicionamentos da candidata."
            />
            <Link href="/noticias" className="shrink-0 font-bold text-[var(--brand)]">
              Ver todas
            </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/noticias/${post.slug}`}
                className="group rounded-[28px] border border-black/[.07] bg-white p-6 shadow-[0_18px_60px_rgba(27,45,38,.07)] transition hover:-translate-y-1"
              >
                <Badge>{post.category}</Badge>
                <h3 className="mt-5 text-xl font-bold tracking-[-.025em] group-hover:text-[var(--brand)]">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/55">{post.excerpt}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-black/35">
                  {formatShortDate(post.publishedAt)}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-10 pt-8">
        <Container>
          <div className="rounded-[38px] bg-[var(--accent)] px-6 py-12 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-black/50">Participação</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-medium tracking-[-.02em] sm:text-4xl">
                O que precisa mudar na sua cidade?
              </h2>
              <p className="mt-4 max-w-2xl text-black/60">
                Compartilhe uma necessidade, sugestão ou problema. A equipe organizará as contribuições por município e tema.
              </p>
            </div>
            <Link
              href="/demandas"
              className="mt-7 inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#10251d] px-7 font-bold text-white lg:mt-0"
            >
              Participar agora <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
