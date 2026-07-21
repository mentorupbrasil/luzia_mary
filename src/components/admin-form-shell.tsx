import { Card, CardContent } from "./ui/card";

export function AdminFormShell({ title, children }: { title: string; children: React.ReactNode }) {
  return <Card><CardContent className="p-6"><h2 className="text-lg font-bold">{title}</h2><div className="mt-5">{children}</div></CardContent></Card>;
}

export function AdminCheckbox({ name, label, defaultChecked = true }: { name: string; label: string; defaultChecked?: boolean }) {
  return <label className="flex items-center gap-3 text-sm font-semibold text-black/60"><input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-[var(--brand)]"/>{label}</label>;
}
