"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadModelMediaSlot } from "@/app/admin/(protected)/modeller/upload-action";
import { validateImageFile } from "@/lib/admin/media-upload";

export function ModelMediaSlot({ modelId, role }: { modelId: string; role: string }) {
  const router = useRouter();
  const lock = useRef(false);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<{ success: boolean; message: string } | null>(null);
  const inputId = `${modelId}-${role}-file`;
  return <div className="border-b border-charcoal/15 bg-soft-white p-4 sm:p-5">
    <h3 className="break-all text-sm font-medium">{role}</h3>
    <p className="mt-3 border border-dashed border-charcoal/20 bg-stone/10 px-4 py-5 text-sm text-warm-gray">Henüz görsel yüklenmedi. Bu rol için bir dosya seçin.</p>
    <form className="mt-4" aria-busy={pending} onSubmit={async (event) => {
      event.preventDefault();
      if (lock.current) return;
      const form = event.currentTarget;
      const data = new FormData(form);
      const file = data.get("file");
      const error = validateImageFile(file instanceof File ? file : null);
      if (error) { setNotice({ success: false, message: error }); return; }
      lock.current = true;
      setPending(true);
      setNotice(null);
      try {
        const result = await uploadModelMediaSlot(modelId, role, data);
        setNotice(result);
        if (result.success) { form.reset(); router.refresh(); }
      } catch { setNotice({ success: false, message: "Görsel yüklenirken bir sorun oluştu." }); }
      finally { lock.current = false; setPending(false); }
    }}>
      <label htmlFor={inputId} className="mb-2 block text-sm">Yeni Görsel Yükle</label>
      <input id={inputId} name="file" type="file" accept="image/webp,image/png,image/jpeg" disabled={pending} className="block w-full min-w-0 text-sm file:mr-3 file:border file:border-charcoal/25 file:bg-soft-white file:px-3 file:py-2" aria-describedby={`${inputId}-help`} />
      <p id={`${inputId}-help`} className="mt-2 text-xs text-warm-gray">WebP, PNG veya JPEG · En fazla 10 MB</p>
      <button disabled={pending} className="mt-3 min-h-11 border border-charcoal px-5 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-60">{pending ? "Yükleniyor..." : "Görsel Yükle"}</button>
      <p role="status" aria-atomic="true" className={`mt-3 text-sm ${notice?.success ? "text-olive" : "text-[#8a3f32]"}`}>{notice?.message}</p>
    </form>
  </div>;
}
