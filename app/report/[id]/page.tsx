import { notFound, redirect } from "next/navigation";
import { getReportForUser } from "@/lib/reports";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { UnlockReportButton } from "@/components/unlock-report-button";
import { PdfExportButton } from "@/components/pdf-export-button";

const disclaimer =
  "CarSage provides educational pricing guidance based on aggregated market data. Estimates are not guarantees and may not reflect final out-the-door pricing.";

const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function currency(value: number): string {
  return `$${value.toLocaleString()}`;
}

function signedCurrency(value: number): string {
  if (value > 0) {
    return `+${currency(value)}`;
  }

  if (value < 0) {
    return `-${currency(Math.abs(value))}`;
  }

  return "$0";
}

export default async function ReportPage({ params }: { params: { id: string } }) {
  if (!isSupabaseConfigured) {
    return (
      <main className="page-wrap py-10">
        <div className="surface-card p-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Supabase not configured</h1>
          <p className="mt-2 text-sm text-slate-600">Set Supabase environment variables to load reports.</p>
        </div>
      </main>
    );
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/report/${params.id}`);
  }

  const report = await getReportForUser(params.id, user.id);
  if (!report) {
    notFound();
  }

  const output = report.output_json;

  return (
    <main className="page-wrap py-10">
      <div className="print-page surface-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">CarSage Report</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              {report.input_json.year} {report.input_json.make} {report.input_json.model}
            </h1>
            <p className="mt-1 text-sm text-slate-600">Generated {new Date(report.created_at).toLocaleString()}</p>
          </div>
          <div className="print-hidden flex items-center gap-3">
            {report.is_paid ? <PdfExportButton /> : <UnlockReportButton reportId={report.id} />}
          </div>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="soft-card p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Deal Confidence</p>
            <p className="mt-2 text-4xl font-semibold text-slate-900">{output.dealConfidenceScore}</p>
          </div>
          <div className="soft-card p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Price Signal</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{output.priceIndicator}</p>
          </div>
          <div className="soft-card p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Negotiation Room</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {currency(output.negotiationOpportunity?.low ?? 0)} - {currency(output.negotiationOpportunity?.high ?? 0)}
            </p>
          </div>
          <div className="soft-card p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Model Confidence</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">{output.methodologyPreview?.confidenceLabel ?? "Medium"}</p>
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="soft-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Preview Insight</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{output.topInsight}</p>
            <p className="mt-3 text-sm text-slate-700">{output.negotiationOpportunity?.note}</p>
          </div>

          <div className="soft-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">How this was calculated</p>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <p>
                Baseline: <span className="font-semibold text-slate-900">{output.methodologyPreview?.matchLevel ?? "Segment Average"}</span>
              </p>
              <p>
                Segment: <span className="font-semibold text-slate-900">{output.methodologyPreview?.vehicleSegment ?? "General Market"}</span>
              </p>
              <p>
                Reference: <span className="font-semibold text-slate-900">{output.methodologyPreview?.baselineReference ?? "Market profile"}</span>
              </p>
              <p>
                Expected mileage by age: <span className="font-semibold text-slate-900">{(output.methodologyPreview?.expectedMileage ?? 0).toLocaleString()} mi</span>
              </p>
              <p>
                Age adjustment: <span className="font-semibold text-slate-900">{signedCurrency(output.methodologyPreview?.ageAdjustment ?? 0)}</span>
              </p>
              <p>
                Mileage adjustment: <span className="font-semibold text-slate-900">{signedCurrency(output.methodologyPreview?.mileageAdjustment ?? 0)}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="relative mt-8 rounded-2xl border border-slate-200 p-5">
          {!report.is_paid && (
            <div className="print-hidden absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/75 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-800">Full report is locked.</p>
                <p className="mt-1 text-xs text-slate-600">Unlock full plan, fee detail, and script for $9.</p>
              </div>
            </div>
          )}

          <div className={!report.is_paid ? "select-none blur-[3px]" : ""}>
            <h2 className="text-lg font-semibold text-slate-900">Fair Price Band</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="soft-card p-3 text-sm">
                <p className="text-slate-500">Low</p>
                <p className="font-semibold text-slate-900">{currency(output.fairPriceBand.low)}</p>
              </div>
              <div className="soft-card p-3 text-sm">
                <p className="text-slate-500">Mid</p>
                <p className="font-semibold text-slate-900">{currency(output.fairPriceBand.mid)}</p>
              </div>
              <div className="soft-card p-3 text-sm">
                <p className="text-slate-500">High</p>
                <p className="font-semibold text-slate-900">{currency(output.fairPriceBand.high)}</p>
              </div>
            </div>

            <h2 className="mt-7 text-lg font-semibold text-slate-900">Offer Ladder</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="soft-card p-3 text-sm">
                <p className="text-slate-500">Opening Offer</p>
                <p className="font-semibold text-slate-900">{currency(output.offerLadder.openingOffer)}</p>
              </div>
              <div className="soft-card p-3 text-sm">
                <p className="text-slate-500">Target Price</p>
                <p className="font-semibold text-slate-900">{currency(output.offerLadder.targetPrice)}</p>
              </div>
              <div className="soft-card p-3 text-sm">
                <p className="text-slate-500">Walk-Away Price</p>
                <p className="font-semibold text-slate-900">{currency(output.offerLadder.walkAwayPrice)}</p>
              </div>
            </div>

            <h2 className="mt-7 text-lg font-semibold text-slate-900">Fee Risk Panel</h2>
            <div className="soft-card mt-3 p-4 text-sm text-slate-700">
              <p>State: {output.feeRiskPanel.state}</p>
              <p className="mt-1">Estimated documentation fee: {currency(output.feeRiskPanel.docFeeEstimate)}</p>
              <p className="mt-1">Risk level: {output.feeRiskPanel.riskLevel}</p>
            </div>

            <h2 className="mt-7 text-lg font-semibold text-slate-900">Negotiation Script</h2>
            <p className="soft-card mt-3 p-4 text-sm leading-relaxed text-slate-700">{output.negotiationScript}</p>

            {output.financeEstimate && (
              <>
                <h2 className="mt-7 text-lg font-semibold text-slate-900">Finance Monthly Estimate</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-4">
                  <div className="soft-card p-3 text-sm">
                    <p className="text-slate-500">Principal</p>
                    <p className="font-semibold text-slate-900">{currency(output.financeEstimate.principal)}</p>
                  </div>
                  <div className="soft-card p-3 text-sm">
                    <p className="text-slate-500">APR</p>
                    <p className="font-semibold text-slate-900">{output.financeEstimate.aprPercent}%</p>
                  </div>
                  <div className="soft-card p-3 text-sm">
                    <p className="text-slate-500">Term</p>
                    <p className="font-semibold text-slate-900">{output.financeEstimate.termMonths} mo</p>
                  </div>
                  <div className="soft-card p-3 text-sm">
                    <p className="text-slate-500">Monthly Payment</p>
                    <p className="font-semibold text-slate-900">{currency(output.financeEstimate.monthlyPayment)}</p>
                  </div>
                </div>
              </>
            )}

            <h2 className="mt-7 text-lg font-semibold text-slate-900">Why this score</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {output.whyBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-8 flex items-center justify-between gap-6 text-xs text-slate-500">
          <p>{disclaimer}</p>
          <p className="font-semibold uppercase tracking-wide">{output.watermark}</p>
        </div>
      </div>
    </main>
  );
}
