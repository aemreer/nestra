"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/session";
import { createClient } from "@/lib/supabase/server";
import { quoteStatusUpdateSchema } from "@/lib/admin/quote-schema";

export type StatusUpdateState = { success: boolean; message: string | null; submittedStatus: string | null };

export async function updateQuoteStatus(_state: StatusUpdateState, formData: FormData): Promise<StatusUpdateState> {
  // Do not catch the authentication redirect, and never trust the hidden ID.
  await requireAdmin();
  const input = quoteStatusUpdateSchema.safeParse({ id: formData.get("id"), status: formData.get("status") });
  const failure: StatusUpdateState = { success: false, message: "Durum güncellenirken bir sorun oluştu.", submittedStatus: String(formData.get("status") ?? "") };
  if (!input.success) return failure;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("quote_requests")
      .update({ status: input.data.status })
      .eq("id", input.data.id)
      .select("id::text,status")
      .single();
    // Zero matching rows (including an RLS denial) must never produce success.
    if (error || !data || data.id !== input.data.id || data.status !== input.data.status) return failure;
  } catch {
    return failure;
  }

  revalidatePath("/admin");
  revalidatePath("/admin/teklifler");
  revalidatePath(`/admin/teklifler/${input.data.id}`);
  return { success: true, message: "Durum güncellendi.", submittedStatus: input.data.status };
}
