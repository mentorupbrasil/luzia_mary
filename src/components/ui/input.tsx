import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition placeholder:text-black/35 focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]", className)} {...props} />;
}
