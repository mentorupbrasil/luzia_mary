import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const sizes = {
  sm: { className: "h-8 w-auto", width: 200, height: 40 },
  md: { className: "h-10 w-auto sm:h-11", width: 260, height: 52 },
  lg: { className: "h-12 w-auto sm:h-14", width: 320, height: 64 },
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
