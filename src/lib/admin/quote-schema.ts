import { z } from "zod";

export const quoteStatuses = ["Yeni", "İletişime Geçildi", "Teklif Gönderildi", "Satış"] as const;
export const quoteStatusSchema = z.enum(quoteStatuses);
export type QuoteStatus = z.infer<typeof quoteStatusSchema>;

export const quoteIdSchema = z.string().regex(/^[1-9]\d{0,18}$/).refine(
  (value) => /^[1-9]\d{0,18}$/.test(value) && BigInt(value) <= BigInt("9223372036854775807"),
);

export const quoteSummarySchema = z.object({
  id: quoteIdSchema,
  full_name: z.string(),
  model: z.string(),
  phone: z.string(),
  status: quoteStatusSchema,
  created_at: z.string().refine((value) => Number.isFinite(Date.parse(value))),
});

export const quoteDetailSchema = quoteSummarySchema.extend({
  email: z.string(),
  living_plan: z.string().nullable(),
  project_location: z.string().nullable(),
  message: z.string().nullable(),
});

export type QuoteSummary = z.infer<typeof quoteSummarySchema>;

export const quoteStatusUpdateSchema = z.object({
  id: quoteIdSchema,
  status: quoteStatusSchema,
});
