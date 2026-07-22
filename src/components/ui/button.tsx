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
        "inline-flex items-center justify-center gap-2 rounded-full font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-[var(--blue)] text-white hover:bg-[var(--blue-deep)]",
        variant === "secondary" && "bg-[var(--coral)] text-white hover:brightness-95",
        variant === "outline" && "border border-[var(--line)] bg-white text-[var(--ink)]",
        variant === "ghost" && "text-[var(--ink)] hover:bg-black/5",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-7 text-base",
        size === "icon" && "h-10 w-10",
        className,
      )}
      {...props}
    />
  );
}
