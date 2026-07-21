import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const sizes = {
  sm: { className: "h-8 w-auto", width: 240, height: 80 },
  md: { className: "h-10 w-auto sm:h-11", width: 300, height: 100 },
  lg: { className: "h-11 w-auto sm:h-12", width: 360, height: 120 },
} as const;

export function BrandLogo({ className, size = "md", priority = false }: Props) {
  const dims = sizes[size];

  return (
    <Image
      src="/images/luzia-mary-logo.png"
      alt="Luzia Mary"
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={cn("brand-logo object-contain object-left", dims.className, className)}
    />
  );
}
