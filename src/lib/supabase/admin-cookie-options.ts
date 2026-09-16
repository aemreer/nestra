import type { CookieOptionsWithName } from "@supabase/ssr";

// Admin auth stays separate from the public browser client's anonymous requests.
export const adminCookieOptions: CookieOptionsWithName = {
  name: "nestra-admin-auth",
  path: "/admin",
  sameSite: "lax",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
