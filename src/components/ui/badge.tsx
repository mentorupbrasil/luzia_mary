import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, tone = "neutral", ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "brand" | "success" | "warning" | "danger" }) {
  return <span className={cn(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
    tone === "neutral" && "bg-black/5 text-black/60",
    tone === "brand" && "bg-[var(--brand-soft)] text-[var(--brand-dark)]",
    tone === "success" && "bg-emerald-100 text-emerald-800",
    tone === "warning" && "bg-amber-100 text-amber-900",
    tone === "danger" && "bg-red-100 text-red-800",
    className,
  )} {...props} />;
}
