"use client";

import { useState } from "react";
import { calculateQuote, formatVnd } from "../../lib/quote";
import { quotePlans } from "../../config/quote-plans";
import type { QuoteInput, QuoteProductType, QuoteResult } from "../../types/quote";
import { Icon } from "../ui/icon";
import { OcrScannerModal } from "../ui/ocr-scanner-modal";
import { ECertificateCard } from "../certificate/e-certificate-card";
import { generateMockCertificate, sampleCertificates, type InsuranceCertificate } from "../../lib/certificate";
import type { OcrResult } from "../../lib/ocr";

type Props = {
  initialProductType?: QuoteProductType;
  compact?: boolean;
  onSelectionChange?: (selection: { productType: QuoteProductType; plan: QuoteInput["plan"] }) => void;
};

const productOptions: Array<{ value: QuoteProductType; label: string }> = [
  { value: "auto", label: "Ô tô" },
  { value: "motorbike", label: "Xe máy" },
  { value: "health", label: "Sức khỏe & tai nạn" },
  { value: "travel", label: "Du lịch" },
  { value: "home", label: "Nhà ở" },
  { value: "life", label: "Nhân thọ" },
  { value: "business", label: "Doanh nghiệp, tài sản & hàng hóa" },
];

const planOptions = [
  { value: "basic", label: "Cơ bản" },
  { value: "advanced", label: "Nâng cao" },
  { value: "comprehensive", label: "Toàn diện" },
] as const;

function defaultFields(productType: QuoteProductType): Record<string, string | boolean> {
  if (productType === "auto") {
    return { vehicleType: "personal", vehicleValue: "500000000", vehicleAge: "3", deductible: "none" };
  }
  if (productType === "motorbike") return { motorbikeType: "standard" };
  if (productType === "health") return { age: "30", dental: false, maternity: false, accident: false };
  if (productType === "travel") return { region: "asia", days: "5", age: "30" };
  if (productType === "home") return { propertyValue: "1000000000", propertyType: "apartment" };
  if (productType === "life") return { coverage: "1000000000", age: "30", term: "fifteen", accident: false, critical: false };
  return { assetValue: "1000000000", riskType: "office" };
}

function fieldValue(fields: Record<string, string | boolean>, name: string) {
  return String(fields[name] ?? "");
}

