export type VehicleSegment =
  | "compact_sedan"
  | "midsize_sedan"
  | "compact_suv"
  | "midsize_suv"
  | "half_ton_truck"
  | "luxury_sedan"
  | "luxury_suv"
  | "ev_compact"
  | "ev_suv"
  | "market_generic";

export type BaselineMatchLevel = "exact_model" | "make_segment" | "segment" | "market_generic";

export interface BaselineRow {
  make: string;
  model: string;
  segment: VehicleSegment;
  baseYear: number;
  basePrice: number;
  typicalMileagePerYear: number;
  pricePerMile: number;
  depreciationPerYear: number;
}

interface AggregatedProfile {
  segment: VehicleSegment;
  baseYear: number;
  basePrice: number;
  typicalMileagePerYear: number;
  pricePerMile: number;
  depreciationPerYear: number;
}

interface MakeProfile {
  dominantSegment: VehicleSegment;
  bySegment: Partial<Record<VehicleSegment, AggregatedProfile>>;
  overall: AggregatedProfile;
}

export interface ResolvedBaseline extends AggregatedProfile {
  matchLevel: BaselineMatchLevel;
  baselineReference: string;
}

export const PRICING_BASELINE: BaselineRow[] = [
  { make: "TOYOTA", model: "CAMRY", segment: "midsize_sedan", baseYear: 2024, basePrice: 30500, typicalMileagePerYear: 12000, pricePerMile: 0.07, depreciationPerYear: 0.09 },
  { make: "TOYOTA", model: "COROLLA", segment: "compact_sedan", baseYear: 2024, basePrice: 24200, typicalMileagePerYear: 12000, pricePerMile: 0.06, depreciationPerYear: 0.1 },
  { make: "TOYOTA", model: "RAV4", segment: "compact_suv", baseYear: 2024, basePrice: 33400, typicalMileagePerYear: 12000, pricePerMile: 0.08, depreciationPerYear: 0.09 },
  { make: "HONDA", model: "CIVIC", segment: "compact_sedan", baseYear: 2024, basePrice: 25800, typicalMileagePerYear: 12000, pricePerMile: 0.06, depreciationPerYear: 0.1 },
  { make: "HONDA", model: "ACCORD", segment: "midsize_sedan", baseYear: 2024, basePrice: 29500, typicalMileagePerYear: 12000, pricePerMile: 0.07, depreciationPerYear: 0.09 },
  { make: "HONDA", model: "CR-V", segment: "compact_suv", baseYear: 2024, basePrice: 34900, typicalMileagePerYear: 12000, pricePerMile: 0.08, depreciationPerYear: 0.09 },
  { make: "NISSAN", model: "ALTIMA", segment: "midsize_sedan", baseYear: 2024, basePrice: 27200, typicalMileagePerYear: 12000, pricePerMile: 0.06, depreciationPerYear: 0.11 },
  { make: "NISSAN", model: "ROGUE", segment: "compact_suv", baseYear: 2024, basePrice: 31700, typicalMileagePerYear: 12000, pricePerMile: 0.07, depreciationPerYear: 0.1 },
  { make: "HYUNDAI", model: "ELANTRA", segment: "compact_sedan", baseYear: 2024, basePrice: 23500, typicalMileagePerYear: 12000, pricePerMile: 0.06, depreciationPerYear: 0.11 },
  { make: "HYUNDAI", model: "TUCSON", segment: "compact_suv", baseYear: 2024, basePrice: 32900, typicalMileagePerYear: 12000, pricePerMile: 0.07, depreciationPerYear: 0.1 },
  { make: "KIA", model: "FORTE", segment: "compact_sedan", baseYear: 2024, basePrice: 22800, typicalMileagePerYear: 12000, pricePerMile: 0.06, depreciationPerYear: 0.11 },
  { make: "KIA", model: "SPORTAGE", segment: "compact_suv", baseYear: 2024, basePrice: 31600, typicalMileagePerYear: 12000, pricePerMile: 0.07, depreciationPerYear: 0.1 },
  { make: "FORD", model: "F-150", segment: "half_ton_truck", baseYear: 2024, basePrice: 45900, typicalMileagePerYear: 13000, pricePerMile: 0.1, depreciationPerYear: 0.1 },
  { make: "FORD", model: "ESCAPE", segment: "compact_suv", baseYear: 2024, basePrice: 32200, typicalMileagePerYear: 12000, pricePerMile: 0.07, depreciationPerYear: 0.1 },
  { make: "CHEVROLET", model: "SILVERADO 1500", segment: "half_ton_truck", baseYear: 2024, basePrice: 47800, typicalMileagePerYear: 13000, pricePerMile: 0.1, depreciationPerYear: 0.1 },
  { make: "CHEVROLET", model: "EQUINOX", segment: "compact_suv", baseYear: 2024, basePrice: 31500, typicalMileagePerYear: 12000, pricePerMile: 0.07, depreciationPerYear: 0.1 },
  { make: "SUBARU", model: "OUTBACK", segment: "midsize_suv", baseYear: 2024, basePrice: 34700, typicalMileagePerYear: 12000, pricePerMile: 0.08, depreciationPerYear: 0.09 },
  { make: "SUBARU", model: "FORESTER", segment: "compact_suv", baseYear: 2024, basePrice: 33800, typicalMileagePerYear: 12000, pricePerMile: 0.08, depreciationPerYear: 0.09 },
  { make: "MAZDA", model: "CX-5", segment: "compact_suv", baseYear: 2024, basePrice: 33900, typicalMileagePerYear: 12000, pricePerMile: 0.08, depreciationPerYear: 0.09 },
  { make: "MAZDA", model: "MAZDA3", segment: "compact_sedan", baseYear: 2024, basePrice: 25200, typicalMileagePerYear: 12000, pricePerMile: 0.06, depreciationPerYear: 0.1 },
  { make: "VOLKSWAGEN", model: "JETTA", segment: "compact_sedan", baseYear: 2024, basePrice: 24100, typicalMileagePerYear: 12000, pricePerMile: 0.06, depreciationPerYear: 0.11 },
  { make: "VOLKSWAGEN", model: "TIGUAN", segment: "compact_suv", baseYear: 2024, basePrice: 33600, typicalMileagePerYear: 12000, pricePerMile: 0.08, depreciationPerYear: 0.1 },
  { make: "BMW", model: "3 SERIES", segment: "luxury_sedan", baseYear: 2024, basePrice: 49800, typicalMileagePerYear: 11000, pricePerMile: 0.12, depreciationPerYear: 0.12 },
  { make: "MERCEDES-BENZ", model: "C-CLASS", segment: "luxury_sedan", baseYear: 2024, basePrice: 52600, typicalMileagePerYear: 11000, pricePerMile: 0.12, depreciationPerYear: 0.12 },
  { make: "AUDI", model: "A4", segment: "luxury_sedan", baseYear: 2024, basePrice: 49200, typicalMileagePerYear: 11000, pricePerMile: 0.11, depreciationPerYear: 0.12 },
  { make: "LEXUS", model: "RX", segment: "luxury_suv", baseYear: 2024, basePrice: 53200, typicalMileagePerYear: 11000, pricePerMile: 0.11, depreciationPerYear: 0.1 },
  { make: "TESLA", model: "MODEL 3", segment: "ev_compact", baseYear: 2024, basePrice: 40900, typicalMileagePerYear: 12000, pricePerMile: 0.09, depreciationPerYear: 0.11 },
  { make: "TESLA", model: "MODEL Y", segment: "ev_suv", baseYear: 2024, basePrice: 46200, typicalMileagePerYear: 12000, pricePerMile: 0.1, depreciationPerYear: 0.11 },
  { make: "JEEP", model: "GRAND CHEROKEE", segment: "midsize_suv", baseYear: 2024, basePrice: 45800, typicalMileagePerYear: 12000, pricePerMile: 0.09, depreciationPerYear: 0.1 },
  { make: "RAM", model: "1500", segment: "half_ton_truck", baseYear: 2024, basePrice: 47100, typicalMileagePerYear: 13000, pricePerMile: 0.1, depreciationPerYear: 0.11 }
];

