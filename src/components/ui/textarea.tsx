import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full resize-y border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--text-muted)]/70 focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]",
        className,
      )}
      style={{ borderRadius: "var(--radius)" }}
      {...props}
    />
  );
}
