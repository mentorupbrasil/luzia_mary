import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  /** `light` = logo branco (fundo escuro). `dark` = logo escuro (fundo claro). */
  variant?: "light" | "dark";
};

const sizeMap = {
  sm: { className: "h-7 w-auto", width: 220, height: 30, sizes: "140px" },
  md: { className: "h-9 w-auto", width: 280, height: 39, sizes: "180px" },
  lg: { className: "h-10 w-auto sm:h-11", width: 320, height: 44, sizes: "(max-width: 640px) 200px, 240px" },
} as const;

export function BrandLogo({
  className,
  size = "md",
  priority = false,
  variant = "dark",
}: Props) {
  const dims = sizeMap[size];

  return (
    <Image
      src={variant === "light" ? "/images/luzia-mary-logo.png" : "/images/luzia-mary-logo-dark.png"}
      alt="Luzia Mary"
      width={dims.width}
      height={dims.height}
      priority={priority}
      sizes={dims.sizes}
      quality={85}
      className={cn("brand-logo object-contain object-left", dims.className, className)}
    />
  );
}
