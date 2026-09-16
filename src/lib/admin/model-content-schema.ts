import { z } from "zod";
import { isStorageImageUrl } from "./media-upload";

export const contentIdSchema = z.string().uuid("Geçersiz kayıt kimliği.");
const text = z.string({ error: "Metin girin." });
const order = z.number({ error: "Sıralama değerini girin." }).int("Sıralama tam sayı olmalı.").min(-2147483648, "Sıralama değeri çok küçük.").max(2147483647, "Sıralama değeri çok büyük.");

export function isLocalImagePath(value: string) {
  return /^\/images\/(?:[a-zA-Z0-9_.-]+\/)*[a-zA-Z0-9_.-]+\.(?:png|jpe?g|webp|avif|gif|svg)$/i.test(value)
    && value.split("/").every((part) => part !== "." && part !== "..");
}

export const sectionInputSchema = z.object({ eyebrow: text, title: text, body: text, layout: text, sort_order: order });
export const mediaInputSchema = z.object({
  src: text.refine((value) => isLocalImagePath(value) || isStorageImageUrl(value), "Geçerli bir /images/... yolu veya proje Storage görsel adresi girin."),
  alt_text: text,
  aspect_ratio: text.refine((value) => value === "" || (/^\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)?$/.test(value) && value.split("/").every((part) => Number(part) > 0)), "Geçerli bir en/boy oranı girin. Örnek: 4/3"),
  sort_order: order,
});

export const sectionRowSchema = z.object({
  id: contentIdSchema, section_key: text, eyebrow: text.nullable(), title: text.nullable(), body: text.nullable(), layout: text.nullable(), sort_order: z.number().int(),
});
export const mediaRowSchema = z.object({
  id: contentIdSchema, role: text, src: text, alt_text: text.nullable(), aspect_ratio: text.nullable(), sort_order: z.number().int(),
});
export type SectionRow = z.infer<typeof sectionRowSchema>;
export type MediaRow = z.infer<typeof mediaRowSchema>;

export function contentFormValues(kind: "section" | "media", data: FormData) {
  const fields = kind === "section" ? ["eyebrow", "title", "body", "layout"] : ["src", "alt_text", "aspect_ratio"];
  return { ...Object.fromEntries(fields.map((field) => [field, data.get(field)])), sort_order: data.get("sort_order") === "" || data.get("sort_order") === null ? NaN : Number(data.get("sort_order")) };
}
