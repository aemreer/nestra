import { z } from "zod";

export const modelIdSchema = z.string().uuid("Geçersiz model kimliği.");
export const modelInputSchema = z.object({
  name: z.string({ error: "Model adını girin." }).trim().min(1, "Model adını girin."),
  slug: z.string({ error: "Slug girin." }).min(1, "Slug girin.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Geçerli bir slug girin. Küçük harf, rakam ve tire kullanın."),
  area_sqm: z.number({ error: "Alan değerini girin." }).int("Alan değeri tam sayı olmalı.").positive("Alan değeri 0’dan büyük olmalı.").max(2147483647, "Alan değeri çok büyük."),
  rooms: z.string({ error: "Plan bilgisini girin." }).trim().min(1, "Plan bilgisini girin."),
  keyword: z.string({ error: "Karakter bilgisini girin." }).trim().min(1, "Karakter bilgisini girin."),
  level_label: z.string({ error: "Yapı bilgisini metin olarak girin." }).trim(),
  summary: z.string({ error: "Kısa açıklamayı metin olarak girin." }).trim(),
  sort_order: z.number({ error: "Sıralama değerini girin." }).int("Sıralama tam sayı olmalı.").min(-2147483648, "Sıralama değeri çok küçük.").max(2147483647, "Sıralama değeri çok büyük."),
  featured: z.boolean({ error: "Öne çıkan model seçimini kontrol edin." }),
  published: z.boolean({ error: "Yayın durumunu kontrol edin." }),
});

export type ModelInput = z.infer<typeof modelInputSchema>;

export const adminModelSchema = modelInputSchema.extend({
  id: modelIdSchema,
  level_label: z.string().nullable(),
  summary: z.string().nullable(),
});
export type AdminModel = z.infer<typeof adminModelSchema>;
