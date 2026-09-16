import "server-only";
import { z } from "zod";
import { requireAdmin } from "./session";
import { createClient } from "@/lib/supabase/server";
import { contentIdSchema, sectionRowSchema, mediaRowSchema } from "./model-content-schema";
import { expectedMediaRoles } from "./model-templates";

export async function getModelContent(modelId: string) {
  await requireAdmin();
  contentIdSchema.parse(modelId);
  const supabase = await createClient({ readOnly: true });
  async function readRows<T>(table: "model_sections" | "model_media", columns: string, schema: z.ZodType<T>): Promise<T[] | null> {
    try {
      const rows: T[] = [];
      for (let offset = 0; ; offset += 100) {
        const { data, error } = await supabase.from(table).select(columns).eq("model_id", modelId)
          .order("sort_order", { ascending: true }).order("id", { ascending: true }).range(offset, offset + 99);
        if (error || !data) return null;
        rows.push(...schema.array().parse(data));
        if (data.length < 100) return rows;
      }
    } catch { return null; }
  }
  // Read metadata on the server, then remove it before returning editor props.
  const [sections, media] = await Promise.all([
    readRows("model_sections", "id,section_key,eyebrow,title,body,layout,sort_order,metadata", sectionRowSchema.extend({ metadata: z.unknown() })),
    readRows("model_media", "id,role,src,alt_text,aspect_ratio,sort_order", mediaRowSchema),
  ]);
  const roles = sections ? expectedMediaRoles(sections) : [];
  const missingRoles = media ? roles.filter((role) => !media.some((row) => row.role === role)) : [];
  return { sections: sections?.map((row) => sectionRowSchema.parse(row)) ?? null, media, missingRoles, expectedRoles: roles };
}
