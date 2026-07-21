import { BriefcaseBusiness, GraduationCap, HeartPulse, Landmark, Route, ShieldCheck, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "briefcase-business": BriefcaseBusiness,
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
  landmark: Landmark,
  route: Route,
  "shield-check": ShieldCheck,
};

export function IconBox({ name = "landmark" }: { name?: string | null }) {
  const Icon = icons[name || "landmark"] || Landmark;
  return <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]"><Icon size={22} strokeWidth={1.8}/></span>;
}