const GENERIC_PROFILE: AggregatedProfile = {
  segment: "market_generic",
  baseYear: 2024,
  basePrice: 28900,
  typicalMileagePerYear: 12000,
  pricePerMile: 0.075,
  depreciationPerYear: 0.1
};

function averageProfiles(rows: BaselineRow[], fallbackSegment: VehicleSegment): AggregatedProfile {
  if (rows.length === 0) {
    return { ...GENERIC_PROFILE, segment: fallbackSegment };
  }

  const totals = rows.reduce(
    (acc, row) => {
      acc.baseYear += row.baseYear;
      acc.basePrice += row.basePrice;
      acc.typicalMileagePerYear += row.typicalMileagePerYear;
      acc.pricePerMile += row.pricePerMile;
      acc.depreciationPerYear += row.depreciationPerYear;
      return acc;
    },
    { baseYear: 0, basePrice: 0, typicalMileagePerYear: 0, pricePerMile: 0, depreciationPerYear: 0 }
  );

  const count = rows.length;

  return {
    segment: fallbackSegment,
    baseYear: Math.round(totals.baseYear / count),
    basePrice: totals.basePrice / count,
    typicalMileagePerYear: totals.typicalMileagePerYear / count,
    pricePerMile: totals.pricePerMile / count,
    depreciationPerYear: totals.depreciationPerYear / count
  };
}

