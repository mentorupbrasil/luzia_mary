import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full border border-[var(--border)] bg-[var(--surface)] px-4 text-sm outline-none transition placeholder:text-[var(--text-muted)]/70 focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]",
        className,
      )}
      style={{ borderRadius: "var(--radius)" }}
      {...props}
    />
  );
}
