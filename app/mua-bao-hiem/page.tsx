"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { insuranceProducts } from "../../config/products";
import {
  PurchaseForms,
  defaultFormData,
  type PurchaseFormData,
} from "../../components/purchase/purchase-forms";
import { OcrScannerModal } from "../../components/ui/ocr-scanner-modal";
import {
  getSavedOcrResult,
  subscribeOcrResult,
} from "../../lib/ocr-store";
import type { OcrResult } from "../../lib/ocr";
import { Icon } from "../../components/ui/icon";
import Link from "next/link";

function MuaBaoHiemContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "bao-hiem-o-to";

  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [formData, setFormData] = useState<PurchaseFormData>(defaultFormData);
  const [ocrData, setOcrData] = useState<OcrResult | null>(null);
  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);

  // Sync initial product if param changes
  useEffect(() => {
    const prodParam = searchParams.get("product");
    if (prodParam) {
      setSelectedProduct(prodParam);
    }
  }, [searchParams]);

  // Sync saved OCR data on mount and on subscribe event
  useEffect(() => {
    const saved = getSavedOcrResult();
    if (saved) {
      applyOcrToForm(saved);
    }

    const unsubscribe = subscribeOcrResult((data) => {
      if (data) {
        applyOcrToForm(data);
      }
    });

    return () => unsubscribe();
  }, []);

  function applyOcrToForm(data: OcrResult) {
    setOcrData(data);
    setFormData((prev) => ({
      ...prev,
      licensePlate: data.licensePlate || prev.licensePlate,
      ownerName: data.ownerName || prev.ownerName,
      chassisNumber: data.chassisNumber || prev.chassisNumber,
      engineNumber: data.engineNumber || prev.engineNumber,
      vehicleBrand: data.vehicleBrand || prev.vehicleBrand,
      vehicleModel: data.vehicleModel || prev.vehicleModel,
      address: data.address || prev.address,
      capacitySeats: data.capacitySeats || prev.capacitySeats,
    }));
  }

  // Real-time price calculation logic
  function calculateTotalFee(): { original: number; discount: number; final: number } {
    let base = 481000;

    if (selectedProduct === "bao-hiem-o-to") {
      if (formData.capacitySeats.includes("7")) base = 873400;
      else if (formData.capacitySeats.includes("16")) base = 1380000;
      else if (formData.capacitySeats.includes("29")) base = 2100000;
      else if (formData.capacitySeats.includes("45")) base = 3500000;
      else base = 481000;

      if (formData.vehicleUsage === "commercial") base = Math.round(base * 1.6);
      if (formData.includePhysicalDamage) base += 5200000;
    } else if (selectedProduct === "bao-hiem-xe-may") {
      base = formData.motorbikeType === "below50cc" ? 60000 : 66000;
    } else if (selectedProduct === "bao-hiem-suc-khoe") {
      if (formData.healthTier === "bronze") base = 1200000;
      else if (formData.healthTier === "silver") base = 2500000;
      else if (formData.healthTier === "gold") base = 4200000;
      else base = 7500000;

      if (formData.outpatientAddon) base += 1100000;
      if (formData.dentalAddon) base += 600000;
    } else if (selectedProduct === "bao-hiem-tai-nan") {
      base = parseInt(formData.coverageLimit, 10) * 0.0028;
    } else if (selectedProduct === "bao-hiem-du-lich") {
      base = formData.travelScope === "international" ? 450000 : 180000;
    } else {
      base = 1500000;
    }

    const discountPct = formData.appliedDiscountPct / 100;
    const discount = Math.round(base * discountPct);
    const final = Math.max(0, base - discount);

    return { original: base, discount, final };
  }

  const fees = calculateTotalFee();

  function handleSubmitPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!agreedTerms) {
      alert("Vui lòng xác nhận đồng ý với điều khoản bảo hiểm trước khi tiếp tục.");
      return;
    }
    setPaymentSuccessModal(true);
  }

  return (
    <main className="min-h-screen bg-[#f4f8fd] py-8 md:py-12">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Page Breadcrumb & Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4a6785]">
            <Link href="/" className="hover:text-[#0066cc]">Trang chủ</Link>
            <span>&rsaquo;</span>
            <span className="text-[#0066cc]">Mua bảo hiểm trực tuyến BIC</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#07192f] sm:text-3xl">
            Cổng Mua &amp; Cấp Giấy Chứng Nhận Bảo Hiểm Điện Tử BIC 24/7
          </h1>
        </div>

        {/* Product Navigation Pills */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {insuranceProducts.map(([slug, name]) => (
            <button
              key={slug}
              onClick={() => setSelectedProduct(slug)}
              className={`flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition ${
                selectedProduct === slug
                  ? "bg-[#0066cc] text-white shadow-md"
                  : "bg-white text-[#4a6785] hover:bg-[#eef6ff] hover:text-[#0b2341] border border-[#cce0f5]"
              }`}
            >
              <Icon
                name={
                  slug.includes("o-to")
                    ? "car"
                    : slug.includes("xe-may")
                    ? "phone"
                    : slug.includes("suc-khoe")
                    ? "sparkles"
                    : "shield"
                }
                size={16}
              />
              <span>{name}</span>
            </button>
          ))}
        </div>

        {/* 2-COLUMN MAIN LAYOUT */}
        <form onSubmit={handleSubmitPayment} className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT/MIDDLE MAIN FORM */}
          <div>
            <PurchaseForms
              productSlug={selectedProduct}
              formData={formData}
              setFormData={setFormData}
              ocrData={ocrData}
              onOpenOcrModal={() => setIsOcrModalOpen(true)}
            />
          </div>

          {/* RIGHT COLUMN: STICKY ORDER SUMMARY & PREMIUM BREAKDOWN */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 shadow-xl space-y-5">
              {/* Product Badge */}
              <div className="flex items-center justify-between border-b border-[#eef6ff] pb-3">
                <span className="rounded-full bg-[#0066cc]/10 px-3 py-1 text-xs font-extrabold text-[#0066cc]">
                  PHÍ BẢO HIỂM CHÍNH HÃNG
                </span>
                <span className="text-xs font-bold text-[#4a6785]">
                  Đã gồm VAT
                </span>
              </div>

              {/* Price Display */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-[#4a6785] line-through">
                    {fees.original.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-3xl font-black tracking-tight text-[#0066cc]">
                    {fees.final.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-xs font-semibold text-[#4a6785]">/năm</span>
                </div>

                {/* Online Discount Banner */}
                <div className="rounded-xl bg-[#fffdf5] border border-[#f5ab19]/40 p-3 text-xs font-bold text-[#d9940d] flex items-center justify-between">
                  <span>🎉 Tiết kiệm {fees.discount.toLocaleString("vi-VN")}đ</span>
                  <span className="rounded-lg bg-[#f5ab19] px-2 py-0.5 text-[11px] font-extrabold text-white">
                    -30% ONLINE
                  </span>
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.couponCode}
                  onChange={(e) => setFormData((p) => ({ ...p, couponCode: e.target.value.toUpperCase() }))}
                  placeholder="Nhập mã ưu đãi (nếu có)"
                  className="flex-1 rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2 text-xs font-mono font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                />
                <button
                  type="button"
                  onClick={() => alert("Đã tự động áp dụng ưu đãi online -30% tốt nhất!")}
                  className="rounded-xl bg-[#eef6ff] px-4 py-2 text-xs font-bold text-[#0066cc] border border-[#cce0f5] hover:bg-[#0066cc] hover:text-white transition shrink-0"
                >
                  Áp dụng
                </button>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-2.5 text-xs text-[#0b2341] border-t border-b border-[#eef6ff] py-4">
                <li className="flex items-center gap-2 font-medium">
                  <Icon name="check" size={16} className="text-[#0066cc] shrink-0" />
                  <span>Cấp giấy chứng nhận điện tử ngay sau thanh toán</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Icon name="shield" size={16} className="text-[#0066cc] shrink-0" />
                  <span>Sản phẩm bảo lãnh bởi BIC &mdash; Ngân hàng BIDV</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Icon name="award" size={16} className="text-[#0066cc] shrink-0" />
                  <span>Bắt buộc theo Nghị định 67/2023/NĐ-CP</span>
                </li>
                <li className="flex items-center gap-2 font-medium text-[#0066cc]">
                  <Icon name="phone" size={16} className="shrink-0" />
                  <span>Hỗ trợ 24/7 &mdash; <strong>0916 201 085</strong> (Hotline/Zalo)</span>
                </li>
              </ul>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-[#4a6785] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#cce0f5] text-[#0066cc]"
                />
                <span>
                  Tôi xác nhận thông tin trên là chính xác và đồng ý với{" "}
                  <strong className="text-[#0066cc] underline">điều khoản bảo hiểm BIC</strong> &amp; việc xử lý dữ liệu cá nhân để cấp giấy chứng nhận.
                </span>
              </label>

              {/* CTA Submit Button */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#0066cc] py-4 text-sm font-extrabold text-white shadow-lg shadow-[#0066cc]/20 hover:bg-[#0052b3] transition transform hover:-translate-y-0.5"
              >
                Tiến hành thanh toán ({fees.final.toLocaleString("vi-VN")}đ)
              </button>
            </div>
          </div>
        </form>

        {/* OCR Scanner Modal */}
        <OcrScannerModal
          isOpen={isOcrModalOpen}
          onClose={() => setIsOcrModalOpen(false)}
          onApply={(data) => applyOcrToForm(data)}
        />

        {/* PAYMENT SUCCESS MODAL */}
        {paymentSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl text-center space-y-4">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f4ea] text-[#137333]">
                <Icon name="check" size={32} />
              </span>
              <h3 className="text-xl font-extrabold text-[#07192f]">
                Hệ thống tiếp nhận đơn thành công!
              </h3>
              <p className="text-xs leading-relaxed text-[#4a6785]">
                Đơn đăng ký mua bảo hiểm của chủ xe <strong>{formData.ownerName || "Bảo An Tây Nguyên"}</strong> đã được ghi nhận. Giấy chứng nhận điện tử và mã thanh toán QR sẽ được gửi tới Zalo/SĐT <strong>{formData.phoneNumber}</strong> trong 2 phút.
              </p>
              <div className="rounded-2xl bg-[#f4f8fd] border border-[#cce0f5] p-3 text-xs font-mono font-bold text-[#0066cc]">
                Mã đơn: BIC-2026-BATN-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <button
                onClick={() => setPaymentSuccessModal(false)}
                className="w-full rounded-xl bg-[#0066cc] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#0052b3]"
              >
                Đóng &amp; Quay lại
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function MuaBaoHiemPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f8fd] flex items-center justify-center p-6 text-center">
          <div className="space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0066cc] border-t-transparent mx-auto"></div>
            <p className="text-sm font-semibold text-[#0b2341]">
              Đang tải Cổng mua bảo hiểm BIC...
            </p>
          </div>
        </div>
      }
    >
      <MuaBaoHiemContent />
    </Suspense>
  );
}
