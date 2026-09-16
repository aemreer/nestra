import { createClient } from "@/lib/supabase/client";
import { quoteRequestSchema, type QuoteRequestValues } from "./schema";

export async function submitQuoteRequest(values: QuoteRequestValues) {
  const data = quoteRequestSchema.parse(values);
  const supabase = createClient();

  // Do not chain select(): public visitors only have INSERT permission.
  const { error } = await supabase.from("quote_requests").insert({
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    model: data.model,
    living_plan: data.livingPlan?.trim() || null,
    project_location: data.projectLocation?.trim() || null,
    message: data.message?.trim() || null,
  });

  if (error) throw error;
}
