import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
          {eyebrow}
        </p>
      )}
      <h2 className="display-balance mt-4 font-display text-[clamp(1.9rem,3.5vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--ink)]">
        {title}
      </h2>
      {description && (
        <p className="copy-balance mt-5 text-base leading-8 text-[var(--text-muted)]">{description}</p>
      )}
    </div>
  );
}
