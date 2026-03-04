import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-3xl items-center justify-center px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Report not found</h1>
        <p className="mt-2 text-sm text-slate-600">The report may not exist or you may not have permission to view it.</p>
        <Link href="/dashboard" className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
