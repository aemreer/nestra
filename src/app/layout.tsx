import type { Metadata } from "next";

import "@fontsource-variable/instrument-sans";
import "@fontsource/instrument-serif/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NESTRA | Modüler Yaşam Alanları",
    template: "%s | NESTRA",
  },
  description:
    "Doğayla uyumlu, modern yaşam için tasarlanan modüler yaşam alanları.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
