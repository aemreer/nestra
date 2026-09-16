import type { NestraModel } from "@/data/models";

const columns = ["Model", "Alan", "Plan", "Karakter"] as const;

export function ModelComparison({
  models,
}: {
  models: readonly Omit<NestraModel, "detail">[];
}) {
  return (
    <section className="border-b border-charcoal/10 bg-warm-ivory px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <p className="text-xs tracking-[0.2em] text-warm-gray lg:col-span-3 lg:pt-3">
            KARŞILAŞTIR
          </p>
          <h2 className="max-w-[11ch] font-serif text-[clamp(3rem,5.3vw,5.75rem)] leading-[0.96] tracking-[-0.035em] text-charcoal lg:col-span-9">
            Hangi NESTRA size uygun?
          </h2>
        </div>

        <div className="mt-14 lg:ml-[25%] lg:mt-20 lg:pl-2">
          <div
            aria-hidden="true"
            className="hidden grid-cols-[1.35fr_0.75fr_1fr_1fr] gap-x-6 border-b border-charcoal/25 pb-4 text-[0.625rem] tracking-[0.18em] text-warm-gray sm:grid"
          >
            {columns.map((column) => (
              <span key={column}>{column.toUpperCase()}</span>
            ))}
          </div>

          <ol aria-label="NESTRA model karşılaştırması">
            {models.map((model) => (
              <li
                key={model.slug}
                className="grid grid-cols-2 gap-x-5 gap-y-5 border-b border-charcoal/15 py-6 sm:grid-cols-[1.35fr_0.75fr_1fr_1fr] sm:items-baseline sm:gap-x-6 sm:gap-y-0 sm:py-7"
              >
                <div className="col-span-2 sm:col-span-1">
                  <span className="mb-1 block text-[0.625rem] tracking-[0.16em] text-warm-gray sm:hidden">
                    MODEL
                  </span>
                  <span className="font-serif text-2xl tracking-[-0.02em] text-charcoal sm:text-[1.75rem]">
                    {model.name.replace("NESTRA ", "")}
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-[0.625rem] tracking-[0.16em] text-warm-gray sm:hidden">
                    ALAN
                  </span>
                  <span className="text-sm text-charcoal/80 sm:text-base">
                    {model.area}
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-[0.625rem] tracking-[0.16em] text-warm-gray sm:hidden">
                    PLAN
                  </span>
                  <span className="text-sm text-charcoal/80 sm:text-base">
                    {model.rooms}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="mb-1 block text-[0.625rem] tracking-[0.16em] text-warm-gray sm:hidden">
                    KARAKTER
                  </span>
                  <span className="text-sm text-charcoal/80 sm:text-base">
                    {model.keyword}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
