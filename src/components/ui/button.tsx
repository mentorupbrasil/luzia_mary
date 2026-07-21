import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-[var(--brand)] text-white shadow-[0_10px_30px_rgba(15,107,79,.28)] hover:-translate-y-0.5 hover:bg-[var(--brand-dark)]",
        variant === "secondary" && "bg-[var(--accent)] text-[var(--hero)] hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]",
        variant === "outline" && "border border-black/10 bg-white text-[var(--ink)] hover:border-[var(--brand)]/40 hover:bg-[var(--surface)]",
        variant === "ghost" && "text-[var(--ink)] hover:bg-black/5",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-13 px-7 text-base",
        size === "icon" && "h-10 w-10",
        className,
      )}
      {...props}
    />
  );
}
