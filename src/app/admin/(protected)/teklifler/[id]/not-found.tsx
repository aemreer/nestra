import Link from "next/link";

export default function QuoteNotFound() {
  return <section><h1 className="text-2xl font-medium">Teklif talebi bulunamadı.</h1><Link href="/admin/teklifler" className="mt-5 inline-block text-sm underline">Tekliflere dön</Link></section>;
}
