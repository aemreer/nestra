import { z } from "zod";
import type { NestraModel } from "@/data/models";
import { isLocalImagePath } from "@/lib/admin/model-content-schema";
import { isStorageImageUrl } from "@/lib/admin/media-upload";

export const publicModelRow = z.object({ id: z.string(), name: z.string(), slug: z.string(), area_sqm: z.number(), rooms: z.string(), keyword: z.string(), level_label: z.string().nullable(), summary: z.string().nullable(), featured: z.boolean(), published: z.boolean(), sort_order: z.number() });
export const publicSectionRow = z.object({ id: z.string(), model_id: z.string(), section_key: z.string(), eyebrow: z.string().nullable(), title: z.string().nullable(), body: z.string().nullable(), layout: z.string().nullable(), metadata: z.unknown(), sort_order: z.number() });
export const publicMediaRow = z.object({ id: z.string(), model_id: z.string(), role: z.string(), src: z.string(), alt_text: z.string().nullable(), aspect_ratio: z.string().nullable(), sort_order: z.number() });
const object = (value: unknown): Record<string, unknown> => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
const text = (value: unknown, fallback = "") => typeof value === "string" ? value : fallback;
const list = (value: unknown): unknown[] => Array.isArray(value) ? value : [];
const ordered = <T extends { sort_order: number; id: string }>(rows: T[]) => [...rows].sort((a,b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id));

export type PublicSection = {
  key: string; eyebrow: string; title: string; body: string; layout: string;
  mediaRole?: string; mediaRoles: string[];
  features: { title: string; description: string }[];
  items: { label: string; value: string }[];
  href: string; label: string;
};
export type PublicImage = { role: string; src: string; alt: string; displayAspect?: "4/3"; label?: string };
export type PublicModel = Omit<NestraModel, "detail"> & { detail: {
  storeys: string; heroLayout: string; storyLayout: string; shortDescription: string;
  seoTitle: string; seoDescription: string; gallery: PublicImage[]; sections: PublicSection[];
} };

// No static content fallback: only database values and structural defaults are used.
export function mapPublicModel(row: z.infer<typeof publicModelRow>, sectionRows: z.infer<typeof publicSectionRow>[], mediaRows: z.infer<typeof publicMediaRow>[]): PublicModel {
  const sections = ordered(sectionRows.filter((s) => s.model_id === row.id));
  const hero = sections.find((s) => s.section_key === "hero");
  const heroMeta = object(hero?.metadata);
  const galleryMetadata = list(heroMeta.galleryMetadata).map(object);
  const gallery: PublicImage[] = [];
  for (const media of ordered(mediaRows.filter((m) => m.model_id === row.id))) {
    if (gallery.some((m) => m.role === media.role)) continue;
    if (!isLocalImagePath(media.src) && !isStorageImageUrl(media.src)) continue;
    const info = galleryMetadata.find((m) => m.role === media.role) ?? {};
    gallery.push({ role: media.role, src: media.src, alt: media.alt_text ?? "", displayAspect: media.aspect_ratio === "4/3" || info.displayAspect === "4/3" ? "4/3" : undefined, label: text(info.label) });
  }
  const primary = gallery.find((m) => m.role === "hero");
  const area = `${row.area_sqm} m²`;
  const facts: Record<string,string> = { Alan: area, Plan: row.rooms, Yapı: row.level_label ?? "", Karakter: row.keyword };
  const mapped = sections.map((s): PublicSection => {
    const meta = object(s.metadata);
    const href = text(meta.href, "/teklif-al");
    const items = list(meta.items).map(object).filter((v) => typeof v.label === "string" && typeof v.value === "string").map((v) => ({ label: text(v.label), value: facts[text(v.label)] ?? text(v.value) }));
    return { key: s.section_key, eyebrow: s.eyebrow ?? "", title: s.title ?? "", body: s.body ?? "", layout: s.layout ?? "",
      mediaRole: typeof meta.mediaRole === "string" ? meta.mediaRole : undefined,
      mediaRoles: list(meta.mediaRoles).filter((v): v is string => typeof v === "string"),
      features: list(meta.features).map(object).filter((v) => typeof v.title === "string" && typeof v.description === "string").map((v) => ({ title: text(v.title), description: text(v.description) })),
      items: items.length ? items : Object.entries(facts).map(([label,value]) => ({label,value})),
      href: /^\/(?!\/)[^\\\s]*$/.test(href) ? href : "/teklif-al", label: text(meta.label, "Teklif Al"),
    };
  });
  return { order: row.sort_order, name: row.name, slug: row.slug, area, rooms: row.rooms, keyword: row.keyword, heroImage: primary?.src ?? "", imageAlt: primary?.alt ?? "", featured: row.featured,
    detail: { storeys: row.level_label ?? "", heroLayout: hero?.layout ?? "standard", storyLayout: sections.find((s) => s.section_key === "story")?.layout ?? "standard", shortDescription: row.summary ?? "", seoTitle: text(heroMeta.seoTitle, `${row.name} | ${area} Modüler Yaşam Alanı`), seoDescription: text(heroMeta.seoDescription, row.summary ?? ""), gallery, sections: mapped },
  };
}
