import Link from "next/link";
import type { QuoteSummary } from "@/lib/admin/quote-schema";
import { formatAdminDate } from "@/lib/admin/format-date";
import { QuoteStatusBadge } from "./quote-status";

export function QuoteTable({ quotes, showPhone = false }: { quotes: QuoteSummary[]; showPhone?: boolean }) {
  if (!quotes.length) return <p className="border border-charcoal/15 bg-soft-white p-6 text-sm text-warm-gray">Henüz teklif talebi bulunmuyor.</p>;

  return (
    <div className="overflow-x-auto border border-charcoal/15 bg-soft-white">
      <table className="admin-table w-full text-left text-sm">
        <caption className="sr-only">Teklif talepleri, en yeni kayıt önce. Detay için ad soyad bağlantısını kullanın.</caption>
        <thead className="border-b border-charcoal/15 bg-stone/15 text-xs text-warm-gray">
          <tr>{["Ad Soyad", "Model", ...(showPhone ? ["Telefon"] : []), "Durum", "Tarih"].map((label) => <th key={label} scope="col" className="whitespace-nowrap px-5 py-4 font-medium">{label}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-charcoal/10">
          {quotes.map((quote) => (
            <tr key={quote.id} className="group relative hover:bg-stone/15 focus-within:bg-stone/15">
              <th scope="row" className="px-5 py-4 font-medium">
                <Link href={`/admin/teklifler/${quote.id}`} className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal">
                  {quote.full_name}<span aria-hidden="true" className="ml-2 text-warm-gray">↗</span><span className="sr-only"> — teklif detayını gör</span>
                </Link>
              </th>
              <td data-label="Model" className="px-5 py-4">{quote.model}</td>
              {showPhone && <td data-label="Telefon" className="whitespace-nowrap px-5 py-4">{quote.phone}</td>}
              <td data-label="Durum" className="px-5 py-4"><QuoteStatusBadge status={quote.status} /></td>
              <td data-label="Tarih" className="whitespace-nowrap px-5 py-4 text-xs text-warm-gray"><time dateTime={quote.created_at}>{formatAdminDate(quote.created_at)}</time></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
