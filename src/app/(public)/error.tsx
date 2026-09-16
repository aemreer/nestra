"use client";

export default function PublicError({ reset }: { reset: () => void }) {
  return <section className="mx-auto min-h-[60vh] max-w-[1440px] px-5 pb-24 pt-40 sm:px-8 lg:px-12">
    <h1 className="font-serif text-4xl text-charcoal">Sayfa şu anda yüklenemiyor.</h1>
    <p role="alert" className="mt-5 text-warm-gray">Lütfen kısa bir süre sonra tekrar deneyin.</p>
    <button onClick={reset} className="mt-8 min-h-11 border-b border-charcoal text-sm focus-visible:outline-2 focus-visible:outline-offset-4">Tekrar Dene</button>
  </section>;
}
