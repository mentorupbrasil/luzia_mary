import { Container } from "./container";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden bg-[var(--hero)] py-20 text-white sm:py-24">
      <div className="editorial-grid absolute inset-0 opacity-45" aria-hidden />
      <div className="paper-noise absolute inset-0" aria-hidden />
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" aria-hidden />
      <div className="absolute -right-10 top-6 h-56 w-56 rounded-full border border-[var(--accent)]/30" aria-hidden />
      <Container className="relative">
        <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--accent)]">{eyebrow}</p>
        <h1 className="display-balance mt-5 max-w-5xl font-display text-5xl font-semibold leading-[.96] tracking-[-.045em] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="copy-balance mt-7 max-w-3xl text-base leading-8 text-white/58 sm:text-lg">{description}</p>
      </Container>
    </section>
  );
}