export function QuickQuote({ initialProductType = "auto", compact = false, onSelectionChange }: Props) {
  const [productType, setProductType] = useState<QuoteProductType>(initialProductType);
  const [plan, setPlan] = useState<QuoteInput["plan"]>("basic");
  const [fields, setFields] = useState<Record<string, string | boolean>>(defaultFields(initialProductType));
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [showPlanDetails, setShowPlanDetails] = useState(false);

  const [isOcrOpen, setIsOcrOpen] = useState(false);
  const [activeCert, setActiveCert] = useState<InsuranceCertificate | null>(null);

  function handleOcrApply(data: OcrResult) {
    if (data.vehicleType === "motorbike") {
      setProductType("motorbike");
    } else {
      setProductType("auto");
      updateField("vehicleType", data.vehicleType);
    }
    setFields((curr) => ({
      ...curr,
      scannedPlate: data.licensePlate,
      scannedOwner: data.ownerName,
      scannedChassis: data.chassisNumber,
      scannedEngine: data.engineNumber,
    }));
    setResult(null);
  }

  function handleOpenSampleCert() {
    const cert = generateMockCertificate(
      String(fields.scannedPlate || "47A-888.99"),
      String(fields.scannedOwner || "NGUYỄN VĂN AN"),
      productType === "auto" ? "Ô tô dưới 6 chỗ" : "Xe máy mô tô 2 bánh"
    );
    setActiveCert(cert);
  }

  function updateField(name: string, value: string | boolean) {
    setResult(null);
    setFields((current) => ({ ...current, [name]: value }));
  }

  function changeProduct(value: QuoteProductType) {
    setProductType(value);
    setPlan("basic");
    setFields(defaultFields(value));
    setResult(null);
    setShowPlanDetails(false);
    onSelectionChange?.({ productType: value, plan: "basic" });
  }

  function changePlan(value: QuoteInput["plan"]) {
    setPlan(value);
    setResult(null);
    onSelectionChange?.({ productType, plan: value });
  }

  function calculate() {
    setResult(calculateQuote({ productType, plan, ...fields } as QuoteInput));
  }

  const selectedPlan = quotePlans[productType][plan];

  const selectClass = "w-full rounded-[11px] border border-[#cce0f5] bg-[#f4f8fd] px-4 py-3 text-[15px] text-[#0b2341] outline-none transition focus:border-[#0066cc] focus:bg-white";
  const inputClass = `${selectClass} placeholder:text-[#8aa09e]`;
  const labelClass = "mb-2 block text-[13px] font-semibold text-[#0b2341]";

  return (
    <div id="quick-quote-box" className={`w-full rounded-[18px] border border-[#cce0f5] bg-white p-6 shadow-[0_12px_40px_rgba(7,25,47,0.08)] ${compact ? "" : "lg:p-8"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#eef6ff] pb-5 gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0066cc] text-white shadow-sm">
            <Icon name="calculator" size={17} />
          </span>
          <div>
            <h3 className="text-[18px] font-bold tracking-tight text-[#0b2341]">Tính phí nhanh</h3>
            <p className="mt-1 text-[13px] leading-5 text-[#4a6785]">Chọn sản phẩm và nhập vài thông tin cơ bản để nhận mức phí minh họa.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsOcrOpen(true)}
          className="flex items-center justify-center gap-2 rounded-full border border-[#0066cc]/30 bg-[#eef6ff] px-4 py-2 text-xs font-bold text-[#0066cc] hover:bg-[#0066cc] hover:text-white transition shadow-sm"
        >
          <Icon name="sparkles" size={14} />
          <span>📷 Quét Cà vẹt / CCCD (AI OCR)</span>
        </button>
      </div>

      {fields.scannedPlate && (
        <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50/90 p-3.5 text-xs text-emerald-950 space-y-1 shadow-sm">
          <div className="flex items-center justify-between font-bold text-emerald-800 border-b border-emerald-200/80 pb-1">
            <span className="flex items-center gap-1.5">
              <Icon name="check" size={16} className="text-emerald-600" />
              ✓ Đã tự động bóc tách & điền thông tin từ Cà vẹt xe:
            </span>
            <button onClick={() => setFields(defaultFields(productType))} className="text-[11px] font-normal underline text-emerald-700 hover:text-emerald-950">Xóa dữ liệu quét</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 pt-1 text-[11px]">
            <div>• Biển kiểm soát: <strong className="font-mono text-emerald-900 text-xs">{String(fields.scannedPlate)}</strong></div>
            <div>• Tên chủ xe: <strong>{String(fields.scannedOwner)}</strong></div>
            <div>• Số khung: <strong className="font-mono">{String(fields.scannedChassis)}</strong></div>
            <div>• Số máy: <strong className="font-mono">{String(fields.scannedEngine)}</strong></div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div>
          <label className={labelClass} htmlFor="quote-product">Sản phẩm bảo hiểm</label>
          <select id="quote-product" value={productType} onChange={(event) => changeProduct(event.target.value as QuoteProductType)} className={selectClass}>
            {productOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="quote-plan">Mức bảo vệ</label>
          <select id="quote-plan" value={plan} onChange={(event) => changePlan(event.target.value as QuoteInput["plan"])} className={selectClass}>
            {planOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        {productType === "auto" && (
          <>
            <div>
              <label className={labelClass} htmlFor="vehicle-type">Loại xe</label>
              <select id="vehicle-type" value={fieldValue(fields, "vehicleType")} onChange={(event) => updateField("vehicleType", event.target.value)} className={selectClass}>
                <option value="personal">Xe cá nhân</option>
                <option value="commercial">Xe kinh doanh chở người</option>
                <option value="pickup">Xe bán tải/chở hàng</option>
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="vehicle-value">Giá trị xe (VNĐ)</label>
                <input id="vehicle-value" type="number" min="1" value={fieldValue(fields, "vehicleValue")} onChange={(event) => updateField("vehicleValue", event.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="vehicle-age">Tuổi xe</label>
                <input id="vehicle-age" type="number" min="0" max="40" value={fieldValue(fields, "vehicleAge")} onChange={(event) => updateField("vehicleAge", event.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="deductible">Mức miễn thường</label>
              <select id="deductible" value={fieldValue(fields, "deductible")} onChange={(event) => updateField("deductible", event.target.value)} className={selectClass}>
                <option value="none">Không miễn thường</option>
                <option value="five">5 triệu đồng</option>
                <option value="ten">10 triệu đồng</option>
              </select>
            </div>
          </>
        )}

        {productType === "motorbike" && (
          <div>
            <label className={labelClass} htmlFor="motorbike-type">Loại xe</label>
            <select id="motorbike-type" value={fieldValue(fields, "motorbikeType")} onChange={(event) => updateField("motorbikeType", event.target.value)} className={selectClass}>
              <option value="standard">Xe máy phổ thông</option>
              <option value="electric">Xe máy điện</option>
              <option value="tricycle">Xe ba bánh</option>
            </select>
          </div>
        )}

        {productType === "health" && (
          <>
            <div>
              <label className={labelClass} htmlFor="health-age">Tuổi người được bảo hiểm</label>
              <input id="health-age" type="number" min="1" max="80" value={fieldValue(fields, "age")} onChange={(event) => updateField("age", event.target.value)} className={inputClass} />
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                ["dental", "Nha khoa"],
                ["maternity", "Thai sản"],
                ["accident", "Tai nạn"],
              ].map(([name, label]) => (
                <label key={name} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-[11px] border border-[#cce0f5] px-3 text-[13px] text-[#3b5878]">
                  <input type="checkbox" checked={Boolean(fields[name])} onChange={(event) => updateField(name, event.target.checked)} className="h-4 w-4 accent-[#0066cc]" />
                  {label}
                </label>
              ))}
            </div>
          </>
        )}

        {productType === "travel" && (
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass} htmlFor="travel-region">Khu vực</label>
              <select id="travel-region" value={fieldValue(fields, "region")} onChange={(event) => updateField("region", event.target.value)} className={selectClass}>
                <option value="domestic">Trong nước</option>
                <option value="asia">Châu Á</option>
                <option value="global">Toàn cầu</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="travel-days">Số ngày</label>
              <input id="travel-days" type="number" min="1" max="365" value={fieldValue(fields, "days")} onChange={(event) => updateField("days", event.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="travel-age">Tuổi</label>
              <input id="travel-age" type="number" min="1" max="100" value={fieldValue(fields, "age")} onChange={(event) => updateField("age", event.target.value)} className={inputClass} />
            </div>
          </div>
        )}

        {productType === "home" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="property-value">Giá trị tài sản (VNĐ)</label>
              <input id="property-value" type="number" min="1" value={fieldValue(fields, "propertyValue")} onChange={(event) => updateField("propertyValue", event.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="property-type">Loại nhà</label>
              <select id="property-type" value={fieldValue(fields, "propertyType")} onChange={(event) => updateField("propertyType", event.target.value)} className={selectClass}>
                <option value="apartment">Căn hộ</option>
                <option value="townhouse">Nhà phố</option>
                <option value="villa">Biệt thự</option>
              </select>
            </div>
          </div>
        )}

        {productType === "life" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="life-coverage">Số tiền bảo vệ (VNĐ)</label>
                <input id="life-coverage" type="number" min="1" value={fieldValue(fields, "coverage")} onChange={(event) => updateField("coverage", event.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="life-age">Tuổi</label>
                <input id="life-age" type="number" min="1" max="80" value={fieldValue(fields, "age")} onChange={(event) => updateField("age", event.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="life-term">Thời hạn bảo vệ</label>
              <select id="life-term" value={fieldValue(fields, "term")} onChange={(event) => updateField("term", event.target.value)} className={selectClass}>
                <option value="ten">10 năm</option>
                <option value="fifteen">15 năm</option>
                <option value="twenty">20 năm</option>
              </select>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                ["accident", "Thêm quyền lợi tai nạn"],
                ["critical", "Thêm quyền lợi bệnh đặc biệt"],
              ].map(([name, label]) => (
                <label key={name} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-[11px] border border-[#cce0f5] px-3 text-[13px] text-[#3b5878]">
                  <input type="checkbox" checked={Boolean(fields[name])} onChange={(event) => updateField(name, event.target.checked)} className="h-4 w-4 accent-[#0066cc]" />
                  {label}
                </label>
              ))}
            </div>
          </>
        )}

        {productType === "business" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="asset-value">Giá trị tài sản/lô hàng (VNĐ)</label>
              <input id="asset-value" type="number" min="1" value={fieldValue(fields, "assetValue")} onChange={(event) => updateField("assetValue", event.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="risk-type">Nhóm rủi ro</label>
              <select id="risk-type" value={fieldValue(fields, "riskType")} onChange={(event) => updateField("riskType", event.target.value)} className={selectClass}>
                <option value="office">Văn phòng/dịch vụ</option>
                <option value="shop">Cửa hàng/thương mại</option>
                <option value="warehouse">Kho hàng/logistics</option>
                <option value="factory">Nhà xưởng/sản xuất</option>
              </select>
            </div>
          </div>
        )}

        <button type="button" onClick={calculate} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0066cc] px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition hover:bg-[#0052b3] active:scale-[0.98]">
          <Icon name="calculator" size={18} />
          Tính phí ngay
        </button>
      </div>

      {result && (
        <QuoteResultView
          result={result}
          showPlanDetails={showPlanDetails}
          onTogglePlanDetails={() => setShowPlanDetails((current) => !current)}
          onShowCertificate={handleOpenSampleCert}
          plan={selectedPlan}
        />
      )}

      {/* OCR Scanner Modal */}
      <OcrScannerModal
        isOpen={isOcrOpen}
        onClose={() => setIsOcrOpen(false)}
        onApply={handleOcrApply}
      />

      {/* e-Certificate Card Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn overflow-y-auto">
          <div className="my-8 w-full max-w-2xl">
            <ECertificateCard cert={activeCert} onClose={() => setActiveCert(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function QuoteResultView({
  result,
  showPlanDetails,
  onTogglePlanDetails,
  onShowCertificate,
  plan,
}: {
  result: QuoteResult;
  showPlanDetails: boolean;
  onTogglePlanDetails: () => void;
  onShowCertificate: () => void;
  plan: (typeof quotePlans)[QuoteProductType]["basic"];
}) {
  return (
    <div className="mt-6 border-t border-dashed border-[#cce0f5] pt-6">
      <p className="text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4a6785]">Mức phí bảo hiểm ước tính</p>
      <p className="mt-1 text-center text-[34px] font-bold tracking-tight text-[#0066cc]">
        {formatVnd(result.totalPremium)}
        <span className="text-[15px] font-normal text-[#0b2341]"> / kỳ</span>
      </p>
      <p className="mt-2 text-center text-[12px] leading-5 text-[#4a6785]">Đã bao gồm VAT 10%. Kết quả chỉ mang tính minh họa.</p>
      <div className="mt-4 space-y-2 rounded-[12px] bg-[#f4f8fd] p-4 text-[13px] text-[#3b5878]">
        <div className="flex justify-between gap-4"><span>Phí trước VAT</span><strong className="text-[#0b2341]">{formatVnd(result.preTaxPremium)}</strong></div>
        <div className="flex justify-between gap-4"><span>VAT (10%)</span><strong className="text-[#0b2341]">{formatVnd(result.vatAmount)}</strong></div>
        <div className="flex justify-between gap-4 border-t border-[#cce0f5] pt-2 font-bold text-[#0066cc]"><span>Tổng phí dự kiến</span><strong>{formatVnd(result.totalPremium)}</strong></div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={onTogglePlanDetails} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0052b3]">
          {showPlanDetails ? "Ẩn chi tiết gói" : "Xem bảng giá"}
          <Icon name={showPlanDetails ? "close" : "arrow-right"} size={15} />
        </button>
        <button type="button" onClick={onShowCertificate} className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-600 bg-emerald-50 px-4 py-2.5 text-[14px] font-semibold text-emerald-800 hover:bg-emerald-100 transition">
          <Icon name="shield" size={15} className="text-emerald-600" />
          <span>Giấy chứng nhận (e-Cert)</span>
        </button>
      </div>
      {showPlanDetails && (
        <div className="mt-4 rounded-[12px] border border-[#cce0f5] bg-white p-4 text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0066cc]">CHI TIẾT GÓI {plan.name.toUpperCase()}</p>
          <p className="mt-2 text-[15px] font-bold text-[#0b2341]">{plan.summary}</p>
          <ul className="mt-3 space-y-2 text-[13px] leading-5 text-[#4a6785]">
            {plan.benefits.map((benefit) => <li key={benefit} className="flex gap-2"><Icon name="check" size={15} className="mt-0.5 shrink-0 text-[#0066cc]" /><span>{benefit}</span></li>)}
          </ul>
          <p className="mt-3 text-[12px] leading-5 text-[#6b84a5]"><strong className="text-[#0b2341]">Phù hợp:</strong> {plan.bestFor}</p>
        </div>
      )}
    </div>
  );
}

