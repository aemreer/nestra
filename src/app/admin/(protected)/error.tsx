"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return <section role="alert" className="border border-charcoal/15 bg-soft-white p-6">
    <h1 className="text-xl font-medium">Veriler yüklenemedi.</h1>
    <p className="mt-3 text-sm text-warm-gray">Bir sorun oluştu. Lütfen tekrar deneyin.</p>
    <button onClick={reset} className="mt-5 min-h-11 border border-charcoal px-5 text-sm focus-visible:outline-2 focus-visible:outline-offset-4">Tekrar Dene</button>
  </section>;
}
