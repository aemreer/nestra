import type { QuoteStatus } from "@/lib/admin/quote-schema";

const styles: Record<QuoteStatus, string> = {
  "Yeni": "border-olive/30 bg-olive/10 text-charcoal",
  "İletişime Geçildi": "border-charcoal/20 bg-stone/30 text-charcoal",
  "Teklif Gönderildi": "border-olive/40 bg-stone/15 text-charcoal",
  "Satış": "border-charcoal bg-charcoal text-soft-white",
};

export function QuoteStatusBadge({ status }: { status: QuoteStatus }) {
  return <span className={`inline-flex max-w-full items-center gap-1.5 whitespace-nowrap border px-2.5 py-1 text-xs ${styles[status]}`}><span aria-hidden="true" className="size-1 shrink-0 bg-current" />{status}</span>;
}
