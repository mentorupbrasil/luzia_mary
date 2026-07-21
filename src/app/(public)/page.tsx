import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CandidatePhoto } from "@/components/candidate-photo";
import { Container } from "@/components/container";
import { siteConfig } from "@/config/site";
import { getPosts, getProposals } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

const bandeiraHints: Record<string, string> = {
  Saúde: "Atenção básica, prevenção e acesso a exames e tratamentos na região.",
  "Emprego e renda": "Qualificação, pequenos negócios e oportunidades que fiquem no Maranhão.",
  Infraestrutura: "Investimentos acompanhados com transparência de prazos e resultados.",
  "Direitos das mulheres": "Proteção, autonomia econômica e serviços especializados.",
};

export default async function HomePage() {
  const [proposals, posts] = await Promise.all([getProposals(), getPosts()]);
  const bandeiras = proposals.slice(0, 4);
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f7f9fd_0%,#e8f0fb_48%,#faf9f7_100%)]">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[var(--sky)]/50 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[var(--brand)]/10 blur-3xl" aria-hidden />

        <Container className="relative grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
          <div className="order-2 lg:order-1">
            <p className="animate-rise text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--brand)]">
              {siteConfig.candidate.cityBase} · {siteConfig.candidate.region} · {siteConfig.candidate.state}
            </p>
            <p className="animate-rise animate-rise-delay-1 mt-4 text-sm font-semibold text-[var(--text-muted)]">
              {siteConfig.candidate.office}
            </p>
            <h1 className="animate-rise animate-rise-delay-1 mt-3 font-display text-[clamp(2.8rem,8vw,5.2rem)] font-bold leading-[0.98] tracking-[-0.05em] text-[var(--ink)]">
              Luzia <span className="text-[var(--brand)]">Mary</span>
            </h1>
            <p className="animate-rise animate-rise-delay-2 mt-5 max-w-md text-lg font-semibold leading-snug text-[var(--ink)] sm:text-xl">
              {siteConfig.candidate.slogan}
            </p>
            <p className="animate-rise animate-rise-delay-2 copy-balance mt-4 max-w-md text-[15px] leading-7 text-[var(--text-muted)]">
              {siteConfig.candidate.homeIntro}
            </p>
            <div className="animate-rise animate-rise-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sobre"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(47,111,237,.25)] transition hover:bg-[var(--brand-dark)]"
              >
                Conheça Luzia Mary <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/demandas"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 text-sm font-bold text-[var(--ink)] transition hover:border-[var(--brand)]/30"
              >
                Envie sua demanda
              </Link>
            </div>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-[440px] lg:order-2 lg:mx-0 lg:max-w-none">
            <div className="soft-blob absolute -inset-4 bg-[var(--brand)]/10 blur-xl sm:-inset-6" aria-hidden />
            <div className="soft-blob absolute -right-4 top-8 h-28 w-28 bg-[var(--accent)]/20 blur-md" aria-hidden />
            <div className="photo-frame relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-2">
              <CandidatePhoto
                src={siteConfig.candidate.photos.hero}
                alt={`${siteConfig.candidate.ballotName} — ${siteConfig.candidate.office}`}
                variant="hero"
                priority
                className="rounded-[1.6rem]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Quem é */}
      <section className="py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-[380px] lg:mx-0">
            <div className="absolute -left-3 top-8 h-full w-full rounded-[2rem] bg-[var(--brand-soft)]" aria-hidden />
            <div className="photo-frame relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white">
              <CandidatePhoto
                src={siteConfig.candidate.photos.about}
                alt={`${siteConfig.candidate.ballotName} — trajetória`}
                className="rounded-[2rem]"
              />
            </div>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Conheça</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.04em]">
              Quem é Luzia Mary
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-muted)]">
              {siteConfig.candidate.bio[0]}
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-muted)]">
              {siteConfig.candidate.bio[1]}
            </p>
            <Link
              href="/sobre"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-dark)]"
            >
              Ver trajetória completa <ArrowUpRight size={16} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      {/* Bandeiras */}
      <section className="bg-[var(--surface-muted)]/70 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Bandeiras</p>
              <h2 className="mt-3 max-w-xl font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.04em]">
                O que vamos defender
              </h2>
            </div>
            <Link href="/propostas" className="text-sm font-bold text-[var(--brand-dark)]">
              Ver todas as bandeiras
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {bandeiras.map((item, index) => (
              <Link
                key={item.id}
                href={`/propostas/${item.slug}`}
                className="group relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"
              >
                <div
                  className="absolute inset-y-0 right-0 w-1/3 opacity-90"
                  style={{
                    background:
                      index % 4 === 0
                        ? "linear-gradient(135deg, transparent, var(--brand-soft))"
                        : index % 4 === 1
                          ? "linear-gradient(135deg, transparent, var(--accent-soft))"
                          : index % 4 === 2
                            ? "linear-gradient(135deg, transparent, #dce8f8)"
                            : "linear-gradient(135deg, transparent, #f3e9e4)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-bold text-[var(--brand)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.03em] text-[var(--ink)] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-[var(--text-muted)]">
                    {bandeiraHints[item.category] || item.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-dark)]">
                    Saiba mais <ArrowUpRight size={15} aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Notícias — só com dados reais do banco */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Notícias</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.04em]">
                Ações e atualizações
              </h2>
            </div>
            <Link href="/noticias" className="text-sm font-bold text-[var(--brand-dark)]">
              Ver notícias
            </Link>
          </div>

          {featured ? (
            <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_0.85fr]">
              <Link
                href={`/noticias/${featured.slug}`}
                className="group overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--brand-dark)] text-white"
              >
                <div className="relative min-h-[280px] bg-gradient-to-br from-[var(--brand)] to-[var(--brand-dark)] p-8">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                    {featured.category}
                  </span>
                  <div className="mt-16">
                    {featured.publishedAt && (
                      <p className="text-xs text-white/45">{formatShortDate(featured.publishedAt)}</p>
                    )}
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                      {featured.title}
                    </h3>
                    {featured.excerpt && (
                      <p className="mt-4 max-w-lg text-sm leading-7 text-white/60">{featured.excerpt}</p>
                    )}
                  </div>
                </div>
              </Link>
              <div className="grid gap-4">
                {rest.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/noticias/${post.slug}`}
                    className="rounded-[1.25rem] border border-[var(--border)] bg-white p-5 transition hover:border-[var(--brand)]/25"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--brand)]">
                        {post.category}
                      </span>
                      {post.publishedAt && (
                        <span className="text-xs text-[var(--text-muted)]">{formatShortDate(post.publishedAt)}</span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold tracking-[-0.02em]">{post.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-[1.75rem] border border-dashed border-[var(--border)] bg-white px-6 py-12 text-center">
              <p className="font-display text-xl font-bold tracking-[-0.02em]">Em breve, as primeiras atualizações</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--text-muted)]">
                Notícias e ações oficiais serão publicadas aqui pela equipe da campanha.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Gabinete digital — compacto */}
      <section className="border-y border-[var(--border)] bg-white py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Participação</p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-bold tracking-[-0.04em]">
                Um canal direto para ouvir você.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-muted)]">
                Conte a prioridade do seu município. A equipe registra, organiza e devolve um protocolo de acompanhamento.
              </p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {[
                { n: "01", t: "Envie a demanda" },
                { n: "02", t: "Receba o protocolo" },
                { n: "03", t: "A equipe organiza" },
                { n: "04", t: "Acompanhe o retorno" },
              ].map((step) => (
                <li
                  key={step.n}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-5 py-4"
                >
                  <span className="font-display text-lg font-bold text-[var(--brand)]">{step.n}</span>
                  <span className="text-sm font-semibold text-[var(--ink)]">{step.t}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Participação final */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(120deg,#eef4ff_0%,#ffffff_45%,#fff5f1_100%)] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Participe</p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.6rem)] font-bold tracking-[-0.04em]">
                Sua cidade tem voz. Vamos ouvir juntos.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-muted)]">
                Envie uma demanda ou sugestão, acompanhe a candidata e fale com a equipe pelos canais oficiais.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/demandas"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-bold text-white"
                >
                  Enviar demanda <ArrowRight size={16} aria-hidden />
                </Link>
                <Link
                  href="/sobre"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--border)] bg-white px-6 text-sm font-bold text-[var(--ink)]"
                >
                  Conhecer Luzia Mary
                </Link>
              </div>
            </div>
            <div className="relative min-h-[280px] lg:min-h-full">
              <CandidatePhoto
                src={siteConfig.candidate.photos.participate}
                alt={`${siteConfig.candidate.ballotName} convida à participação`}
                variant="cover"
                className="rounded-none"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
