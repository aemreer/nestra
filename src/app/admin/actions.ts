"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getActiveAdmin } from "@/lib/admin/authorization";

const credentialsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export type AuthState = { error: string | null };

export async function login(_state: AuthState, formData: FormData): Promise<AuthState> {
  const credentials = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!credentials.success) return { error: "E-posta veya şifre hatalı." };

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(credentials.data);
    if (error) return { error: "E-posta veya şifre hatalı." };

    let admin;
    try {
      admin = await getActiveAdmin(supabase);
    } catch {
      admin = null;
    }
    if (!admin) {
      const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
      if (signOutError) {
        return { error: "Bu hesabın yönetim paneline erişim yetkisi bulunmuyor. Oturum kapatılamadı. Lütfen tekrar deneyin." };
      }
      return { error: "Bu hesabın yönetim paneline erişim yetkisi bulunmuyor." };
    }
  } catch {
    return { error: "Giriş yapılırken bir sorun oluştu. Lütfen tekrar deneyin." };
  }

  redirect("/admin");
}

export async function logout(): Promise<AuthState> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) return { error: "Çıkış yapılamadı. Lütfen tekrar deneyin." };
  } catch {
    return { error: "Çıkış yapılamadı. Lütfen tekrar deneyin." };
  }
  redirect("/admin/login");
}
