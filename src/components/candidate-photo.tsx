import Image from "next/image";
import { cn } from "@/lib/utils";
import { publicAssetExists } from "@/lib/public-asset";

type CandidatePhotoProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
  variant?: "hero" | "portrait" | "wide" | "cover";
};

/**
 * Exibe a fotografia se o arquivo existir em /public.
 * Sem arquivo: bloco abstrato limpo, sem texto técnico.
 */
export function CandidatePhoto({
  src,
  alt,
  className,
  priority = false,
  objectPosition = "center top",
  variant = "portrait",
}: CandidatePhotoProps) {
  const exists = publicAssetExists(src);
  const aspect =
    variant === "cover"
      ? "h-full min-h-[280px] w-full"
      : variant === "hero"
        ? "aspect-[4/5] sm:aspect-[3/4]"
        : variant === "wide"
          ? "aspect-[5/4]"
          : "aspect-[4/5]";

  if (!exists) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-[var(--sky)] via-[var(--brand-soft)] to-[var(--surface-muted)]",
          aspect,
          className,
        )}
        aria-hidden
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-[var(--brand)]/15 blur-2xl" />
        <div className="absolute inset-8 rounded-[2rem] border border-white/50" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", aspect, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 48vw"
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}
