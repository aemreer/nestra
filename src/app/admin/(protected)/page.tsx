import Link from "next/link";
import { getQuoteDashboard } from "@/lib/admin/quotes";
import { QuoteTable } from "@/components/admin/quote-table";

export default async function AdminPage() {
  const dashboard = await getQuoteDashboard();
  const metrics = [
    ["Toplam Teklif", dashboard.total], ["Yeni Talepler", dashboard.newlyReceived],
    ["İletişime Geçildi", dashboard.contacted], ["Satış", dashboard.sales],
  ] as const;
  return (
    <>
      <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">Dashboard</h1><p className="mt-2 text-sm text-warm-gray">Teklif taleplerinin güncel durumu ve son başvurular.</p>
      <dl className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {metrics.map(([label, value]) => (
          <div key={label} className="border border-charcoal/15 border-t-2 bg-soft-white p-5">
            <dt className="text-xs text-warm-gray sm:text-sm">{label}</dt>
            <dd className="mt-3 text-3xl font-medium tabular-nums sm:text-4xl">{value.toLocaleString("tr-TR")}</dd>
          </div>
        ))}
      </dl>
      <section className="mt-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-medium">Son Teklif Talepleri</h2>
          <Link href="/admin/teklifler" className="text-sm underline underline-offset-4">Tüm teklifleri gör →</Link>
        </div>
        <QuoteTable quotes={dashboard.recent} />
      </section>
    </>
  );
}
