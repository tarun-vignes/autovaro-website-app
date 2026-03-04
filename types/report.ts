export type PurchaseMethod = "cash" | "finance" | "lease";

export interface QuoteInput {
  year: number;
  make: string;
  model: string;
  vin?: string;
  mileage: number;
  askingPrice: number;
  zipCode: string;
  purchaseMethod: PurchaseMethod;
  listingUrl?: string;
  downPayment?: number;
  loanTermMonths?: number;
  aprPercent?: number;
  leaseTermMonths?: number;
  leaseMilesPerYear?: number;
}

export type PriceIndicator = "Overpriced" | "Fair" | "Underpriced";

export interface FairPriceBand {
  low: number;
  mid: number;
  high: number;
}

export interface OfferLadder {
  openingOffer: number;
  targetPrice: number;
  walkAwayPrice: number;
}

export interface FeeRiskPanel {
  state: string;
  docFeeEstimate: number;
  riskLevel: "Low" | "Medium" | "High";
}

export interface FinanceEstimate {
  principal: number;
  aprPercent: number;
  termMonths: number;
  monthlyPayment: number;
}

export interface NegotiationOpportunity {
  low: number;
  high: number;
  note: string;
}

export interface MethodologyPreview {
  matchLevel: "Exact Model" | "Make + Segment" | "Segment Average" | "Market Average";
  confidenceLabel: "High" | "Medium" | "Low";
  vehicleSegment: string;
  baselineReference: string;
  expectedMileage: number;
  ageAdjustment: number;
  mileageAdjustment: number;
}

export interface ReportOutput {
  dealConfidenceScore: number;
  priceIndicator: PriceIndicator;
  topInsight: string;
  whyBullets: string[];
  fairPriceBand: FairPriceBand;
  offerLadder: OfferLadder;
  feeRiskPanel: FeeRiskPanel;
  negotiationScript: string;
  financeEstimate?: FinanceEstimate;
  negotiationOpportunity: NegotiationOpportunity;
  methodologyPreview: MethodologyPreview;
  watermark: string;
}

export interface ReportRecord {
  id: string;
  user_id: string;
  input_json: QuoteInput;
  output_json: ReportOutput;
  is_paid: boolean;
  created_at: string;
}
