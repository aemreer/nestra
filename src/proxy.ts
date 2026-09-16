import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getActiveAdmin } from "@/lib/admin/authorization";
import { adminCookieOptions } from "@/lib/supabase/admin-cookie-options";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase environment variables are missing.");

  const supabase = createServerClient(url, key, {
    cookieOptions: adminCookieOptions,
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        const previousCookies = response.cookies.getAll();
        response = NextResponse.next({ request });
        previousCookies.forEach((cookie) => response.cookies.set(cookie));
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([name, value]) => response.headers.set(name, value));
      },
    },
  });

  const admin = await getActiveAdmin(supabase);
  if (request.nextUrl.pathname !== "/admin/login" && !admin) {
    const destination = request.nextUrl.clone();
    destination.pathname = "/admin/login";
    destination.search = "";
    const redirectResponse = NextResponse.redirect(destination, 303);
    response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));
    response = redirectResponse;
  }

  response.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
