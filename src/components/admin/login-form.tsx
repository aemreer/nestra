"use client";

import { useActionState, useRef } from "react";
import { login } from "@/app/admin/actions";

const inputClassName = "min-h-14 w-full border border-charcoal/20 bg-soft-white px-4 text-base outline-none focus:border-charcoal focus-visible:ring-1 focus-visible:ring-charcoal/25";

export function LoginForm() {
  const submitting = useRef(false);
  const [state, action, pending] = useActionState(async (previousState: { error: string | null }, data: FormData) => {
    try {
      return await login(previousState, data);
    } finally {
      submitting.current = false;
    }
  }, { error: null });

  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (submitting.current || pending) event.preventDefault();
        else submitting.current = true;
      }}
      aria-busy={pending}
      className="mt-9 space-y-6"
    >
      <div>
        <label htmlFor="email" className="mb-3 block text-sm font-medium">E-posta</label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClassName} />
      </div>
      <div>
        <label htmlFor="password" className="mb-3 block text-sm font-medium">Şifre</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClassName} />
      </div>
      <p role="alert" aria-atomic="true" className="text-sm leading-6 text-[#8a3f32]">{state.error}</p>
      <button type="submit" disabled={pending} className="min-h-14 w-full border border-charcoal bg-charcoal px-6 text-sm font-medium text-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal disabled:cursor-wait disabled:opacity-60">
        {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}
