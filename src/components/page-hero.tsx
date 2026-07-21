import { Container } from "./container";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="relative overflow-hidden border-b border-black/[.05] py-16 sm:py-20"><div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(244,214,138,.28),transparent_27rem),radial-gradient(circle_at_85%_30%,rgba(23,111,87,.12),transparent_24rem)]"/><Container><p className="text-xs font-bold uppercase tracking-[.24em] text-[var(--brand)]">{eyebrow}</p><h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-.045em] sm:text-5xl lg:text-6xl">{title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">{description}</p></Container></section>;
}
