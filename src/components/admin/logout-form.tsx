"use client";

import { useActionState } from "react";
import { logout } from "@/app/admin/actions";

export function LogoutForm() {
  const [state, action, pending] = useActionState(logout, { error: null });
  return (
    <form action={action} aria-busy={pending}>
      <button type="submit" disabled={pending} className="min-h-12 border border-charcoal/30 px-5 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal disabled:cursor-wait disabled:opacity-60">
        {pending ? "Çıkış yapılıyor..." : "Çıkış Yap"}
      </button>
      <p role="alert" aria-atomic="true" className="mt-3 text-sm leading-6 text-[#8a3f32]">{state.error}</p>
    </form>
  );
}
