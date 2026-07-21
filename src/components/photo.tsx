import Image from "next/image";
import { cn } from "@/lib/utils";
import { publicAssetExists } from "@/lib/public-asset";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  objectPosition?: string;
  /** Se false e a imagem não existir, retorna null (oculta o bloco). */
  fallback?: "hide" | "shape";
};

export function Photo({
  src,
  alt,
  className,
  imgClassName,
  priority,
  objectPosition = "center top",
  fallback = "hide",
}: Props) {
  const exists = publicAssetExists(src);

  if (!exists) {
    if (fallback === "hide") return null;
    return (
      <div
        className={cn("relative overflow-hidden bg-[linear-gradient(145deg,#d8eff8,#e8f4ff,#fff)]", className)}
        aria-hidden
      >
        <div className="absolute -right-8 top-10 h-40 w-40 rounded-full bg-[var(--cyan)]/20 blur-2xl" />
        <div className="absolute -bottom-10 left-6 h-36 w-36 rounded-full bg-[var(--coral)]/15 blur-2xl" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn("object-cover", imgClassName)}
        style={{ objectPosition }}
      />
    </div>
  );
}

export function hasPhoto(src: string) {
  return publicAssetExists(src);
}
