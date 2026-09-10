export const VAT_RATE = 0.1;
export const PLAN_FACTORS = { basic: 1, advanced: 1.15, comprehensive: 1.28 } as const;
export const QUOTE_RATES = {
  auto: { base: { personal: 0.015, commercial: 0.018, pickup: 0.017 }, age: { new: 1, mid: 1.08, old: 1.18 }, deductible: { none: 1, five: 0.95, ten: 0.9 } },
  motorbike: { electric: 55000, standard: 60000, tricycle: 290000 },
  health: { age: { child: 1500000, young: 1800000, adult: 2400000, mature: 4200000, senior: 6500000 }, addons: { dental: 800000, maternity: 3000000, accident: 500000 } },
  travel: { daily: { domestic: 18000, asia: 45000, global: 75000 } },
  home: { baseRate: 0.0012, property: { apartment: 0.9, townhouse: 1, villa: 1.15 }, plan: { basic: 1, advanced: 1.3, comprehensive: 1.6 } },
  life: { age: { young: 0.006, adult: 0.009, mature: 0.014, senior: 0.022 }, term: { ten: 0.9, fifteen: 1, twenty: 1.12 }, addons: { accident: 500000, critical: 1200000 } },
  business: { risk: { office: 0.001, shop: 0.0015, warehouse: 0.0022, factory: 0.003 }, plan: { basic: 1, advanced: 1.25, comprehensive: 1.5 } }
} as const;

