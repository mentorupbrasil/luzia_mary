export function AdminPageHeader({ eyebrow = "Painel", title, description }: { eyebrow?: string; title: string; description: string }) {
  return <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--brand)]">{eyebrow}</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{title}</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-black/50">{description}</p></div>;
}
