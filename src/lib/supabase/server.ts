import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { adminCookieOptions } from "./admin-cookie-options";

export async function createClient({ readOnly = false } = {}) {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) throw new Error("Supabase environment variables are missing.");

  return createServerClient(url, key, {
    cookieOptions: adminCookieOptions,
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        // Server Components read the session already refreshed by the admin proxy.
        // Actions must persist cookies and must not silently ignore write failures.
        if (readOnly) return;
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}
