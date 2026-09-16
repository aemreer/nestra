"use client";

import "./admin.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { LogoutForm } from "./logout-form";

const navigation = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/teklifler", label: "Teklifler" },
  { href: "/admin/modeller", label: "Modeller" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const links = navigation.map(({ href, label }) => {
    const active = pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));
    return (
      <Link key={href} href={href} aria-current={active ? "page" : undefined}
        onClick={() => { if (mobileMenu.current) mobileMenu.current.open = false; }}
        className={`block border-l-2 px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal ${active ? "border-charcoal bg-stone/50 font-semibold text-charcoal" : "border-transparent text-warm-gray hover:bg-stone/20 hover:text-charcoal"}`}>
        {label}
      </Link>
    );
  });

  const footer = (
    <div className="space-y-4 border-t border-charcoal/15 pt-5">
      <Link href="/" className="inline-flex min-h-10 items-center text-sm underline underline-offset-4">Siteyi Gör <span aria-hidden="true" className="ml-2">↗</span></Link>
      <LogoutForm />
    </div>
  );

  return (
    <div className="nestra-admin min-h-dvh lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <a href="#admin-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-soft-white focus:p-3">İçeriğe geç</a>
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-charcoal/15 bg-soft-white px-6 py-8 lg:flex">
        <p className="text-2xl tracking-[0.2em]">NESTRA</p>
        <p className="mt-2 text-[0.65rem] tracking-[0.23em] text-warm-gray">YÖNETİM</p>
        <nav aria-label="Yönetim menüsü" className="mt-10 space-y-1">{links}</nav>
        <div className="mt-auto pt-8">{footer}</div>
      </aside>
      <header className="border-b border-charcoal/15 bg-soft-white px-5 py-5 lg:hidden">
        <details ref={mobileMenu} onKeyDown={(event) => { if (event.key === "Escape" && mobileMenu.current?.open) { mobileMenu.current.open = false; mobileMenu.current.querySelector("summary")?.focus(); } }}>
          <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-4 focus-visible:outline-2">
            <span><span className="text-xl tracking-[0.18em]">NESTRA</span><span className="ml-3 text-[0.6rem] tracking-[0.15em] text-warm-gray">YÖNETİM</span></span>
            <span className="text-sm">Menü <span aria-hidden="true">☰</span></span>
          </summary>
          <nav aria-label="Mobil yönetim menüsü" className="mt-5 space-y-1">{links}</nav>
          <div className="mt-5">{footer}</div>
        </details>
      </header>
      <main id="admin-content" tabIndex={-1} className="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
