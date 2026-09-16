import { z } from "zod";

export const templateSchema = z.enum(["single", "loft", "wide", "upper", "empty"]);
export const modelTemplates = [
  { value: "single", label: "Tek Kat", description: "Tek seviyeli standart yaşam kurgusu" },
  { value: "loft", label: "Loft", description: "Çift yükseklik ve loft seviyesi" },
  { value: "wide", label: "Geniş Tek Kat", description: "Daha geniş ortak yaşam ve dış mekan ilişkisi" },
  { value: "upper", label: "Kısmi Üst Kat", description: "Ana kat + kapalı kısmi üst seviye" },
  { value: "empty", label: "Boş Şablon", description: "Minimum başlangıç yapısı" },
] as const;

// Read structural references only; metadata is never exposed as an editable JSON field.
export function expectedMediaRoles(sections: { metadata: unknown }[]) {
  const roles = new Set<string>();
  for (const { metadata } of sections) {
    if (!metadata || typeof metadata !== "object") continue;
    const data = metadata as Record<string, unknown>;
    for (const role of [data.mediaRole, ...(Array.isArray(data.mediaRoles) ? data.mediaRoles : [])]) {
      if (typeof role === "string" && /^[a-zA-Z0-9_-]+$/.test(role)) roles.add(role);
    }
  }
  return [...roles];
}
