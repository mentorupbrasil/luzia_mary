import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const sizes = {
  sm: { className: "h-8 w-auto", width: 220, height: 73 },
  md: { className: "h-10 w-auto", width: 260, height: 86 },
  lg: { className: "h-11 w-auto sm:h-12", width: 320, height: 106 },
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
