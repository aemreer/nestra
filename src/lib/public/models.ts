import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { mapPublicModel, publicModelRow, publicSectionRow, publicMediaRow } from "./model-mapper";

const readCatalog = unstable_cache(async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Public model configuration is unavailable.");
  // This client never receives admin cookies, even when an admin visits the site.
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  async function read(table: "models" | "model_sections" | "model_media", columns: string) {
    const rows: unknown[] = [];
    for (let offset = 0; ; offset += 100) {
      let query = supabase.from(table).select(columns).order("sort_order").order("id").range(offset, offset + 99);
      if (table === "models") query = query.eq("published", true);
      const { data, error } = await query;
      if (error || !data) throw new Error("Public model data could not be loaded.");
      rows.push(...data);
      if (data.length < 100) return rows;
    }
  }
  const [models, sections, media] = await Promise.all([
    read("models", "id,name,slug,area_sqm,rooms,keyword,level_label,summary,featured,published,sort_order"),
    read("model_sections", "id,model_id,section_key,eyebrow,title,body,layout,metadata,sort_order"),
    read("model_media", "id,model_id,role,src,alt_text,aspect_ratio,sort_order"),
  ]);
  const parsedSections = publicSectionRow.array().parse(sections);
  const parsedMedia = publicMediaRow.array().parse(media);
  return publicModelRow.array().parse(models).filter((model) => model.published).map((model) => mapPublicModel(model, parsedSections, parsedMedia));
}, ["public-model-catalog-v1"], { revalidate: 60, tags: ["public-models"] });

export const getPublicModels = cache(readCatalog);
export const getPublicModel = cache(async (slug: string) => (await getPublicModels()).find((model) => model.slug === slug) ?? null);
