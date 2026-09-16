import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Yönetici Girişi" };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-12 sm:px-8">
      <section className="w-full max-w-md border border-charcoal/15 bg-soft-white px-6 py-10 sm:px-10 sm:py-12">
        <p className="text-2xl tracking-[0.22em]">NESTRA</p>
        <h1 className="mt-9 border-t border-charcoal/15 pt-7 font-serif text-4xl">Yönetici Girişi</h1>
        <LoginForm />
      </section>
    </main>
  );
}
