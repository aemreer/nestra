"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { modelInputSchema, type AdminModel, type ModelInput } from "@/lib/admin/model-schema";
import { saveModel } from "@/app/admin/(protected)/modeller/actions";
import { modelTemplates } from "@/lib/admin/model-templates";

const inputClass = "min-h-11 w-full border border-charcoal/25 bg-soft-white px-3 text-sm outline-none focus:border-charcoal focus-visible:ring-1 focus-visible:ring-charcoal/25 disabled:opacity-60";
const fields = [
  { name: "name", label: "Model Adı", required: true },
  { name: "slug", label: "Slug", required: true },
  { name: "area_sqm", label: "Alan (m²)", required: true, numeric: true },
  { name: "rooms", label: "Plan", required: true, placeholder: "2+1" },
  { name: "keyword", label: "Karakter", required: true },
  { name: "level_label", label: "Yapı", placeholder: "Tek kat" },
] as const;

export function ModelForm({ model, created = false }: { model?: AdminModel; created?: boolean }) {
  const router = useRouter();
  const submitting = useRef(false);
  const [template, setTemplate] = useState("single");
  const [navigating, setNavigating] = useState(false);
  const [notice, setNotice] = useState<{ success: boolean; message: string } | null>(created ? { success: true, message: "Model oluşturuldu." } : null);
  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<ModelInput>({
    resolver: zodResolver(modelInputSchema),
    defaultValues: model ? { ...model, level_label: model.level_label ?? "", summary: model.summary ?? "" } : {
      name: "", slug: "", rooms: "", keyword: "", level_label: "", summary: "", sort_order: 5, featured: false, published: false,
    },
  });
  const busy = isSubmitting || navigating;

  async function onValid(values: ModelInput) {
    try {
      const result = await saveModel(model?.id ?? null, values, template);
      if (!result.success) {
        for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
          setError(field as keyof ModelInput, { type: "server", message: messages?.[0] });
        }
        setNotice({ success: false, message: result.message });
        return;
      }
      if (!model) {
        setNavigating(true);
        router.replace(`/admin/modeller/${result.id}?created=1`);
      } else {
        reset(values);
        setNotice({ success: true, message: "Değişiklikler kaydedildi." });
        router.refresh();
      }
    } catch {
      setNotice({ success: false, message: model ? "Model güncellenirken bir sorun oluştu." : "Model oluşturulurken bir sorun oluştu." });
    }
  }

  return (
    <form noValidate aria-busy={busy} onChange={() => setNotice(null)} onSubmit={async (event) => {
      event.preventDefault();
      if (submitting.current || busy) return;
      submitting.current = true;
      setNotice(null);
      try { await handleSubmit(onValid)(event); }
      finally { submitting.current = false; }
    }}>
      <fieldset disabled={busy} className="grid min-w-0 gap-7 xl:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
        <legend className="sr-only">Model ana bilgileri</legend>
        <div className="min-w-0 border-t border-charcoal/20 pt-6">
          <h2 className="mb-5 text-base font-medium">Ana Bilgiler</h2>
          {!model && <div className="mb-6 border border-charcoal/15 bg-soft-white p-4">
            <label htmlFor="template" className="mb-2 block text-sm">Başlangıç Şablonu</label>
            <select id="template" value={template} onChange={(event) => setTemplate(event.target.value)} aria-describedby="template-description" className={inputClass}>
              {modelTemplates.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
            <p id="template-description" className="mt-2 text-xs text-warm-gray">{modelTemplates.find((item) => item.value === template)?.description}</p>
          </div>}
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => <div key={field.name} className="min-w-0">
              <label htmlFor={field.name} className="mb-2 block text-sm">{field.label}{"required" in field && field.required ? " *" : ""}</label>
              <input id={field.name} type={"numeric" in field ? "number" : "text"} step={"numeric" in field ? 1 : undefined}
                placeholder={"placeholder" in field ? field.placeholder : undefined}
                aria-required={"required" in field && field.required} aria-invalid={!!errors[field.name]}
                aria-describedby={errors[field.name] ? `${field.name}-error` : field.name === "slug" ? "slug-hint" : undefined}
                className={inputClass} {...register(field.name, "numeric" in field ? { valueAsNumber: true } : {})} />
              {field.name === "slug" && <p id="slug-hint" className="mt-2 text-xs text-warm-gray">Küçük harf, rakam ve tire kullanın. Örnek: studio-plus</p>}
              {errors[field.name] && <p id={`${field.name}-error`} role="alert" className="mt-2 text-xs text-[#8a3f32]">{errors[field.name]?.message}</p>}
            </div>)}
            <div className="sm:col-span-2">
              <label htmlFor="summary" className="mb-2 block text-sm">Kısa Açıklama</label>
              <textarea id="summary" rows={5} aria-invalid={!!errors.summary} aria-describedby={errors.summary ? "summary-error" : undefined} className={`${inputClass} resize-y py-3 leading-6`} {...register("summary")} />
              {errors.summary && <p id="summary-error" role="alert" className="mt-2 text-xs text-[#8a3f32]">{errors.summary.message}</p>}
            </div>
          </div>
        </div>
        <div className="border-t border-charcoal/20 pt-6">
          <h2 className="mb-5 text-base font-medium">Yayın ve Sıralama</h2>
          <label htmlFor="sort_order" className="mb-2 block text-sm">Sıralama *</label>
          <input id="sort_order" type="number" step={1} aria-required="true" aria-invalid={!!errors.sort_order} aria-describedby={errors.sort_order ? "sort-order-error" : undefined} className={inputClass} {...register("sort_order", { valueAsNumber: true })} />
          {errors.sort_order && <p id="sort-order-error" role="alert" className="mt-2 text-xs text-[#8a3f32]">{errors.sort_order.message}</p>}
          <label className="mt-6 flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" className="size-4 accent-charcoal" {...register("featured")} />Öne Çıkan Model</label>
          <p className="mt-1 text-xs leading-5 text-warm-gray">Seçildiğinde diğer modellerin öne çıkan işareti kaldırılır.</p>
          <label className="mt-4 flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" className="size-4 accent-charcoal" {...register("published")} />Yayında</label>
          <p className="mt-1 text-xs leading-5 text-warm-gray">İşaretli değilse model taslak olarak saklanır.</p>
        </div>
      </fieldset>
      <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-charcoal/15 bg-warm-ivory py-4">
        <button type="submit" disabled={busy} className="min-h-11 bg-charcoal px-5 text-sm text-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal disabled:cursor-wait disabled:opacity-60">
          {busy ? "Kaydediliyor..." : model ? "Değişiklikleri Kaydet" : "Modeli Oluştur"}
        </button>
        <Link href="/admin/modeller" className="inline-flex min-h-11 items-center text-sm underline">Listeye Dön</Link>
      </div>
      <p role="status" aria-atomic="true" className={`mt-4 text-sm ${notice?.success ? "text-olive" : "text-[#8a3f32]"}`}>{notice?.message}</p>
    </form>
  );
}
