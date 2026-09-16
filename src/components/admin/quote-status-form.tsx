"use client";

import { useActionState, useRef, useState } from "react";
import { updateQuoteStatus, type StatusUpdateState } from "@/app/admin/(protected)/teklifler/actions";
import { quoteStatuses, type QuoteStatus } from "@/lib/admin/quote-schema";

export function QuoteStatusForm({ id, status }: { id: string; status: QuoteStatus }) {
  const [selected, setSelected] = useState<string>(status);
  const submitting = useRef(false);
  const [state, action, pending] = useActionState(async (previous: StatusUpdateState, data: FormData) => {
    try { return await updateQuoteStatus(previous, data); }
    catch { return { success: false, message: "Durum güncellenirken bir sorun oluştu. Lütfen tekrar deneyin.", submittedStatus: String(data.get("status") ?? "") }; }
    finally { submitting.current = false; }
  }, { success: false, message: null, submittedStatus: null });

  return (
    <form action={action} aria-busy={pending} onReset={(event) => event.preventDefault()} onSubmit={(event) => {
      if (submitting.current || pending) event.preventDefault();
      else submitting.current = true;
    }}>
      <input type="hidden" name="id" value={id} />
      <label htmlFor="quote-status" className="mb-3 block text-sm font-medium">Durum</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <select id="quote-status" name="status" value={selected} onChange={(event) => setSelected(event.target.value)} disabled={pending}
          className="min-h-11 min-w-0 border border-charcoal/25 bg-soft-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal sm:min-w-52">
          {quoteStatuses.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <button type="submit" disabled={pending} className="min-h-11 bg-charcoal px-5 text-sm text-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal disabled:cursor-wait disabled:opacity-60">
          {pending ? "Kaydediliyor..." : "Durumu Kaydet"}
        </button>
      </div>
      <p role="status" aria-atomic="true" className={`mt-3 text-sm ${pending ? "text-warm-gray" : state.success ? "text-olive" : "text-[#8a3f32]"}`}>
        {pending ? "Durum güncelleniyor…" : state.submittedStatus === selected ? state.message : null}
      </p>
    </form>
  );
}
