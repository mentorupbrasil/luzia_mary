import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-12 w-full border border-[var(--border)] bg-[var(--surface)] px-4 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]",
        className,
      )}
      style={{ borderRadius: "var(--radius)" }}
      {...props}
    />
  );
}
