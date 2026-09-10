export type QuoteProductType = "auto" | "motorbike" | "health" | "travel" | "home" | "life" | "business";
export type QuoteInput = Record<string, string | number | boolean> & { productType: QuoteProductType; plan: "basic" | "advanced" | "comprehensive" };
export type QuoteResult = { productType: QuoteProductType; basePremium: number; adjustmentFactors: Array<{ label: string; value: number }>; addOnPremium: number; preTaxPremium: number; vatRate: number; vatAmount: number; totalPremium: number; breakdown: Array<{ label: string; value: number; kind: string }> };
