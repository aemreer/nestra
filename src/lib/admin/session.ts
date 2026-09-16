import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveAdmin } from "./authorization";

// Request-scoped only. Future admin data functions/actions must call this guard too.
export const requireAdmin = cache(async () => {
  const supabase = await createClient({ readOnly: true });
  const user = await getActiveAdmin(supabase);
  if (!user) redirect("/admin/login");
  return user;
});
