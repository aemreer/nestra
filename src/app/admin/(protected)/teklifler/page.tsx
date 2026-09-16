import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getQuotes, quotesPageSize } from "@/lib/admin/quotes";
import { QuoteTable } from "@/components/admin/quote-table";

export const metadata: Metadata = { title: "Teklifler" };

export default async function QuotesPage({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  const query = await searchParams;
  const page = typeof query.page === "string" && /^[1-9]\d{0,5}$/.test(query.page) ? Number(query.page) : 1;
  const { quotes, total } = await getQuotes(page);
  const pages = Math.max(1, Math.ceil(total / quotesPageSize));
  if (page > pages) redirect(`/admin/teklifler?page=${pages}`);
  return (
    <>
      <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">Teklifler</h1>
        <p className="text-sm text-warm-gray">{total.toLocaleString("tr-TR")} teklif talebi</p>
      </div>
      <QuoteTable quotes={quotes} showPhone />
      {pages > 1 && <nav aria-label="Teklif sayfaları" className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm">
        <span className="text-warm-gray">Sayfa {page} / {pages}</span>
        <div className="flex gap-5">
          {page > 1 && <Link href={`/admin/teklifler?page=${page - 1}`} className="inline-flex min-h-11 items-center underline">← Önceki</Link>}
          {page < pages && <Link href={`/admin/teklifler?page=${page + 1}`} className="inline-flex min-h-11 items-center underline">Sonraki →</Link>}
        </div>
      </nav>}
    </>
  );
}
