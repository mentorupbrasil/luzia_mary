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
  { number: "01", title: "Escutar de verdade", text: "Um canal organizado para transformar a realidade de cada município em prioridade de trabalho." },
  { number: "02", title: "Trabalhar com método", text: "Propostas com objetivo, caminho possível, indicador e acompanhamento público." },
  { number: "03", title: "Prestar contas", text: "A população acompanha compromissos, agendas, resultados e decisões em linguagem simples." },
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
      <section className="relative overflow-hidden bg-[var(--hero)] text-white">
        <div className="editorial-grid absolute inset-0 opacity-45" aria-hidden />
        <div className="paper-noise absolute inset-0" aria-hidden />
        <div className="absolute -left-40 bottom-[-220px] h-[520px] w-[520px] rounded-full bg-[var(--brand)]/20 blur-3xl" aria-hidden />
        <div className="absolute right-[-160px] top-[-180px] h-[460px] w-[460px] rounded-full border border-white/10" aria-hidden />

        <Container className="relative grid min-h-[760px] items-center gap-14 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <div className="relative z-10">
            <div className="animate-rise inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[.055] px-4 py-2 text-[10px] font-bold uppercase tracking-[.22em] text-white/62 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              {siteConfig.candidate.cityBase} · {siteConfig.candidate.region} · {siteConfig.candidate.state}
            </div>

            <h1 className="animate-rise animate-rise-delay-1 display-balance mt-8 max-w-4xl font-display text-[clamp(4.5rem,10vw,8.2rem)] font-semibold leading-[.82] tracking-[-.065em]">
              Luzia <span className="text-[var(--accent)]">Mary</span>
            </h1>

            <p className="animate-rise animate-rise-delay-2 mt-8 max-w-2xl text-xl font-semibold leading-snug text-white/92 sm:text-2xl">
              {siteConfig.candidate.slogan}
            </p>
            <p className="animate-rise animate-rise-delay-2 copy-balance mt-5 max-w-xl text-base leading-8 text-white/56 sm:text-lg">
              {siteConfig.candidate.shortBio}
            </p>

            <div className="animate-rise animate-rise-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/sobre" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]">
                Conheça Luzia Mary <ArrowRight size={17} aria-hidden />
              </Link>
              <Link href="/demandas" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[.055] px-7 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/32 hover:bg-white/10">
                Envie sua prioridade
              </Link>
            </div>

            <div className="mt-11 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-3">
              <div>
                <p className="font-display text-3xl font-semibold">{proposals.length}</p>
                <p className="mt-1 text-xs text-white/42">prioridades organizadas</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold">{commitments.length}</p>
                <p className="mt-1 text-xs text-white/42">compromissos públicos</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-display text-3xl font-semibold">{stats.total > 0 ? stats.total : "Aberto"}</p>
                <p className="mt-1 text-xs text-white/42">canal de participação</p>
              </div>
            </div>
          </div>

          <CandidateVisual />
        </Container>
      </section>

      <section className="border-b border-black/[.08] bg-white/55">
        <Container className="grid lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <div key={pillar.number} className={`px-0 py-10 lg:px-8 ${index > 0 ? "border-t border-black/[.08] lg:border-l lg:border-t-0" : ""}`}>
              <p className="font-mono text-[10px] font-semibold text-[var(--accent)]">{pillar.number}</p>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-.035em]">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-black/55">{pillar.text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_.7fr]">
            <SectionHeading
              eyebrow="Prioridades"
              title="O mandato começa pelas necessidades de quem vive o Maranhão real."
              description="Menos promessa genérica. Cada prioridade apresenta um problema concreto, o papel de uma deputada federal e como o resultado poderá ser acompanhado."
            />
            <div className="lg:justify-self-end">
              <Link href="/propostas" className="inline-flex items-center gap-2 border-b border-[var(--brand)] pb-1 text-sm font-bold text-[var(--brand-dark)]">
                Ver todas as prioridades <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {proposals.slice(0, 6).map((proposal, index) => (
              <ProposalCard key={proposal.id} proposal={proposal} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-hidden bg-[var(--brand)] py-24 text-white sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[.86fr_1.14fr]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/48">Gabinete digital desde agora</p>
            <h2 className="display-balance mt-5 font-display text-5xl font-semibold leading-[.98] tracking-[-.05em] sm:text-6xl">
              Tecnologia que aproxima, organiza e dá resposta.
            </h2>
            <p className="copy-balance mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              Este site não foi criado apenas para apresentar uma pré-candidata. Ele foi pensado para receber demandas, organizar compromissos e criar uma relação pública de responsabilidade.
            </p>
            <Link href="/demandas" className="mt-8 inline-flex h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[var(--brand-dark)] transition hover:-translate-y-0.5">
              Participar agora <ArrowRight size={17} aria-hidden />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: MessageSquareText, title: "Demanda com protocolo", text: "Cada contribuição entra no sistema com município, tema e número de acompanhamento." },
              { icon: MapPinned, title: "Mapa de prioridades", text: "As necessidades recebidas podem ser consolidadas por cidade e área de atuação." },
              { icon: BarChart3, title: "Compromissos mensuráveis", text: "Metas, indicadores e andamento publicados de forma simples e verificável." },
              { icon: ShieldCheck, title: "Informação oficial", text: "Canais verificados, proteção de dados e uma área específica para esclarecer boatos." },
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] border border-white/14 bg-white/[.08] p-6 backdrop-blur-sm">
                <item.icon className="text-white" strokeWidth={1.7} aria-hidden />
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-.035em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/57">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--accent)]">Compromisso público</p>
              <h2 className="display-balance mt-5 font-display text-5xl font-semibold leading-[.98] tracking-[-.05em] sm:text-6xl">
                Não basta dizer. É preciso mostrar como será feito.
              </h2>
              <p className="mt-6 text-base leading-8 text-black/58">
                Os compromissos transformam valores em entregas acompanháveis. A proposta é manter esse padrão da pré-campanha ao mandato.
              </p>
              <Link href="/compromissos" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]">
                Acompanhar compromissos <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>

            <div className="border-t border-black/[.1]">
              {commitments.slice(0, 4).map((commitment, index) => (
                <div key={commitment.id} className="grid gap-4 border-b border-black/[.1] py-7 sm:grid-cols-[64px_1fr_auto] sm:items-center">
                  <span className="font-mono text-xs text-black/30">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-.035em]">{commitment.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-black/52">{commitment.summary}</p>
                  </div>
                  <span className="w-fit rounded-full bg-[var(--brand-soft)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--brand-dark)]">
                    {commitment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white/55 py-24 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Informação oficial"
              title="Acompanhe a caminhada e os posicionamentos."
              description="Notícias, atualizações da plataforma e informações publicadas diretamente pela equipe."
            />
            <Link href="/noticias" className="shrink-0 text-sm font-bold text-[var(--brand-dark)]">Ver todas as notícias</Link>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
            {posts.slice(0, 1).map((post) => (
              <Link key={post.id} href={`/noticias/${post.slug}`} className="group relative min-h-[420px] overflow-hidden rounded-[34px] bg-[var(--hero)] p-8 text-white sm:p-10">
                <div className="editorial-grid absolute inset-0 opacity-40" aria-hidden />
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/12" aria-hidden />
                <div className="relative flex h-full flex-col">
                  <span className="w-fit rounded-full border border-white/14 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-white/58">{post.category}</span>
                  <div className="mt-auto pt-20">
                    <p className="text-xs text-white/38">{formatShortDate(post.publishedAt)}</p>
                    <h3 className="display-balance mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-[-.045em] sm:text-5xl">{post.title}</h3>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/56">{post.excerpt}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold">Ler notícia <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></span>
                  </div>
                </div>
              </Link>
            ))}

            <div className="grid gap-5">
              <Link href="/verdade-ou-boato" className="group flex min-h-[198px] flex-col rounded-[30px] border border-black/[.08] bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <ShieldCheck className="text-[var(--brand)]" strokeWidth={1.7} aria-hidden />
                <div className="mt-auto pt-8">
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--accent)]">Segurança da informação</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.04em]">Verdade ou boato?</h3>
                  <p className="mt-2 text-sm leading-6 text-black/50">Confirme mensagens e consulte os canais oficiais.</p>
                </div>
              </Link>
              <Link href="/transparencia" className="group flex min-h-[198px] flex-col rounded-[30px] bg-[var(--accent)] p-7 text-white transition hover:-translate-y-1 hover:shadow-xl">
                <FileText strokeWidth={1.7} aria-hidden />
                <div className="mt-auto pt-8">
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/58">Prestação de contas</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.04em]">Transparência desde o começo.</h3>
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[38px] bg-[var(--hero)] px-7 py-14 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
            <div className="editorial-grid absolute inset-0 opacity-35" aria-hidden />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--accent)]">Sua cidade tem voz</p>
              <h2 className="display-balance mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-.045em] sm:text-5xl">
                Qual é a prioridade que Brasília precisa enxergar?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/54 sm:text-base">
                Compartilhe uma necessidade, proposta ou problema do seu município. A equipe irá registrar e organizar a contribuição.
              </p>
            </div>
            <Link href="/demandas" className="relative mt-8 inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-[var(--hero)] lg:mt-0">
              Enviar minha prioridade <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
