import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  if (isSupabaseConfigured) {
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = createSupabaseServerClient();
      await supabase.auth.exchangeCodeForSession(code);
    }
  }

  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
}
