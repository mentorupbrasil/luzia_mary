import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "left", className }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-4 text-[10px] font-bold uppercase tracking-[.28em] text-[var(--brand)]">{eyebrow}</p>}
      <h2 className="display-balance font-display text-4xl font-semibold leading-[1.02] tracking-[-.045em] text-[var(--ink)] sm:text-5xl lg:text-6xl">{title}</h2>
      {description && <p className="copy-balance mt-6 text-base leading-8 text-black/58 sm:text-lg">{description}</p>}
    </div>
  );
}
