import "server-only";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "./session";
import { adminModelSchema, modelIdSchema, type AdminModel } from "./model-schema";

const columns = "id,name,slug,area_sqm,rooms,keyword,level_label,summary,featured,published,sort_order";

export async function getAdminModels() {
  await requireAdmin();
  const supabase = await createClient({ readOnly: true });
  const models: AdminModel[] = [];
  // Do not silently truncate the list at the Data API's row limit.
  const batchSize = 100;
  for (let offset = 0; ; offset += batchSize) {
    const { data, error } = await supabase.from("models").select(columns)
      .order("sort_order", { ascending: true }).order("id", { ascending: true })
      .range(offset, offset + batchSize - 1);
    if (error || !data) throw new Error("Models could not be loaded.");
    models.push(...adminModelSchema.array().parse(data));
    if (data.length < batchSize) return models;
  }
}

export async function getAdminModel(id: string) {
  await requireAdmin();
  if (!modelIdSchema.safeParse(id).success) return null;
  const supabase = await createClient({ readOnly: true });
  const { data, error } = await supabase.from("models").select(columns).eq("id", id).maybeSingle();
  if (error) throw new Error("Model could not be loaded.");
  return data ? adminModelSchema.parse(data) : null;
}
