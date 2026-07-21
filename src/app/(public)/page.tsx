import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Photo, hasPhoto } from "@/components/photo";
import { content } from "@/config/site";
import { getPosts, getProposals } from "@/lib/data";
import { formatShortDate } from "@/lib/utils";

const bandeiraCopy: Record<string, string> = {
  Saúde: "Atenção básica, prevenção e acesso a exames e tratamentos perto de casa.",
  "Emprego e renda": "Qualificação e oportunidades que geram renda no Maranhão.",
  Infraestrutura: "Investimentos com transparência de prazos, valores e resultados.",
  "Direitos das mulheres": "Proteção, autonomia econômica e serviços especializados.",
};

const bandeiraTone = [
  "from-[#dff4fb] to-white",
  "from-[#ffe8df] to-white",
  "from-[#e7efff] to-white",
  "from-[#eef7f2] to-white",
];

export default async function HomePage() {
  const [proposals, posts] = await Promise.all([getProposals(), getPosts()]);
  const bandeiras = proposals.slice(0, 4);
  const [featured, ...rest] = posts;
  const heroSrc = content.candidate.photos.hero;
  const aboutSrc = content.candidate.photos.about;
  const participateSrc = content.candidate.photos.participate;
  const showHeroPhoto = hasPhoto(heroSrc);
  const showAboutPhoto = hasPhoto(aboutSrc);
  const showParticipatePhoto = hasPhoto(participateSrc);
  const highlights = content.highlights.slice(0, 3);
  const achievements = content.achievements;

  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#e9f7fc_0%,#fffdf9_42%,#fff4ef_100%)]">
        <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-[var(--cyan)]/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-[var(--coral)]/15 blur-3xl" aria-hidden />

        <Container className="relative grid items-end gap-8 pt-10 pb-0 lg:min-h-[calc(100dvh-70px)] lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10 lg:py-10">
          <div className="order-2 pb-10 lg:order-1 lg:pb-16">
            <p className="anim-rise text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--cyan-deep)]">
              {content.candidate.city} · {content.candidate.region} · {content.candidate.state}
            </p>
            <p className="anim-rise anim-d1 mt-4 text-sm font-bold text-[var(--muted)]">
              {content.candidate.office}
            </p>
            <h1 className="anim-rise anim-d1 mt-2 font-display text-[clamp(3rem,9vw,5.6rem)] font-extrabold leading-[0.92] tracking-[-0.055em]">
              Luzia <span className="text-[var(--cyan)]">Mary</span>
            </h1>
            <p className="anim-rise anim-d2 mt-5 max-w-md text-lg font-bold leading-snug text-[var(--ink)] sm:text-xl">
              {content.candidate.slogan}
            </p>
            <p className="anim-rise anim-d2 mt-4 max-w-md text-[15px] leading-7 text-[var(--muted)]">
              {content.candidate.homeLead}
            </p>
            <div className="anim-rise anim-d3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sobre"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--blue)] px-7 text-sm font-extrabold text-white shadow-[var(--glow)] transition hover:bg-[var(--blue-deep)]"
              >
                Conheça Luzia <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/demandas"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[var(--ink)]/10 bg-white px-7 text-sm font-extrabold text-[var(--ink)] transition hover:border-[var(--cyan)]"
              >
                Envie sua demanda
              </Link>
            </div>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-[480px] lg:order-2 lg:mx-0 lg:max-w-none lg:self-end">
            <div
              className="absolute inset-x-6 bottom-0 top-16 -z-0 rounded-[40%_60%_45%_55%/50%_40%_60%_50%] bg-[var(--cyan)]/25"
              aria-hidden
            />
            <div className="absolute -right-2 top-20 h-24 w-24 rounded-full bg-[var(--coral)]/30 blur-md" aria-hidden />
            {showHeroPhoto ? (
              <Photo
                src={heroSrc}
                alt={`${content.candidate.ballotName}, ${content.candidate.office}`}
                priority
                className="relative z-10 aspect-[3/4] w-full drop-shadow-[0_30px_60px_rgba(10,58,122,0.22)] sm:aspect-[4/5] lg:max-h-[min(78dvh,720px)] lg:aspect-auto lg:h-[min(78dvh,720px)]"
                imgClassName="object-contain object-bottom"
                objectPosition="center bottom"
              />
            ) : (
              <div
                className="relative z-10 aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#dff4fb_0%,#1aa6d6_45%,#0a3a7a_100%)] shadow-[var(--glow)] sm:aspect-[4/5] lg:h-[min(78dvh,720px)] lg:aspect-auto"
                aria-hidden
              >
                <div className="absolute -right-16 top-10 h-56 w-56 rounded-full border-[18px] border-white/15" />
                <div className="absolute -left-10 bottom-24 h-44 w-44 rounded-full bg-[var(--coral)]/40 blur-2xl" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--blue-deep)]/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                    {content.candidate.region}
                  </p>
                  <p className="mt-2 font-display text-2xl font-extrabold text-white">
                    {content.candidate.city} · {content.candidate.state}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ——— QUEM É ——— */}
      <section className="py-16 sm:py-20">
        <Container className={`grid items-center gap-10 lg:gap-14 ${showAboutPhoto ? "lg:grid-cols-[0.92fr_1.08fr]" : ""}`}>
          {showAboutPhoto && (
            <div className="relative mx-auto w-full max-w-[400px] lg:mx-0">
              <div className="absolute -left-3 top-6 h-[92%] w-full rounded-[1.75rem] bg-[var(--cyan)]/15" aria-hidden />
              <Photo
                src={aboutSrc}
                alt={`${content.candidate.ballotName} — trajetória`}
                className="relative aspect-[4/5] rounded-[1.75rem] shadow-[var(--glow)]"
              />
            </div>
          )}
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--coral)]">Trajetória</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.04em]">
              Quem é Luzia Mary
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">{content.candidate.bio[0]}</p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--muted)]">{content.candidate.bio[1]}</p>
            {content.candidate.motivation ? (
              <p className="mt-4 max-w-xl text-base font-semibold leading-8 text-[var(--ink)]">
                {content.candidate.motivation}
              </p>
            ) : null}

            {highlights.length > 0 && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <li key={item.label} className="rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] p-4">
                    <p className="font-display text-lg font-extrabold text-[var(--cyan-deep)]">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                  </li>
                ))}
              </ul>
            )}

            <Link href="/sobre" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--blue-deep)]">
              Ver história completa <ArrowUpRight size={16} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      {/* ——— BANDEIRAS ——— */}
      <section className="bg-[var(--bg-soft)] py-16 sm:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--coral)]">Bandeiras</p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.04em]">
                O que vamos defender
              </h2>
            </div>
            <Link href="/propostas" className="text-sm font-extrabold text-[var(--blue-deep)]">
              Todas as bandeiras
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {bandeiras.map((item, i) => (
              <Link
                key={item.id}
                href={`/propostas/${item.slug}`}
                className={`group relative overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-gradient-to-br ${bandeiraTone[i % 4]} p-7 transition hover:-translate-y-0.5 hover:shadow-[var(--glow)]`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-extrabold text-[var(--cyan)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--muted)]">
                    {item.category}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">
                  {bandeiraCopy[item.category] || item.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-[var(--blue-deep)]">
                  Saiba mais <ArrowUpRight size={15} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ——— RESULTADOS (só se houver dados confirmados) ——— */}
      {achievements.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--coral)]">Trajetória pública</p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.04em]">
              Fatos que constroem autoridade
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map((item) => (
                <div key={item.label} className="rounded-[1.25rem] border border-[var(--line)] bg-white p-6">
                  <p className="font-display text-3xl font-extrabold text-[var(--cyan)]">{item.value}</p>
                  <p className="mt-2 text-sm font-bold text-[var(--ink)]">{item.label}</p>
                  {item.detail && <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ——— NOTÍCIAS ——— */}
      <section className={`py-16 sm:py-20 ${achievements.length > 0 ? "bg-[var(--bg-soft)]" : ""}`}>
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--coral)]">Notícias</p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.04em]">
                Ações e atualizações
              </h2>
            </div>
            <Link href="/noticias" className="text-sm font-extrabold text-[var(--blue-deep)]">
              Ver todas
            </Link>
          </div>

          {featured ? (
            <div className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
              <Link
                href={`/noticias/${featured.slug}`}
                className="group overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-white"
              >
                {featured.imageUrl ? (
                  <div className="relative aspect-[16/9]">
                    <Photo src={featured.imageUrl} alt="" className="h-full w-full" fallback="shape" />
                  </div>
                ) : (
                  <div className="relative flex min-h-[220px] items-end bg-[linear-gradient(135deg,#1aa6d6,#1564c8)] p-7 text-white">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/70">
                        {featured.category}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                        {featured.title}
                      </h3>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  {featured.publishedAt && (
                    <p className="text-xs font-bold text-[var(--muted)]">{formatShortDate(featured.publishedAt)}</p>
                  )}
                  {!featured.imageUrl ? null : (
                    <h3 className="mt-2 font-display text-xl font-extrabold tracking-[-0.02em]">{featured.title}</h3>
                  )}
                  {featured.excerpt && (
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{featured.excerpt}</p>
                  )}
                </div>
              </Link>

              <div className="grid gap-4">
                {rest.slice(0, 2).map((post) => (
                  <Link
                    key={post.id}
                    href={`/noticias/${post.slug}`}
                    className="rounded-[1.25rem] border border-[var(--line)] bg-white p-5 transition hover:border-[var(--cyan)]/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--cyan-deep)]">
                        {post.category}
                      </span>
                      {post.publishedAt && (
                        <span className="text-xs text-[var(--muted)]">{formatShortDate(post.publishedAt)}</span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-extrabold tracking-[-0.02em]">{post.title}</h3>
                    {post.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{post.excerpt}</p>}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-[1.5rem] border border-dashed border-[var(--line)] bg-white px-6 py-12 text-center">
              <p className="font-display text-xl font-extrabold">Em breve, as primeiras atualizações</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">
                Notícias e ações oficiais serão publicadas aqui pela equipe.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* ——— CANAL DIRETO ——— */}
      <section className="border-y border-[var(--line)] bg-white py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--coral)]">Participação</p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3.5vw,2.6rem)] font-extrabold tracking-[-0.04em]">
                Um canal direto para ouvir você.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">
                Conte a prioridade do seu município. A equipe registra e devolve um protocolo de acompanhamento.
              </p>
              <Link
                href="/demandas"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--coral)] px-6 text-sm font-extrabold text-white"
              >
                Enviar demanda <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {[
                { n: "1", t: "Conte o que está acontecendo" },
                { n: "2", t: "A equipe registra sua demanda" },
                { n: "3", t: "Você recebe um protocolo" },
                { n: "4", t: "Isso ajuda a organizar prioridades" },
              ].map((s) => (
                <li key={s.n} className="flex items-start gap-3 rounded-2xl bg-[var(--bg-soft)] px-5 py-4">
                  <span className="font-display text-xl font-extrabold text-[var(--cyan)]">{s.n}</span>
                  <span className="pt-0.5 text-sm font-bold leading-6 text-[var(--ink)]">{s.t}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ——— PARTICIPAÇÃO FINAL ——— */}
      <section className="py-16 sm:py-20">
        <Container>
          <div
            className={`grid overflow-hidden rounded-[1.75rem] bg-[linear-gradient(125deg,#e9f7fc_0%,#fff_48%,#ffe9e1_100%)] ${
              showParticipatePhoto ? "lg:grid-cols-[1.15fr_0.85fr]" : ""
            }`}
          >
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--coral)]">Participe</p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3.5vw,2.7rem)] font-extrabold tracking-[-0.04em]">
                Sua cidade tem voz. Vamos juntos.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">
                Envie uma demanda, acompanhe a caminhada e fale com a equipe pelos canais oficiais.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/demandas"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--coral)] px-6 text-sm font-extrabold text-white"
                >
                  Enviar demanda <ArrowRight size={16} aria-hidden />
                </Link>
                {content.contact.whatsapp ? (
                  <a
                    href={`https://wa.me/${content.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[var(--ink)]/10 bg-white px-6 text-sm font-extrabold"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <Link
                    href="/sobre"
                    className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[var(--ink)]/10 bg-white px-6 text-sm font-extrabold"
                  >
                    Conhecer Luzia
                  </Link>
                )}
              </div>
            </div>
            {showParticipatePhoto && (
              <Photo
                src={participateSrc}
                alt={`${content.candidate.ballotName} convida à participação`}
                className="min-h-[280px] w-full lg:h-full"
                objectPosition="center center"
              />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
