import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-warm-ivory text-charcoal">{children}</div>;
}
