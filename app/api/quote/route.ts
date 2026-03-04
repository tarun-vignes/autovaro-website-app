import { NextResponse } from "next/server";
import { buildReport } from "@/lib/scoring";
import { createReportRecord } from "@/lib/reports";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { quoteInputSchema } from "@/lib/validation";

const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
    }

    const supabase = createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "You must be signed in to generate a report." }, { status: 401 });
    }

    const json = await request.json();
    const parsed = quoteInputSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid input.",
          issues: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const output = buildReport(parsed.data);
    const reportId = await createReportRecord(user.id, parsed.data, output);

    return NextResponse.json({ reportId }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
