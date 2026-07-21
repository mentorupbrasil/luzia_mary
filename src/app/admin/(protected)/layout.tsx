import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { getAdminSession } from "@/lib/auth";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <div className="min-h-screen bg-[#f5f6f2] lg:grid lg:grid-cols-[260px_1fr]"><AdminSidebar/><main className="min-w-0 p-5 sm:p-8 lg:p-10">{children}</main></div>;
}
