"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { revalidatePublicModels } from "@/lib/public/revalidate-models";
import { requireAdmin } from "@/lib/admin/session";
import { createClient } from "@/lib/supabase/server";
import { contentIdSchema } from "@/lib/admin/model-content-schema";
import { IMAGE_TYPES, validateImageFile } from "@/lib/admin/media-upload";
import { getModelContent } from "@/lib/admin/model-content";

export async function uploadModelMedia(modelId: string, mediaId: string, form: FormData) {
  return uploadMedia(modelId, mediaId, null, form);
}

export async function uploadModelMediaSlot(modelId: string, role: string, form: FormData) {
  return uploadMedia(modelId, null, role, form);
}

async function uploadMedia(modelId: string, mediaId: string | null, requestedRole: string | null, form: FormData) {
  await requireAdmin();
  const failure = { success: false, message: "Görsel yüklenirken bir sorun oluştu.", src: undefined as string | undefined };
  if (!contentIdSchema.safeParse(modelId).success || (mediaId !== null && !contentIdSchema.safeParse(mediaId).success)) return failure;
  const file = form.get("file");
  const validation = validateImageFile(file instanceof File ? file : null);
  if (validation || !(file instanceof File)) return { ...failure, message: validation ?? failure.message };
  try {
    const supabase = await createClient();
    let role: string;
    if (mediaId !== null) {
      const { data: media, error } = await supabase.from("model_media").select("id,role").eq("id", mediaId).eq("model_id", modelId).single();
      if (error || !media) return failure;
      role = media.role;
    } else {
      const content = await getModelContent(modelId);
      if (!requestedRole || !content.expectedRoles.includes(requestedRole)) return failure;
      role = requestedRole;
    }
    const { data: model, error: modelError } = await supabase.from("models").select("slug").eq("id", modelId).single();
    if (modelError || !model) return failure;
    const segment = /^[a-zA-Z0-9_-]+$/;
    if (!segment.test(model.slug) || !segment.test(role)) return failure;
    const bytes = new Uint8Array(await file.arrayBuffer());
    // Check the file signature as well as the client-provided MIME type.
    const matches = file.type === "image/png" ? [137,80,78,71,13,10,26,10].every((v,i) => bytes[i] === v)
      : file.type === "image/jpeg" ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
      : String.fromCharCode(...bytes.slice(0,4)) === "RIFF" && String.fromCharCode(...bytes.slice(8,12)) === "WEBP";
    if (!matches) return { ...failure, message: "Yalnızca WebP, PNG veya JPEG görseller yüklenebilir." };
    const path = `models/${model.slug}/${role}/${randomUUID()}.${IMAGE_TYPES[file.type as keyof typeof IMAGE_TYPES]}`;
    const bucket = supabase.storage.from("model-media");
    const { error: uploadError } = await bucket.upload(path, bytes, { contentType: file.type, upsert: false });
    if (uploadError) return failure;
    const { data: { publicUrl } } = bucket.getPublicUrl(path);
    // No cleanup/delete: a database failure leaves the uploaded object in Storage.
    const { data, error } = mediaId === null
      ? await supabase.rpc("admin_attach_model_media", { p_model_id: modelId, p_role: role, p_src: publicUrl })
      : await supabase.from("model_media").update({ src: publicUrl }).eq("id", mediaId).eq("model_id", modelId).select("id").single();
    if (error || !data) return failure;
    revalidatePublicModels();
    revalidatePath(`/admin/modeller/${modelId}`);
    return { success: true, message: "Görsel yüklendi.", src: publicUrl };
  } catch { return failure; }
}
