import { Container } from "./container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--hero)] py-20 text-white sm:py-24">
      <div className="aurora absolute inset-0" aria-hidden />
      <div className="editorial-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="paper-noise absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full border border-white/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-16 top-20 h-40 w-40 rounded-full border border-[var(--accent)]/25"
        aria-hidden
      />
      <Container className="relative">
        <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--accent)]">{eyebrow}</p>
        <h1 className="display-balance mt-5 max-w-5xl font-display text-4xl font-medium leading-[1.02] tracking-[-.035em] sm:text-5xl lg:text-6xl xl:text-7xl">
          {title}
        </h1>
        <p className="copy-balance mt-7 max-w-3xl text-base leading-8 text-white/55 sm:text-lg">{description}</p>
      </Container>
    </section>
  );
}
