"use server";

import { revalidatePath } from "next/cache";
import { revalidatePublicModels } from "@/lib/public/revalidate-models";
import { requireAdmin } from "@/lib/admin/session";
import { createClient } from "@/lib/supabase/server";
import { contentIdSchema, sectionInputSchema, mediaInputSchema } from "@/lib/admin/model-content-schema";

export type ContentSaveResult = { success: boolean; message: string };

async function updateContent(kind: "section" | "media", modelId: string, id: string, values: unknown): Promise<ContentSaveResult> {
  await requireAdmin();
  const failure = { success: false, message: kind === "section" ? "İçerik bölümü güncellenirken bir sorun oluştu." : "Görsel güncellenirken bir sorun oluştu." };
  if (!contentIdSchema.safeParse(modelId).success || !contentIdSchema.safeParse(id).success) return failure;
  const parsed = (kind === "section" ? sectionInputSchema : mediaInputSchema).safeParse(values);
  if (!parsed.success) return failure;
  // Zod strips all extra keys. Only the editable allowlist reaches UPDATE.
  const payload = Object.fromEntries(Object.entries(parsed.data).map(([key, value]) => [key, value === "" ? null : value]));
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from(kind === "section" ? "model_sections" : "model_media")
      .update(payload).eq("id", id).eq("model_id", modelId).select("id,model_id").single();
    if (error || !data || data.id !== id || data.model_id !== modelId) return failure;
  } catch { return failure; }
  revalidatePublicModels();
  revalidatePath(`/admin/modeller/${modelId}`);
  return { success: true, message: kind === "section" ? "İçerik bölümü güncellendi." : "Görsel bilgileri güncellendi." };
}

export async function updateModelSection(modelId: string, id: string, values: unknown) {
  return updateContent("section", modelId, id, values);
}
export async function updateModelMedia(modelId: string, id: string, values: unknown) {
  return updateContent("media", modelId, id, values);
}
