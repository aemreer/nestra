"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { contentFormValues, isLocalImagePath, sectionInputSchema, mediaInputSchema, type SectionRow, type MediaRow } from "@/lib/admin/model-content-schema";
import { updateModelSection, updateModelMedia, type ContentSaveResult } from "@/app/admin/(protected)/modeller/content-actions";

import { uploadModelMedia } from "@/app/admin/(protected)/modeller/upload-action";
import { isStorageImageUrl, validateImageFile } from "@/lib/admin/media-upload";

function ImagePreview({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return <div className="relative h-16 w-20 sm:h-24 sm:w-32 shrink-0 overflow-hidden border border-charcoal/15 bg-stone/20">
    {(isLocalImagePath(src) || isStorageImageUrl(src)) && !failed ? <Image src={src} alt={alt} fill sizes="128px" className="object-contain" onError={() => setFailed(true)} /> : <p className="flex h-full items-center p-2 text-xs text-warm-gray">Önizleme kullanılamıyor.</p>}
  </div>;
}

type EditorProps = { modelId: string } & ({ kind: "section"; row: SectionRow } | { kind: "media"; row: MediaRow });
const inputClass = "min-h-11 w-full border border-charcoal/25 bg-soft-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal";

export function ModelContentEditor(props: EditorProps) {
  const { row, kind, modelId } = props;
  const router = useRouter();
  const locked = useRef(false);
  const editForm = useRef<HTMLFormElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedSrc, setUploadedSrc] = useState<string | null>(null);
  const currentSrc = uploadedSrc ?? (props.kind === "media" ? props.row.src : "");
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<ContentSaveResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fields = props.kind === "section" ? [
    { key: "eyebrow", label: "Üst Başlık", value: props.row.eyebrow },
    { key: "title", label: "Başlık", value: props.row.title },
    { key: "body", label: "Açıklama", value: props.row.body, multiline: true },
    { key: "layout", label: "Yerleşim (layout)", value: props.row.layout },
  ] : [
    { key: "src", label: "Görsel Yolu (src)", value: props.row.src },
    { key: "alt_text", label: "Alternatif Metin", value: props.row.alt_text },
    { key: "aspect_ratio", label: "En/Boy Oranı", value: props.row.aspect_ratio },
  ];

  return <details className="border-b border-charcoal/15 bg-soft-white open:pb-5">
    <summary className="flex min-h-16 cursor-pointer items-center gap-4 px-4 py-4 focus-visible:outline-2 focus-visible:outline-charcoal sm:px-5">
      {props.kind === "media" && <ImagePreview key={currentSrc} src={currentSrc} alt={props.row.alt_text ?? ""} />}
      <span className="min-w-0 flex-1">
        {props.kind === "section" ? <>
          {props.row.eyebrow && <span className="block text-xs text-warm-gray">{props.row.eyebrow}</span>}
          <span className="mt-1 block break-words text-sm font-medium">{props.row.title || "Başlık belirtilmedi"}</span>
          <span className="mt-1 block text-xs text-warm-gray">{props.row.section_key} · {props.row.layout || "Varsayılan düzen"} · Sıra {props.row.sort_order}</span>
        </> : <>
          <span className="block text-sm font-medium">{props.row.role}</span><span className="mt-1 block text-xs text-warm-gray">{props.row.aspect_ratio || "Oran belirtilmedi"} · Sıra {props.row.sort_order}</span>
          <span className="mt-1 block break-all text-xs text-warm-gray">{currentSrc}</span>
        </>}
      </span>
      <span aria-hidden="true" className="admin-chevron text-warm-gray">⌄</span>
    </summary>
    <form ref={editForm} noValidate aria-busy={pending} className="mt-5 px-4 sm:px-5" onChange={() => setNotice(null)} onSubmit={async (event) => {
      event.preventDefault();
      if (locked.current) return;
      locked.current = true;
      setNotice(null);
      const values = contentFormValues(kind, new FormData(event.currentTarget));
      const parsed = (kind === "section" ? sectionInputSchema : mediaInputSchema).safeParse(values);
      if (!parsed.success) {
        const nextErrors: Record<string, string> = {};
        parsed.error.issues.forEach((issue) => { nextErrors[String(issue.path[0])] ??= issue.message; });
        setErrors(nextErrors);
        const firstInvalid = event.currentTarget.elements.namedItem(Object.keys(nextErrors)[0]);
        if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
        locked.current = false;
        return;
      }
      setErrors({});
      setPending(true);
      try {
        const result = await (kind === "section" ? updateModelSection : updateModelMedia)(modelId, row.id, parsed.data);
        setNotice(result);
        if (result.success) { if (kind === "media" && "src" in parsed.data) setUploadedSrc(parsed.data.src); router.refresh(); }
      } catch {
        setNotice({ success: false, message: kind === "section" ? "İçerik bölümü güncellenirken bir sorun oluştu." : "Görsel güncellenirken bir sorun oluştu." });
      } finally { locked.current = false; setPending(false); }
    }}>
      <p className="mb-4 text-xs text-warm-gray">{props.kind === "section" ? `Bölüm Anahtarı: ${props.row.section_key}` : `Görsel Rolü: ${props.row.role}`}</p>
      <fieldset disabled={pending} className="grid min-w-0 gap-4 sm:grid-cols-2">
        <legend className="sr-only">{kind === "section" ? "İçerik bölümü bilgileri" : "Görsel bilgileri"}</legend>
        {[...fields, { key: "sort_order", label: "Sıralama", value: row.sort_order }].map((field) => {
          const id = `${row.id}-${field.key}`;
          const multiline = "multiline" in field && field.multiline;
          return <div key={field.key} className={multiline ? "sm:col-span-2" : "min-w-0"}>
            <label htmlFor={id} className="mb-2 block text-sm">{field.label}</label>
            {multiline ? <textarea id={id} name={field.key} defaultValue={field.value ?? ""} rows={5} aria-invalid={!!errors[field.key]} aria-describedby={errors[field.key] ? `${id}-error` : undefined} className={`${inputClass} resize-y py-3 leading-6`} /> :
              <input id={id} name={field.key} defaultValue={field.value ?? ""} type={field.key === "sort_order" ? "number" : "text"} step={field.key === "sort_order" ? 1 : undefined} aria-invalid={!!errors[field.key]} aria-describedby={errors[field.key] ? `${id}-error` : undefined} className={inputClass} />}
            {errors[field.key] && <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-[#8a3f32]">{errors[field.key]}</p>}
          </div>;
        })}
      </fieldset>
      <button type="submit" disabled={pending} className="mt-5 min-h-11 bg-charcoal px-5 text-sm text-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal disabled:cursor-wait disabled:opacity-60">{pending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}</button>
      
    </form>
    {kind === "media" && <form className="mx-4 mt-5 border-t border-charcoal/15 pt-4 sm:mx-5" aria-busy={uploading} onSubmit={async (event) => {
      event.preventDefault();
      if (locked.current) return;
      const form = event.currentTarget;
      const data = new FormData(form);
      const file = data.get("file");
      const error = validateImageFile(file instanceof File ? file : null);
      if (error) { setNotice({ success: false, message: error }); return; }
      locked.current = true;
      setPending(true);
      setUploading(true);
      setNotice(null);
      try {
        const result = await uploadModelMedia(modelId, row.id, data);
        setNotice(result);
        if (result.success && result.src) {
          setUploadedSrc(result.src);
          const input = editForm.current?.elements.namedItem("src");
          if (input instanceof HTMLInputElement) input.value = result.src;
          setErrors((previous) => { const next = { ...previous }; delete next.src; return next; });
          form.reset();
          router.refresh();
        }
      } catch { setNotice({ success: false, message: "Görsel yüklenirken bir sorun oluştu." }); }
      finally { locked.current = false; setPending(false); setUploading(false); }
    }}>
      <label htmlFor={row.id + "-file"} className="mb-2 block text-sm">Yeni Görsel Yükle</label>
      <input id={row.id + "-file"} name="file" type="file" accept="image/webp,image/png,image/jpeg" disabled={pending} aria-describedby={row.id + "-upload-help"} className="block w-full min-w-0 text-sm file:mr-3 file:border file:border-charcoal/25 file:bg-soft-white file:px-3 file:py-2" />
      <p id={row.id + "-upload-help"} className="mt-2 text-xs text-warm-gray">WebP, PNG veya JPEG · En fazla 10 MB</p>
      <button type="submit" disabled={pending} className="mt-3 min-h-11 border border-charcoal px-5 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-60">{uploading ? "Yükleniyor..." : "Görseli Yükle"}</button>
    </form>}
    <p role="status" aria-atomic="true" className={`mx-4 mt-3 text-sm sm:mx-5 ${pending ? "text-warm-gray" : notice?.success ? "text-olive" : "text-[#8a3f32]"}`}>{uploading ? "Görsel yükleniyor…" : pending ? "Değişiklikler kaydediliyor…" : notice?.message}</p>
  </details>;
}
