import Link from "next/link";
import { redirect } from "next/navigation";
import { listReportsForUser } from "@/lib/reports";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    return (
      <main className="page-wrap py-10">
        <div className="surface-card p-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Supabase not configured</h1>
          <p className="mt-2 text-sm text-slate-600">Set Supabase environment variables to use dashboard features.</p>
        </div>
      </main>
    );
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const reports = await listReportsForUser(user.id);

  return (
    <main className="page-wrap py-10">
      <div className="surface-card p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Your Reports</h1>
            <p className="mt-1 text-sm text-slate-600">Review your purchased and preview reports.</p>
          </div>
          <Link href="/check" className="btn-secondary">
            New Check
          </Link>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[660px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-4 py-3 font-medium">Vehicle</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-t border-slate-100 text-slate-700 hover:bg-slate-50/70">
                  <td className="px-4 py-3">
                    {report.input_json.year} {report.input_json.make} {report.input_json.model}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{report.output_json.dealConfidenceScore}</td>
                  <td className="px-4 py-3">
                    {report.is_paid ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">Paid</span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">Preview</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{new Date(report.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Link href={`/report/${report.id}`} className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">
                      View report
                    </Link>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td className="px-4 py-7 text-slate-600" colSpan={5}>
                    No reports yet. <Link href="/check" className="font-medium underline">Check your first listing.</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
