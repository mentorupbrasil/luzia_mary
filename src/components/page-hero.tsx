import { Container } from "./container";

export function PublicPageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--hero)] py-16 text-white sm:py-20">
      <div className="absolute -right-24 top-0 h-72 w-72 rounded-full border border-white/10" aria-hidden />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[var(--accent)] via-white/20 to-transparent" aria-hidden />
      <Container className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">{eyebrow}</p>
        <h1 className="display-balance mt-5 max-w-4xl font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {title}
        </h1>
        <p className="copy-balance mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">{description}</p>
      </Container>
    </section>
  );
}

/** Compatibilidade com importações existentes */
export function PageHero(props: { eyebrow: string; title: string; description: string }) {
  return <PublicPageHero {...props} />;
}
