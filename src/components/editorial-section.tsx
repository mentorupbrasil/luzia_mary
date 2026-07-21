import { cn } from "@/lib/utils";

export function EditorialSection({
  eyebrow,
  title,
  description,
  action,
  children,
  className,
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  tone?: "default" | "muted" | "ink";
}) {
  return (
    <section
      className={cn(
        "py-20 sm:py-24",
        tone === "muted" && "bg-[var(--surface-muted)]/55",
        tone === "ink" && "bg-[var(--hero)] text-white",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {eyebrow && (
              <p
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.22em]",
                  tone === "ink" ? "text-[var(--accent)]" : "text-[var(--accent)]",
                )}
              >
                {eyebrow}
              </p>
            )}
            <h2
              className={cn(
                "display-balance mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]",
                tone === "ink" ? "text-white" : "text-[var(--ink)]",
              )}
            >
              {title}
            </h2>
            {description && (
              <p
                className={cn(
                  "copy-balance mt-5 max-w-2xl text-base leading-8",
                  tone === "ink" ? "text-white/60" : "text-[var(--text-muted)]",
                )}
              >
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
