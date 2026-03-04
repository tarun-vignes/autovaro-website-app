import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET(request: Request) {
  if (isSupabaseConfigured) {
    const supabase = createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  const url = new URL(request.url);
  return NextResponse.redirect(new URL("/", url.origin));
}
