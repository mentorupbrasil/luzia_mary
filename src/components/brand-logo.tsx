import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  unoptimized?: boolean;
  /** `light` = logo branco (fundo escuro). `dark` = logo escuro (fundo claro). */
  variant?: "light" | "dark";
};

const sizes = {
  sm: { className: "h-7 w-auto", width: 220, height: 30 },
  md: { className: "h-9 w-auto", width: 280, height: 39 },
  lg: { className: "h-10 w-auto sm:h-11", width: 320, height: 44 },
} as const;

export function BrandLogo({
  className,
  size = "md",
  priority = false,
  unoptimized = false,
  variant = "dark",
}: Props) {
  const dims = sizes[size];

  return (
    <Image
      src={variant === "light" ? "/images/luzia-mary-logo.png" : "/images/luzia-mary-logo-dark.png"}
      alt="Luzia Mary"
      width={dims.width}
      height={dims.height}
      priority={priority}
      unoptimized={unoptimized}
      className={cn("brand-logo object-contain object-left", dims.className, className)}
    />
  );
}