function buildSegmentProfiles(): Record<VehicleSegment, AggregatedProfile> {
  const grouped = new Map<VehicleSegment, BaselineRow[]>();

  for (const row of PRICING_BASELINE) {
    const entries = grouped.get(row.segment) ?? [];
    entries.push(row);
    grouped.set(row.segment, entries);
  }

  const result = {} as Record<VehicleSegment, AggregatedProfile>;
  for (const segment of grouped.keys()) {
    result[segment] = averageProfiles(grouped.get(segment) ?? [], segment);
  }

  result.market_generic = { ...GENERIC_PROFILE };
  return result;
}

function buildMakeProfiles(segmentProfiles: Record<VehicleSegment, AggregatedProfile>): Record<string, MakeProfile> {
  const grouped = new Map<string, BaselineRow[]>();

  for (const row of PRICING_BASELINE) {
    const entries = grouped.get(row.make) ?? [];
    entries.push(row);
    grouped.set(row.make, entries);
  }

  const result: Record<string, MakeProfile> = {};

  for (const [make, rows] of grouped.entries()) {
    const bySegment: Partial<Record<VehicleSegment, AggregatedProfile>> = {};
    const segmentCounts = new Map<VehicleSegment, number>();

    for (const row of rows) {
      segmentCounts.set(row.segment, (segmentCounts.get(row.segment) ?? 0) + 1);
    }

    for (const [segment] of segmentCounts.entries()) {
      const segmentRows = rows.filter((row) => row.segment === segment);
      bySegment[segment] = averageProfiles(segmentRows, segment);
    }

    const dominantSegment = [...segmentCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "market_generic";

    result[make] = {
      dominantSegment,
      bySegment,
      overall: averageProfiles(rows, dominantSegment)
    };

    if (!result[make].bySegment[dominantSegment]) {
      result[make].bySegment[dominantSegment] = segmentProfiles[dominantSegment] ?? result[make].overall;
    }
  }

  return result;
}

const SEGMENT_PROFILES = buildSegmentProfiles();
const MAKE_PROFILES = buildMakeProfiles(SEGMENT_PROFILES);

const SEGMENT_PATTERNS: Array<{ segment: VehicleSegment; pattern: RegExp }> = [
  { segment: "half_ton_truck", pattern: /(F-150|SILVERADO|RAM 1500|TUNDRA|SIERRA)/i },
  { segment: "luxury_sedan", pattern: /(3 SERIES|C-CLASS|A4|5 SERIES|E-CLASS|A6)/i },
  { segment: "luxury_suv", pattern: /(RX|X5|GLE|Q7|XC90)/i },
  { segment: "ev_suv", pattern: /(MODEL Y|IONIQ 5|EV6|E-TRON)/i },
  { segment: "ev_compact", pattern: /(MODEL 3|BOLT|LEAF)/i },
  { segment: "compact_suv", pattern: /(CR-V|RAV4|ROGUE|TUCSON|SPORTAGE|ESCAPE|EQUINOX|FORESTER|CX-5|TIGUAN)/i },
  { segment: "midsize_suv", pattern: /(OUTBACK|GRAND CHEROKEE|HIGHLANDER|PILOT|SANTA FE)/i },
  { segment: "midsize_sedan", pattern: /(CAMRY|ACCORD|ALTIMA|SONATA|K5)/i },
  { segment: "compact_sedan", pattern: /(COROLLA|CIVIC|ELANTRA|FORTE|MAZDA3|JETTA)/i }
];

function inferSegmentFromModel(model: string): VehicleSegment | undefined {
  for (const rule of SEGMENT_PATTERNS) {
    if (rule.pattern.test(model)) {
      return rule.segment;
    }
  }

  return undefined;
}

export function humanizeSegment(segment: VehicleSegment): string {
  const mapping: Record<VehicleSegment, string> = {
    compact_sedan: "Compact Sedan",
    midsize_sedan: "Midsize Sedan",
    compact_suv: "Compact SUV",
    midsize_suv: "Midsize SUV",
    half_ton_truck: "Half-Ton Truck",
    luxury_sedan: "Luxury Sedan",
    luxury_suv: "Luxury SUV",
    ev_compact: "EV Sedan",
    ev_suv: "EV SUV",
    market_generic: "General Market"
  };

  return mapping[segment];
}

export function humanizeMatchLevel(level: BaselineMatchLevel): "Exact Model" | "Make + Segment" | "Segment Average" | "Market Average" {
  const mapping: Record<BaselineMatchLevel, "Exact Model" | "Make + Segment" | "Segment Average" | "Market Average"> = {
    exact_model: "Exact Model",
    make_segment: "Make + Segment",
    segment: "Segment Average",
    market_generic: "Market Average"
  };

  return mapping[level];
}

export function resolveBaseline(make: string, model: string): ResolvedBaseline {
  const normalizedMake = make.trim().toUpperCase();
  const normalizedModel = model.trim().toUpperCase();

  const exactRow = PRICING_BASELINE.find((row) => row.make === normalizedMake && row.model === normalizedModel);
  if (exactRow) {
    return {
      matchLevel: "exact_model",
      baselineReference: `${exactRow.make} ${exactRow.model}`,
      segment: exactRow.segment,
      baseYear: exactRow.baseYear,
      basePrice: exactRow.basePrice,
      typicalMileagePerYear: exactRow.typicalMileagePerYear,
      pricePerMile: exactRow.pricePerMile,
      depreciationPerYear: exactRow.depreciationPerYear
    };
  }

  const inferredSegment = inferSegmentFromModel(normalizedModel);
  const makeProfile = MAKE_PROFILES[normalizedMake];

  if (makeProfile) {
    const makeSegment = inferredSegment ?? makeProfile.dominantSegment;
    const makeSegmentProfile = makeProfile.bySegment[makeSegment] ?? makeProfile.overall;

    return {
      ...makeSegmentProfile,
      segment: makeSegment,
      matchLevel: "make_segment",
      baselineReference: `${normalizedMake} ${humanizeSegment(makeSegment)} profile`
    };
  }

  if (inferredSegment && SEGMENT_PROFILES[inferredSegment]) {
    const segmentProfile = SEGMENT_PROFILES[inferredSegment];

    return {
      ...segmentProfile,
      matchLevel: "segment",
      baselineReference: `${humanizeSegment(inferredSegment)} market profile`
    };
  }

  return {
    ...GENERIC_PROFILE,
    matchLevel: "market_generic",
    baselineReference: "General market fallback profile"
  };
}
