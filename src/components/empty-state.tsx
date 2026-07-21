import { Inbox } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="rounded-[28px] border border-dashed border-black/15 bg-white/60 px-6 py-14 text-center"><Inbox className="mx-auto text-black/30"/><h3 className="mt-4 font-bold">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/50">{description}</p></div>;
}
