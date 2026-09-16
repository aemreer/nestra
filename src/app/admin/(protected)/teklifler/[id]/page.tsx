import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuote } from "@/lib/admin/quotes";
import { formatAdminDate } from "@/lib/admin/format-date";
import { QuoteStatusBadge } from "@/components/admin/quote-status";
import { QuoteStatusForm } from "@/components/admin/quote-status-form";

export const metadata: Metadata = { title: "Teklif Detayı" };

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await getQuote(id);
  if (!quote) notFound();
  const fields = [
    ["Ad Soyad", quote.full_name], ["E-posta", quote.email], ["Telefon", quote.phone],
    ["İlgilendiği Model", quote.model], ["Yaşam Planı", quote.living_plan], ["Proje Konumu", quote.project_location],
  ];
  return (
    <>
      <Link href="/admin/teklifler" className="inline-flex min-h-10 items-center text-sm text-warm-gray underline">← Teklifler</Link>
      <div className="mb-7 mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">Teklif Detayı <span className="text-warm-gray">#{quote.id}</span></h1>
        <QuoteStatusBadge status={quote.status} />
      </div>
      <section aria-label="Talep bilgileri" className="border border-charcoal/15 bg-soft-white p-5 sm:p-7">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {[{ title: "İletişim", items: fields.slice(0, 3) }, { title: "Model ve Proje", items: fields.slice(3) }].map((group) => <div key={group.title} className="min-w-0">
            <h2 className="mb-4 border-b border-charcoal/10 pb-3 text-sm font-medium">{group.title}</h2>
            <dl className="space-y-4">{group.items.map(([label, value]) => <div key={label} className="min-w-0">
            <dt className="text-xs text-warm-gray">{label}</dt>
            <dd className="mt-2 whitespace-pre-wrap break-words text-sm leading-6">{value?.trim() || "Belirtilmedi"}</dd>
          </div>)}</dl></div>)}
          <dl>
            <dt className="text-xs text-warm-gray">Oluşturulma Tarihi</dt>
            <dd className="mt-2 text-sm leading-6"><time dateTime={quote.created_at}>{formatAdminDate(quote.created_at)}</time></dd>
          </dl>
          <dl className="border-t border-charcoal/15 pt-6 sm:col-span-2">
            <dt className="text-xs text-warm-gray">Mesaj</dt>
            <dd className="mt-2 whitespace-pre-wrap break-words text-sm leading-7">{quote.message?.trim() || "Belirtilmedi"}</dd>
          </dl>
        </div>
      </section>
      <section aria-label="Durum yönetimi" className="mt-5 border border-charcoal/15 bg-soft-white p-5 sm:p-7">
        <QuoteStatusForm id={quote.id} status={quote.status} />
      </section>
    </>
  );
}
