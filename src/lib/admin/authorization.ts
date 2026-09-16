import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

export async function getActiveAdmin(supabase: SupabaseClient) {
  // Ask the Auth server to validate the user; never trust getSession().user.
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data: admin, error } = await supabase
    .from("admin_users")
    .select("user_id, is_active")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !admin || admin.user_id !== user.id || admin.is_active !== true) {
    return null;
  }

  return user;
}
