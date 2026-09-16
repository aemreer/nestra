import { requireAdmin } from "@/lib/admin/session";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <AdminShell>{children}</AdminShell>;
}
