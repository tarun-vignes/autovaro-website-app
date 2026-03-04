import { z } from "zod";

const purchaseMethodSchema = z.enum(["cash", "finance", "lease"]);

const optionalNumber = (schema: z.ZodNumber) =>
  z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }

      if (typeof value === "number") {
        return value;
      }

      if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : value;
      }

      return value;
    },
    schema.optional()
  );

const optionalInteger = (schema: z.ZodNumber) =>
  z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }

      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : value;
    },
    schema.int().optional()
  );

export const quoteInputSchema = z
  .object({
    year: z.coerce.number().int().min(1998).max(new Date().getFullYear() + 1),
    make: z.string().trim().min(1).max(40),
    model: z.string().trim().min(1).max(50),
    vin: z.preprocess(
      (value) => {
        if (typeof value !== "string") {
          return undefined;
        }

        const trimmed = value.trim().toUpperCase();
        return trimmed ? trimmed : undefined;
      },
      z.string().regex(/^[A-HJ-NPR-Z0-9]{17}$/, "VIN must be 17 characters").optional()
    ),
    mileage: z.coerce.number().nonnegative().max(450000),
    askingPrice: z.coerce.number().min(1000).max(500000),
    zipCode: z.string().trim().regex(/^\d{5}$/, "ZIP code must be 5 digits"),
    purchaseMethod: purchaseMethodSchema,
    listingUrl: z.preprocess(
      (value) => {
        if (typeof value !== "string") {
          return undefined;
        }

        const trimmed = value.trim();
        return trimmed ? trimmed : undefined;
      },
      z.string().url().optional()
    ),
    downPayment: optionalNumber(z.number().nonnegative().max(250000)),
    loanTermMonths: optionalInteger(z.number().min(12).max(96)),
    aprPercent: optionalNumber(z.number().nonnegative().max(30)),
    leaseTermMonths: optionalInteger(z.number().min(12).max(60)),
    leaseMilesPerYear: optionalInteger(z.number().min(5000).max(25000))
  })
  .superRefine((value, ctx) => {
    if (value.purchaseMethod === "finance") {
      if (typeof value.loanTermMonths !== "number") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["loanTermMonths"], message: "Loan term is required for finance." });
      }

      if (typeof value.aprPercent !== "number") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["aprPercent"], message: "APR is required for finance." });
      }
    }

    if (value.purchaseMethod === "lease") {
      if (typeof value.leaseTermMonths !== "number") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["leaseTermMonths"], message: "Lease term is required for lease." });
      }

      if (typeof value.leaseMilesPerYear !== "number") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["leaseMilesPerYear"], message: "Miles/year is required for lease." });
      }
    }
  })
  .transform((value) => ({
    ...value,
    make: value.make.toUpperCase(),
    model: value.model.toUpperCase()
  }));

export const checkoutSchema = z.object({
  reportId: z.string().uuid()
});

export type QuoteInputPayload = z.infer<typeof quoteInputSchema>;
