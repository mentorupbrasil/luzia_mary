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
    <section className="border-b border-[var(--line)] bg-[linear-gradient(160deg,#e9f7fc_0%,#fffdf9_70%)] py-12 sm:py-14">
      <Container>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[var(--coral)]">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">{description}</p>
      </Container>
    </section>
  );
}

export function PageHero(props: { eyebrow: string; title: string; description: string }) {
  return <PublicPageHero {...props} />;
}
