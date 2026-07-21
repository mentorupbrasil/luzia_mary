import { Container } from "@/components/container";

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
    <section className="border-b border-[var(--border)] bg-[linear-gradient(160deg,#eef4ff_0%,#faf9f7_70%)] py-12 sm:py-14">
      <Container>
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">{eyebrow}</p>
        <h1 className="display-balance mt-3 max-w-3xl font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.04em]">
          {title}
        </h1>
        <p className="copy-balance mt-4 max-w-2xl text-base leading-8 text-[var(--text-muted)]">{description}</p>
      </Container>
    </section>
  );
}

export function PageHero(props: { eyebrow: string; title: string; description: string }) {
  return <PublicPageHero {...props} />;
}
