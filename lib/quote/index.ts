import { PLAN_FACTORS, QUOTE_RATES, VAT_RATE } from "../../config/quote-rates";
import type { QuoteInput, QuoteResult } from "../../types/quote";

const money = (value: number) => Math.round(value);
const ageBand = (age: number, bands: [number, number, number, number]) => age <= bands[0] ? 0 : age <= bands[1] ? 1 : age <= bands[2] ? 2 : 3;

export function calculateQuote(input: QuoteInput): QuoteResult {
  let base = 0; let addOn = 0; const factors: Array<{ label: string; value: number }> = [];
  const plan = input.plan || "basic";
  if (input.productType === "auto") {
    const rate = QUOTE_RATES.auto.base[String(input.vehicleType) as keyof typeof QUOTE_RATES.auto.base] ?? 0.015;
    const age = Number(input.vehicleAge) || 0; const ageFactor = age <= 3 ? 1 : age <= 7 ? 1.08 : 1.18;
    const deductible = QUOTE_RATES.auto.deductible[String(input.deductible) as keyof typeof QUOTE_RATES.auto.deductible] ?? 1;
    base = Number(input.vehicleValue) * rate; factors.push({ label: "Tỷ lệ loại xe", value: rate }, { label: "Hệ số tuổi xe", value: ageFactor }, { label: "Hệ số miễn thường", value: deductible }, { label: "Hệ số gói", value: PLAN_FACTORS[plan] }); base *= ageFactor * deductible * PLAN_FACTORS[plan];
  } else if (input.productType === "motorbike") base = QUOTE_RATES.motorbike[String(input.motorbikeType) as keyof typeof QUOTE_RATES.motorbike] ?? 60000;
  else if (input.productType === "health") { const age = Number(input.age) || 30; const raw = age <= 17 ? 1500000 : age <= 30 ? 1800000 : age <= 45 ? 2400000 : age <= 60 ? 4200000 : 6500000; base = raw * PLAN_FACTORS[plan]; addOn = (input.dental ? 800000 : 0) + (input.maternity ? 3000000 : 0) + (input.accident ? 500000 : 0); factors.push({ label: "Hệ số gói", value: PLAN_FACTORS[plan] }); }
  else if (input.productType === "travel") { const daily = QUOTE_RATES.travel.daily[String(input.region) as keyof typeof QUOTE_RATES.travel.daily] ?? 18000; const ageFactor = Number(input.age) > 65 ? 1.5 : 1; base = Number(input.days) * daily * PLAN_FACTORS[plan] * ageFactor; factors.push({ label: "Phí mỗi ngày", value: daily }, { label: "Hệ số gói", value: PLAN_FACTORS[plan] }, { label: "Hệ số tuổi", value: ageFactor }); }
  else if (input.productType === "home") { const property = QUOTE_RATES.home.property[String(input.propertyType) as keyof typeof QUOTE_RATES.home.property] ?? 1; const pf = QUOTE_RATES.home.plan[plan]; base = Number(input.propertyValue) * QUOTE_RATES.home.baseRate * property * pf; factors.push({ label: "Tỷ lệ cơ bản", value: QUOTE_RATES.home.baseRate }, { label: "Hệ số loại nhà", value: property }, { label: "Hệ số gói", value: pf }); }
  else if (input.productType === "life") { const age = Number(input.age) || 30; const rate = age <= 30 ? 0.006 : age <= 40 ? 0.009 : age <= 50 ? 0.014 : 0.022; const term = input.term === "ten" ? 0.9 : input.term === "twenty" ? 1.12 : 1; base = Number(input.coverage) * rate * term; addOn = (input.accident ? 500000 : 0) + (input.critical ? 1200000 : 0); factors.push({ label: "Tỷ lệ theo tuổi", value: rate }, { label: "Hệ số thời hạn", value: term }); }
  else if (input.productType === "business") { const risk = QUOTE_RATES.business.risk[String(input.riskType) as keyof typeof QUOTE_RATES.business.risk] ?? 0.001; const pf = QUOTE_RATES.business.plan[plan]; base = Number(input.assetValue) * risk * pf; factors.push({ label: "Tỷ lệ rủi ro", value: risk }, { label: "Hệ số gói", value: pf }); }
  const preTax = money(base + addOn); const vat = money(preTax * VAT_RATE); const total = preTax + vat;
  return { productType: input.productType, basePremium: money(base), adjustmentFactors: factors, addOnPremium: money(addOn), preTaxPremium: preTax, vatRate: VAT_RATE, vatAmount: vat, totalPremium: total, breakdown: [{ label: "Phí cơ bản", value: money(base), kind: "base" }, ...factors.map(f => ({ label: f.label, value: f.value, kind: "factor" })), { label: "Quyền lợi bổ sung", value: money(addOn), kind: "addon" }, { label: "Phí trước VAT", value: preTax, kind: "subtotal" }, { label: "VAT (10%)", value: vat, kind: "tax" }, { label: "Tổng phí dự kiến", value: total, kind: "total" }] };
}

export const formatVnd = (value: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
