"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

const navigation = [
  { label: "Modeller", href: "/modeller" },
  { label: "Neden NESTRA?", href: "/#neden-nestra" },
  { label: "Süreç", href: "/#surec" },
  { label: "Hakkımızda", href: "/hakkimizda" },
];

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

const navigationVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.04, staggerChildren: 0.055 } },
};

const navigationItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

function subscribeHeader(callback: () => void) {
  let previous = window.scrollY > 48;
  const listener = () => { const next = window.scrollY > 48; if (next !== previous) { previous = next; callback(); } };
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeHeader, () => window.scrollY > 48, () => false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const panel = menuPanelRef.current;
    const panelFocusables = Array.from(
      panel?.querySelectorAll<HTMLElement>("a[href]") ?? [],
    );
    const focusables = [menuButtonRef.current, ...panelFocusables].filter(
      (element): element is HTMLElement => element !== null,
    );

    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => panelFocusables[0]?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    const closeDesktopMenu = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopMedia.addEventListener("change", closeDesktopMenu);

    return () => desktopMedia.removeEventListener("change", closeDesktopMenu);
  }, []);

  const lightHeader = pathname !== "/" || scrolled || menuOpen;
  const closeMenu = () => setMenuOpen(false);
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    window.history.replaceState(window.history.state, "", "/");
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b transition-[background-color,border-color,color,backdrop-filter] duration-300 motion-reduce:transition-none ${
        menuOpen
          ? "border-charcoal/10 bg-warm-ivory text-charcoal"
          : lightHeader
            ? "border-charcoal/10 bg-warm-ivory/92 text-charcoal backdrop-blur-md"
            : "border-soft-white/20 bg-transparent text-soft-white"
      }`}
    >
      <div className="mx-auto flex min-h-20 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="font-medium text-xl tracking-[0.2em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          aria-label="NESTRA ana sayfa"
        >
          NESTRA
        </Link>

        <nav aria-label="Ana navigasyon" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nestra-nav-link opacity-85 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:transition-none"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/teklif-al"
          className={`hidden border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:transition-none md:inline-flex ${
            lightHeader
              ? "border-charcoal bg-charcoal text-soft-white hover:bg-transparent hover:text-charcoal"
              : "border-soft-white bg-soft-white text-charcoal hover:bg-transparent hover:text-soft-white"
          }`}
        >
          Teklif Al
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex min-h-11 items-center gap-3 text-[0.6875rem] font-medium tracking-[0.16em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:hidden"
        >
          <span>{menuOpen ? "KAPAT" : "MENÜ"}</span>
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-1 block h-px w-5 bg-current transition-transform duration-300 motion-reduce:transition-none ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-1 left-0 block h-px w-5 bg-current transition-transform duration-300 motion-reduce:transition-none ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            ref={menuPanelRef}
            id="mobile-navigation"
            className="fixed inset-x-0 bottom-0 top-20 z-20 overflow-y-auto border-t border-charcoal/10 bg-warm-ivory text-charcoal md:hidden"
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            exit={shouldReduceMotion ? undefined : "hidden"}
            variants={menuVariants}
          >
            <div className="mx-auto flex min-h-full w-full max-w-[1440px] flex-col px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12">
              <nav aria-label="Mobil navigasyon">
                <motion.ul variants={navigationVariants}>
                  {navigation.map((item) => (
                    <motion.li
                      key={item.href}
                      className="border-b border-charcoal/15"
                      variants={navigationItemVariants}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="flex min-h-16 items-center py-3 font-serif text-[clamp(2rem,10vw,3rem)] leading-none tracking-[-0.025em] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-charcoal"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <motion.div
                className="mt-auto border-t border-charcoal/20 pt-7"
                variants={navigationItemVariants}
              >
                <Link
                  href="/teklif-al"
                  onClick={closeMenu}
                  className="inline-flex min-h-12 items-center border-b border-charcoal/60 text-sm font-medium tracking-[0.03em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
                >
                  Teklif Al <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
