import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "left", className }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; className?: string }) {
  return <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
    {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-[var(--brand)]">{eyebrow}</p>}
    <h2 className="font-display text-3xl font-medium tracking-[-.02em] text-[var(--ink)] sm:text-4xl lg:text-5xl">{title}</h2>
    {description && <p className="mt-5 text-base leading-7 text-black/60 sm:text-lg">{description}</p>}
  </div>;
}
