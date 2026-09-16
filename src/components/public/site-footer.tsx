import Link from "next/link";

const footerNavigation = [
  { label: "Modeller", href: "/modeller" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Süreç", href: "/#surec" },
  { label: "Teklif Al", href: "/teklif-al" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#191a18] text-soft-white">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-end lg:px-12 lg:py-16">
        <div>
          <Link
            href="/"
            className="text-xl tracking-[0.2em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone"
          >
            NESTRA
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-soft-white/65">
            Modern yaşam için tasarlanan modüler yaşam alanları.
          </p>
        </div>

        <nav aria-label="Alt bilgi navigasyonu">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-soft-white/75">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
