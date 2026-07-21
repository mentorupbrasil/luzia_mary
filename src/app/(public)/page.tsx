import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  FileText,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { CandidateVisual } from "@/components/candidate-visual";
import { Container } from "@/components/container";
import { ProposalCard } from "@/components/proposal-card";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site";
import { getCommitments, getPosts, getProposals, getPublicDemandStats } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

const pillars = [
  {
    number: "01",
    title: "Escutar de verdade",
    text: "Um canal organizado para transformar a realidade de cada município em prioridade de trabalho.",
  },
  {
    number: "02",
    title: "Trabalhar com método",
    text: "Propostas com objetivo, caminho possível, indicador e acompanhamento público.",
  },
  {
    number: "03",
    title: "Prestar contas",
    text: "A população acompanha compromissos, agendas, resultados e decisões em linguagem simples.",
  },
];

export default async function HomePage() {
  const [proposals, commitments, stats, posts] = await Promise.all([
    getProposals(),
    getCommitments(),
    getPublicDemandStats(),
    getPosts(),
  ]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[var(--hero)] text-white">
        <div className="aurora absolute inset-0" aria-hidden />
        <div className="editorial-grid absolute inset-0 opacity-40" aria-hidden />
        <div className="paper-noise absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-[480px] w-[480px] rounded-full bg-[var(--brand)]/20 blur-[100px]"
          aria-hidden
        />

        <Container className="relative grid min-h-[min(92vh,880px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <div className="animate-rise inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[.06] px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[.22em] text-white/65">
                {siteConfig.candidate.cityBase} · {siteConfig.candidate.region} · {siteConfig.candidate.party}
              </span>
            </div>

            <h1 className="animate-rise animate-rise-delay-1 display-balance mt-8 font-display text-[clamp(3.8rem,9vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.04em]">
              Luzia{" "}
              <span className="bg-gradient-to-br from-[var(--accent)] to-[#e8c97a] bg-clip-text text-transparent">
                Mary
              </span>
            </h1>

            <p className="animate-rise animate-rise-delay-2 mt-7 max-w-xl font-display text-xl font-medium leading-snug text-white/90 sm:text-2xl">
              {siteConfig.candidate.slogan}
            </p>
            <p className="animate-rise animate-rise-delay-2 copy-balance mt-4 max-w-lg text-base leading-8 text-white/50 sm:text-lg">
              {siteConfig.candidate.shortBio}
            </p>

            <div className="animate-rise animate-rise-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sobre"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 text-sm font-bold text-[var(--hero)] shadow-[0_16px_40px_rgba(212,168,75,.3)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]"
              >
                Conheça Luzia Mary <ArrowRight size={17} aria-hidden />
              </Link>
              <Link
                href="/demandas"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[.05] px-7 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/10"
              >
                Envie sua prioridade
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{proposals.length}</p>
                <p className="mt-1.5 text-[11px] leading-snug text-white/40">prioridades</p>
              </div>
              <div>
                <p className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{commitments.length}</p>
                <p className="mt-1.5 text-[11px] leading-snug text-white/40">compromissos</p>
              </div>
              <div>
                <p className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                  {stats.total > 0 ? stats.total : "Aberto"}
                </p>
                <p className="mt-1.5 text-[11px] leading-snug text-white/40">canal de escuta</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[480px] lg:mx-0 lg:max-w-none">
            <CandidateVisual />
          </div>
        </Container>
      </section>

      {/* ── Pillars ── */}
      <section className="border-b border-[var(--line)] bg-white/70 backdrop-blur-sm">
        <Container className="grid lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.number}
              className={`group px-0 py-12 transition lg:px-10 ${
                index > 0 ? "border-t border-[var(--line)] lg:border-l lg:border-t-0" : ""
              }`}
            >
              <p className="font-mono text-[11px] font-semibold text-[var(--accent-strong)]">{pillar.number}</p>
              <h2 className="mt-4 font-display text-2xl font-medium tracking-[-.03em] transition group-hover:text-[var(--brand)] sm:text-[1.65rem]">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{pillar.text}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* ── Proposals ── */}
      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_.55fr]">
            <SectionHeading
              eyebrow="Prioridades"
              title="O mandato começa pelas necessidades de quem vive o Maranhão real."
              description="Menos promessa genérica. Cada prioridade apresenta um problema concreto, o papel de uma deputada federal e como o resultado poderá ser acompanhado."
            />
            <div className="lg:justify-self-end">
              <Link
                href="/propostas"
                className="inline-flex items-center gap-2 border-b-2 border-[var(--brand)] pb-1 text-sm font-bold text-[var(--brand-dark)] transition hover:gap-3"
              >
                Ver todas as prioridades <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {proposals.slice(0, 6).map((proposal, index) => (
              <ProposalCard key={proposal.id} proposal={proposal} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Digital office ── */}
      <section className="relative overflow-hidden bg-[var(--brand-dark)] py-24 text-white sm:py-28">
        <div className="aurora absolute inset-0 opacity-60" aria-hidden />
        <div className="paper-noise absolute inset-0" aria-hidden />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--accent)]">
              Gabinete digital desde agora
            </p>
            <h2 className="display-balance mt-5 font-display text-4xl font-medium leading-[1.02] tracking-[-.035em] sm:text-5xl lg:text-6xl">
              Tecnologia que aproxima, organiza e dá resposta.
            </h2>
            <p className="copy-balance mt-6 max-w-xl text-base leading-8 text-white/55 sm:text-lg">
              Este site não foi criado apenas para apresentar uma pré-candidata. Ele foi pensado para receber demandas, organizar compromissos e criar uma relação pública de responsabilidade.
            </p>
            <Link
              href="/demandas"
              className="mt-9 inline-flex h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[var(--brand-dark)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Participar agora <ArrowRight size={17} aria-hidden />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: MessageSquareText,
                title: "Demanda com protocolo",
                text: "Cada contribuição entra no sistema com município, tema e número de acompanhamento.",
              },
              {
                icon: MapPinned,
                title: "Mapa de prioridades",
                text: "As necessidades recebidas podem ser consolidadas por cidade e área de atuação.",
              },
              {
                icon: BarChart3,
                title: "Compromissos mensuráveis",
                text: "Metas, indicadores e andamento publicados de forma simples e verificável.",
              },
              {
                icon: ShieldCheck,
                title: "Informação oficial",
                text: "Canais verificados, proteção de dados e uma área específica para esclarecer boatos.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-[28px] border border-white/12 bg-white/[.07] p-6 transition hover:border-[var(--accent)]/40 hover:bg-white/[.1]"
              >
                <item.icon className="text-[var(--accent)] transition group-hover:scale-110" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-6 font-display text-xl font-medium tracking-[-.03em] sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Commitments ── */}
      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--accent-strong)]">
                Compromisso público
              </p>
              <h2 className="display-balance mt-5 font-display text-4xl font-medium leading-[1.02] tracking-[-.035em] sm:text-5xl lg:text-6xl">
                Não basta dizer. É preciso mostrar como será feito.
              </h2>
              <p className="mt-6 text-base leading-8 text-[var(--ink-soft)]">
                Os compromissos transformam valores em entregas acompanháveis. A proposta é manter esse padrão da pré-campanha ao mandato.
              </p>
              <Link
                href="/compromissos"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)] transition hover:gap-3"
              >
                Acompanhar compromissos <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>

            <div className="border-t border-[var(--line)]">
              {commitments.slice(0, 4).map((commitment, index) => (
                <div
                  key={commitment.id}
                  className="grid gap-4 border-b border-[var(--line)] py-8 sm:grid-cols-[64px_1fr_auto] sm:items-center"
                >
                  <span className="font-mono text-xs text-black/25">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-[-.03em]">{commitment.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">{commitment.summary}</p>
                  </div>
                  <span className="w-fit rounded-full bg-[var(--brand-soft)] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--brand-dark)]">
                    {commitment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── News + tools ── */}
      <section className="bg-white/55 py-24 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Informação oficial"
              title="Acompanhe a caminhada e os posicionamentos."
              description="Notícias, atualizações da plataforma e informações publicadas diretamente pela equipe."
            />
            <Link href="/noticias" className="shrink-0 text-sm font-bold text-[var(--brand-dark)]">
              Ver todas as notícias
            </Link>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
            {posts.slice(0, 1).map((post) => (
              <Link
                key={post.id}
                href={`/noticias/${post.slug}`}
                className="group relative min-h-[440px] overflow-hidden rounded-[36px] bg-[var(--hero)] p-8 text-white sm:p-10"
              >
                <div className="aurora absolute inset-0 opacity-70" aria-hidden />
                <div className="editorial-grid absolute inset-0 opacity-35" aria-hidden />
                <div className="relative flex h-full flex-col">
                  <span className="w-fit rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-white/55">
                    {post.category}
                  </span>
                  <div className="mt-auto pt-20">
                    <p className="text-xs text-white/35">{formatShortDate(post.publishedAt)}</p>
                    <h3 className="display-balance mt-4 max-w-2xl font-display text-3xl font-medium leading-[1.05] tracking-[-.035em] sm:text-4xl lg:text-5xl">
                      {post.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">{post.excerpt}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]">
                      Ler notícia{" "}
                      <ArrowUpRight
                        size={16}
                        className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            <div className="grid gap-5">
              <Link
                href="/verdade-ou-boato"
                className="group flex min-h-[200px] flex-col rounded-[32px] border border-[var(--line)] bg-white p-7 shadow-[0_8px_40px_rgba(11,28,21,.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(11,28,21,.1)]"
              >
                <ShieldCheck className="text-[var(--brand)]" strokeWidth={1.6} aria-hidden />
                <div className="mt-auto pt-8">
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--accent-strong)]">
                    Segurança da informação
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-[-.03em] sm:text-3xl">
                    Verdade ou boato?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                    Confirme mensagens e consulte os canais oficiais.
                  </p>
                </div>
              </Link>
              <Link
                href="/transparencia"
                className="group flex min-h-[200px] flex-col rounded-[32px] bg-[var(--accent)] p-7 text-[var(--hero)] transition hover:-translate-y-1 hover:bg-[var(--accent-strong)] hover:shadow-[0_20px_50px_rgba(212,168,75,.3)]"
              >
                <FileText strokeWidth={1.6} aria-hidden />
                <div className="mt-auto pt-8">
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--hero)]/50">
                    Prestação de contas
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-[-.03em] sm:text-3xl">
                    Transparência desde o começo.
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <section className="pb-10 pt-8 sm:pb-16">
        <Container>
          <div className="relative overflow-hidden rounded-[40px] bg-[var(--hero)] px-7 py-14 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-16">
            <div className="aurora absolute inset-0" aria-hidden />
            <div className="editorial-grid absolute inset-0 opacity-30" aria-hidden />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--accent)]">
                Sua cidade tem voz
              </p>
              <h2 className="display-balance mt-4 max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-[-.035em] sm:text-4xl lg:text-5xl">
                Qual é a prioridade que Brasília precisa enxergar?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
                Compartilhe uma necessidade, proposta ou problema do seu município. A equipe irá registrar e organizar a contribuição.
              </p>
            </div>
            <Link
              href="/demandas"
              className="relative mt-9 inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 text-sm font-bold text-[var(--hero)] shadow-[0_16px_40px_rgba(212,168,75,.25)] transition hover:-translate-y-0.5 lg:mt-0"
            >
              Enviar minha prioridade <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
