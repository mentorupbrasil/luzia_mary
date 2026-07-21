import { Inbox } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-[var(--border)] bg-white px-6 py-14 text-center">
      <Inbox className="mx-auto text-[var(--text-muted)]/40" aria-hidden />
      <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">{description}</p>
    </div>
  );
}
