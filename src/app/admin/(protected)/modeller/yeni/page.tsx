import type { Metadata } from "next";
import { ModelForm } from "@/components/admin/model-form";
import { requireAdmin } from "@/lib/admin/session";

export const metadata: Metadata = { title: "Yeni Model" };

export default async function NewModelPage() {
  await requireAdmin();
  return <><h1 className="mb-3 text-2xl font-medium tracking-tight sm:text-3xl">Yeni Model</h1><p className="mb-7 max-w-2xl text-sm leading-6 text-warm-gray">Şablonu seçin ve ana bilgileri girin. Model taslak olarak oluşturulur; sonraki adımda içerikleri ve görselleri düzenleyebilirsiniz.</p><ModelForm /></>;
}
