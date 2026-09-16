"use server";

import { revalidatePath } from "next/cache";
import { revalidatePublicModels } from "@/lib/public/revalidate-models";
import { requireAdmin } from "@/lib/admin/session";
import { modelIdSchema, modelInputSchema, type ModelInput } from "@/lib/admin/model-schema";
import { createClient } from "@/lib/supabase/server";
import { templateSchema } from "@/lib/admin/model-templates";

export type ModelSaveResult =
  | { success: true; id: string }
  | { success: false; message: string; fieldErrors?: Partial<Record<keyof ModelInput, string[]>> };

export async function saveModel(id: string | null, values: unknown, template: unknown = "single"): Promise<ModelSaveResult> {
  await requireAdmin();
  const failure: ModelSaveResult = { success: false, message: id === null ? "Model oluşturulurken bir sorun oluştu." : "Model güncellenirken bir sorun oluştu." };
  if (id !== null && !modelIdSchema.safeParse(id).success) return failure;
  if (id === null && !templateSchema.safeParse(template).success) return failure;
  const parsed = modelInputSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: "Lütfen formdaki alanları kontrol edin.", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  let savedId: string;
  try {
    const supabase = await createClient();
    // RPC keeps the model write and previous featured reset in one RLS-protected transaction.
    const { data, error } = await supabase.rpc(id === null ? "admin_create_model_template" : "admin_save_model", {
      ...(id === null ? { p_template: template } : { p_id: id }),
      p_values: { ...parsed.data, level_label: parsed.data.level_label || null, summary: parsed.data.summary || null },
    });
    if (error) {
      if (error.code === "23505" && /slug/i.test(error.message)) {
        return { success: false, message: "Bu slug başka bir model tarafından kullanılıyor.", fieldErrors: { slug: ["Bu slug başka bir model tarafından kullanılıyor."] } };
      }
      return failure;
    }
    const result = modelIdSchema.safeParse(data);
    if (!result.success || (id !== null && result.data !== id)) return failure;
    savedId = result.data;
  } catch {
    return failure;
  }

  // Invalidate other edit pages too: their featured value may have changed.
  revalidatePath("/admin/modeller", "layout");
  revalidatePublicModels();
  revalidatePath(`/admin/modeller/${savedId}`);
  return { success: true, id: savedId };
}
