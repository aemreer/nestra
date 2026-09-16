import "server-only";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "./session";
import { quoteDetailSchema, quoteIdSchema, quoteSummarySchema, type QuoteStatus } from "./quote-schema";

// Cast bigint IDs before JSON serialization so they never lose integer precision.
const summaryColumns = "id::text,full_name,model,phone,status,created_at";
export const quotesPageSize = 25;

export async function getQuoteDashboard() {
  await requireAdmin();
  const supabase = await createClient({ readOnly: true });
  const countQuotes = async (status?: QuoteStatus) => {
    let query = supabase.from("quote_requests").select("id", { count: "exact", head: true });
    if (status) query = query.eq("status", status);
    const { count, error } = await query;
    if (error || count === null) throw new Error("Quote count could not be loaded.");
    return count;
  };
  const [total, newlyReceived, contacted, sales, recent] = await Promise.all([
    countQuotes(), countQuotes("Yeni"), countQuotes("İletişime Geçildi"), countQuotes("Satış"),
    supabase.from("quote_requests").select(summaryColumns)
      .order("created_at", { ascending: false }).order("id", { ascending: false }).limit(5),
  ]);
  if (recent.error || !recent.data) throw new Error("Recent quotes could not be loaded.");
  return { total, newlyReceived, contacted, sales, recent: quoteSummarySchema.array().parse(recent.data) };
}

export async function getQuotes(page: number) {
  await requireAdmin();
  const supabase = await createClient({ readOnly: true });
  const start = (page - 1) * quotesPageSize;
  const { data, count, error } = await supabase.from("quote_requests")
    .select(summaryColumns, { count: "exact" })
    .order("created_at", { ascending: false }).order("id", { ascending: false })
    .range(start, start + quotesPageSize - 1);
  if (error || !data || count === null) throw new Error("Quotes could not be loaded.");
  return { quotes: quoteSummarySchema.array().parse(data), total: count };
}

export async function getQuote(id: string) {
  await requireAdmin();
  if (!quoteIdSchema.safeParse(id).success) return null;
  const supabase = await createClient({ readOnly: true });
  const { data, error } = await supabase.from("quote_requests")
    .select(`${summaryColumns},email,living_plan,project_location,message`)
    .eq("id", id).maybeSingle();
  if (error) throw new Error("Quote could not be loaded.");
  return data ? quoteDetailSchema.parse(data) : null;
}
