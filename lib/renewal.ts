export type RenewalProductType =
  | "MVL"
  | "MC"
  | "PHA"
  | "CI"
  | "GPA"
  | "EUA"
  | "CPI";

export const RENEWAL_PRODUCTS: { code: RenewalProductType; name: string; placeholder: string }[] = [
  { code: "MVL", name: "Bảo hiểm TNDS ô tô", placeholder: "Số GCN, Biển số xe hoặc Số đơn BH (Ví dụ: 47A12345)" },
  { code: "MC", name: "Bảo hiểm TNDS xe máy", placeholder: "Số GCN, Biển số xe hoặc Số đơn BH (Ví dụ: 47H12345)" },
  { code: "PHA", name: "Bảo hiểm Sức khỏe BIC Tâm An", placeholder: "Số GCN bảo hiểm hoặc Số CCCD/Hộ chiếu" },
  { code: "CI", name: "Bảo hiểm Ung thư Phúc Tâm An", placeholder: "Số GCN bảo hiểm hoặc Số CCCD/Hộ chiếu" },
  { code: "GPA", name: "Bảo hiểm Tai nạn Con người 24/24", placeholder: "Số GCN bảo hiểm hoặc Số CCCD/Hộ chiếu" },
  { code: "EUA", name: "Bảo hiểm Tai nạn Điện", placeholder: "Số GCN bảo hiểm hoặc Mã hợp đồng điện" },
  { code: "CPI", name: "Bảo hiểm Tai nạn Mở rộng", placeholder: "Số GCN bảo hiểm hoặc Số đơn BH" },
];

export type RenewalPolicy = {
  certificateNo: string;
  insuredName: string;
  phone: string;
  address: string;
  numberPlate: string;
  chassisNumber: string;
  engineNumber: string;
  people: string;
  fromDate: string;
  toDate: string;
  issueDate: string;
  premium: number;
  vat: number;
  promotionRate: number;
  productCode?: string;
  productName?: string;
  status: "active" | "expired" | "unknown";
};

export type MvlPremiumItem = {
  CertificateNo?: string;
  Insured?: string;
  Tel?: string;
  Address?: string;
  NumberPlate?: string;
  ChassisNumber?: string;
  EngineNumber?: string;
  People?: string;
  SeatNumber?: string;
  FromDate?: string;
  ToDate?: string;
  IssueDate?: string;
  RequirePremium?: string;
  VAT?: string;
  PromotionRate?: string;
  Status?: string;
  total_premium_after_discount?: string;
};

export type MvlPremiumResponse = {
  MVLPremium?: MvlPremiumItem[];
  MCPremium?: MvlPremiumItem[];
  succeeded?: boolean;
  message?: string;
  data?: {
    userMessage?: string;
    dataResults?: MvlPremiumItem[];
  };
};

function parseNumber(value: string | number | undefined) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseApiDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function resolveStatus(item: MvlPremiumItem): RenewalPolicy["status"] {
  const rawStatus = item.Status?.trim().toLowerCase();
  if (rawStatus?.includes("het") || rawStatus?.includes("hết") || rawStatus?.includes("expired")) {
    return "expired";
  }

  const endDate = parseApiDate(item.ToDate || "");
  if (!endDate) return rawStatus ? "unknown" : "active";

  return endDate.getTime() >= Date.now() ? "active" : "expired";
}

export function mapMvlPremiumItem(item: MvlPremiumItem, productCode: string = "MVL"): RenewalPolicy {
  const prod = RENEWAL_PRODUCTS.find((p) => p.code === productCode);

  return {
    certificateNo: item.CertificateNo || "",
    insuredName: item.Insured || "",
    phone: item.Tel || "",
    address: item.Address || "",
    numberPlate: item.NumberPlate || "",
    chassisNumber: item.ChassisNumber || "",
    engineNumber: item.EngineNumber || "",
    people: item.People || item.SeatNumber || "",
    fromDate: item.FromDate || "",
    toDate: item.ToDate || "",
    issueDate: item.IssueDate || "",
    premium: Math.round(parseNumber(item.RequirePremium || item.total_premium_after_discount)),
    vat: Math.round(parseNumber(item.VAT)),
    promotionRate: parseNumber(item.PromotionRate),
    productCode,
    productName: prod?.name || "Bảo hiểm BIC",
    status: resolveStatus(item),
  };
}

export function formatRenewalDate(value: string) {
  const date = parseApiDate(value);
  if (!date) return value || "--";

  const pad = (part: number) => String(part).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function formatRenewalMoney(value: number) {
  return `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(value)} đ`;
}
