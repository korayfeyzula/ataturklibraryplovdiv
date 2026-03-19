import { supabase } from "@/lib/supabase";

export async function GET() {
  if (!supabase) {
    return Response.json({ status: "no supabase" });
  }

  const { error } = await supabase.from("events").select("id").limit(1);

  return Response.json({
    status: error ? "error" : "ok",
    timestamp: new Date().toISOString(),
  });
}
