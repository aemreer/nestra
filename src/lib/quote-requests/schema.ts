import { z } from "zod";

export const quoteRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Adınızı ve soyadınızı girin."),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
  phone: z.string().trim().min(7, "Telefon numaranızı girin."),
  model: z.string().min(1, "İlgilendiğiniz modeli seçin."),
  livingPlan: z.string().optional(),
  projectLocation: z.string().optional(),
  message: z.string().optional(),
  privacyConsent: z
    .boolean()
    .refine((value) => value, "Devam etmek için onay vermeniz gerekiyor."),
});

export type QuoteRequestValues = z.infer<typeof quoteRequestSchema>;
