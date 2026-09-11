"use client";

import type { OcrResult } from "../../lib/ocr";
import { Icon } from "../ui/icon";

export type PurchaseFormData = {
  // Common vehicle fields
  vehicleUsage: string;
  capacitySeats: string;
  licensePlate: string;
  chassisNumber: string;
  engineNumber: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufactureYear: string;
  motorbikeType: string;

  // Common contact fields
  ownerName: string;
  idCardNumber: string;
  phoneNumber: string;
  email: string;
  address: string;

  // Health / Personal Accident fields
  insuredName: string;
  birthDate: string;
  gender: string;
  healthTier: string;
  outpatientAddon: boolean;
  dentalAddon: boolean;
  maternityAddon: boolean;
  beneficiaryName: string;
  occupationGroup: string;
  coverageLimit: string;

  // Travel insurance fields
  travelScope: string;
  travelStartDate: string;
  travelEndDate: string;
  travelMembers: string;

  // Coupon / Discount
  couponCode: string;
  appliedDiscountPct: number;

  // Option TNDS / Physical damage
  includePhysicalDamage: boolean;
  voluntaryThirdParty: boolean;
};

export const defaultFormData: PurchaseFormData = {
  vehicleUsage: "personal",
  capacitySeats: "5 chỗ",
  licensePlate: "",
  chassisNumber: "",
  engineNumber: "",
  vehicleBrand: "",
  vehicleModel: "",
  manufactureYear: "2020",
  motorbikeType: "above50cc",

  ownerName: "",
  idCardNumber: "",
  phoneNumber: "0916201085",
  email: "",
  address: "",

  insuredName: "",
  birthDate: "1990-01-01",
  gender: "male",
  healthTier: "gold",
  outpatientAddon: false,
  dentalAddon: false,
  maternityAddon: false,
  beneficiaryName: "",
  occupationGroup: "group1",
  coverageLimit: "50000000",

  travelScope: "domestic",
  travelStartDate: "",
  travelEndDate: "",
  travelMembers: "1",

  couponCode: "",
  appliedDiscountPct: 30,

  includePhysicalDamage: false,
  voluntaryThirdParty: false,
};

type Props = {
  productSlug: string;
  formData: PurchaseFormData;
  setFormData: React.Dispatch<React.SetStateAction<PurchaseFormData>>;
  ocrData: OcrResult | null;
  onOpenOcrModal: () => void;
};

export function PurchaseForms({
  productSlug,
  formData,
  setFormData,
  ocrData,
  onOpenOcrModal,
}: Props) {
  function handleChange(field: keyof PurchaseFormData, value: unknown) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const isCar = productSlug === "bao-hiem-o-to";
  const isMotorbike = productSlug === "bao-hiem-xe-may";
  const isHealth = productSlug === "bao-hiem-suc-khoe";
  const isAccident = productSlug === "bao-hiem-tai-nan";
  const isTravel = productSlug === "bao-hiem-du-lich";
  const isLife = productSlug === "bao-hiem-nhan-tho";

  return (
    <div className="space-y-6">
      {/* ─── TOP OCR SCAN TRIGGER BANNER ─── */}
      {(isCar || isMotorbike) && (
        <div className="rounded-[20px] border-2 border-dashed border-[#0066cc]/40 bg-gradient-to-r from-[#eef6ff] via-[#f4f8fd] to-[#eef6ff] p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0066cc] text-white shadow-md">
                <Icon name="sparkles" size={24} />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-[#07192f]">
                  Chụp / Tải ảnh Giấy Đăng Ký Xe (Cà Vẹt) &mdash; AI Tự Điền
                </h3>
                <p className="mt-0.5 text-xs text-[#4a6785]">
                  AI tự động nhận diện Biển số, Số khung, Số máy, Số chỗ, Chủ xe
                  &amp; Địa chỉ rồi điền sẵn vào các ô bên dưới.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenOcrModal}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-[#0066cc] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#0052b3] transition"
            >
              <Icon name="shield" size={16} />
              <span>Quét Cà Vẹt Bằng AI</span>
            </button>
          </div>

          {ocrData && ocrData.fieldsFound > 0 && (
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#e6f4ea] px-3.5 py-2 text-xs font-semibold text-[#137333] border border-[#ceead6]">
              <Icon name="check" size={16} />
              <span>
                Đã nhận diện {ocrData.fieldsFound}/{ocrData.fieldsTotal} trường từ ảnh. Vui lòng kiểm tra lại thông tin bên dưới.
              </span>
            </div>
          )}
        </div>
      )}

      {/* ─── FORM ROW 1: SPECIFIC ITEM DETAILS ─── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* LEFT COLUMN: VEHICLE / ITEM DETAILS */}
        <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-[#07192f] border-b border-[#eef6ff] pb-3 flex items-center gap-2">
            <Icon name="car" size={18} className="text-[#0066cc]" />
            <span>
              {isCar
                ? "Thông tin phương tiện xe ô tô"
                : isMotorbike
                ? "Thông tin xe mô tô, xe máy"
                : isHealth
                ? "Thông tin người được bảo hiểm"
                : isAccident
                ? "Thông tin tham gia bảo hiểm tai nạn"
                : isTravel
                ? "Thông tin chuyến đi du lịch"
                : "Thông tin tư vấn bảo hiểm nhân thọ"}
            </span>
          </h3>

          {/* CAR FORM */}
          {isCar && (
            <>
              <div>
                <label className="text-xs font-bold text-[#0b2341] block mb-1">
                  Mục đích sử dụng <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.vehicleUsage}
                  onChange={(e) => handleChange("vehicleUsage", e.target.value)}
                  className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-semibold text-[#0b2341] outline-none focus:border-[#0066cc]"
                >
                  <option value="personal">Cá nhân / Không kinh doanh vận tải</option>
                  <option value="commercial">Kinh doanh vận tải (Taxi, Chở khách, Grab...)</option>
                  <option value="truck">Xe ô tô tải / Xe đầu kéo</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b2341] block mb-1">
                  Số chỗ ngồi <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.capacitySeats}
                  onChange={(e) => handleChange("capacitySeats", e.target.value)}
                  className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-semibold text-[#0b2341] outline-none focus:border-[#0066cc]"
                >
                  <option value="5 chỗ">Xe chở người dưới 6 chỗ (4 - 5 chỗ)</option>
                  <option value="7 chỗ">Xe chở người 6 - 11 chỗ (7 - 9 chỗ)</option>
                  <option value="16 chỗ">Xe chở người 12 - 24 chỗ (16 chỗ)</option>
                  <option value="29 chỗ">Xe chở người 25 - 30 chỗ (29 chỗ)</option>
                  <option value="45 chỗ">Xe chở người trên 30 chỗ (45 chỗ)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b2341] block mb-1">
                  Biển số xe <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.licensePlate}
                  onChange={(e) => handleChange("licensePlate", e.target.value.toUpperCase())}
                  placeholder="VD: 47A-349.54"
                  className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-mono font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#0b2341] block mb-1">
                    Số khung <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.chassisNumber}
                    onChange={(e) => handleChange("chassisNumber", e.target.value.toUpperCase())}
                    placeholder="Xem trên đăng ký / đăng kiểm"
                    className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-mono text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0b2341] block mb-1">
                    Số máy <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.engineNumber}
                    onChange={(e) => handleChange("engineNumber", e.target.value.toUpperCase())}
                    placeholder="Xem trên đăng ký / đăng kiểm"
                    className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-mono text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#0b2341] block mb-1">Hãng xe</label>
                  <input
                    type="text"
                    value={formData.vehicleBrand}
                    onChange={(e) => handleChange("vehicleBrand", e.target.value.toUpperCase())}
                    placeholder="VD: TOYOTA"
                    className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0b2341] block mb-1">Dòng xe</label>
                  <input
                    type="text"
                    value={formData.vehicleModel}
                    onChange={(e) => handleChange("vehicleModel", e.target.value.toUpperCase())}
                    placeholder="VD: FORTUNER"
                    className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>
              </div>
            </>
          )}

          {/* MOTORBIKE FORM */}
          {isMotorbike && (
            <>
              <div>
                <label className="text-xs font-bold text-[#0b2341] block mb-1">
                  Loại xe máy <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.motorbikeType}
                  onChange={(e) => handleChange("motorbikeType", e.target.value)}
                  className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-semibold text-[#0b2341] outline-none focus:border-[#0066cc]"
                >
                  <option value="above50cc">Xe mô tô, xe máy trên 50cc (Wave, SH, Exciter, Winner...)</option>
                  <option value="below50cc">Xe máy dưới 50cc / Xe máy điện</option>
                  <option value="threeWheels">Xe mô tô 3 bánh / Xe xích lô có động cơ</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b2341] block mb-1">
                  Biển số xe <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.licensePlate}
                  onChange={(e) => handleChange("licensePlate", e.target.value.toUpperCase())}
                  placeholder="VD: 47B1-678.90"
                  className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-mono font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#0b2341] block mb-1">Số khung</label>
                  <input
                    type="text"
                    value={formData.chassisNumber}
                    onChange={(e) => handleChange("chassisNumber", e.target.value.toUpperCase())}
                    placeholder="Xem trên cà vẹt xe"
                    className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-mono text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0b2341] block mb-1">Số máy</label>
                  <input
                    type="text"
                    value={formData.engineNumber}
                    onChange={(e) => handleChange("engineNumber", e.target.value.toUpperCase())}
                    placeholder="Xem trên cà vẹt xe"
                    className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-mono text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>
              </div>
            </>
          )}

          {/* HEALTH FORM */}
          {isHealth && (
            <>
              <div>
                <label className="text-xs font-bold text-[#0b2341] block mb-1">
                  Họ và tên Người được bảo hiểm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.insuredName}
                  onChange={(e) => handleChange("insuredName", e.target.value.toUpperCase())}
                  placeholder="VD: NGUYỄN VĂN A"
                  className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#0b2341] block mb-1">Ngày sinh</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleChange("birthDate", e.target.value)}
                    className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2 text-xs font-semibold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0b2341] block mb-1">Giới tính</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2 text-xs font-semibold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b2341] block mb-1">
                  Chương trình BIC Tâm An <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.healthTier}
                  onChange={(e) => handleChange("healthTier", e.target.value)}
                  className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-bold text-[#0066cc] outline-none focus:border-[#0066cc]"
                >
                  <option value="bronze">Gói Đồng (Quyền lợi Nội trú 100tr/năm)</option>
                  <option value="silver">Gói Bạc (Quyền lợi Nội trú 200tr/năm)</option>
                  <option value="gold">Gói Vàng (Quyền lợi Nội trú 300tr/năm) &mdash; Khuyên dùng</option>
                  <option value="diamond">Gói Kim Cương (Quyền lợi Nội trú 500tr/năm)</option>
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#eef6ff]">
                <span className="text-xs font-bold text-[#0b2341] block">Quyền lợi bổ sung lựa chọn:</span>
                <label className="flex items-center gap-2.5 text-xs text-[#4a6785] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.outpatientAddon}
                    onChange={(e) => handleChange("outpatientAddon", e.target.checked)}
                    className="h-4 w-4 rounded border-[#cce0f5] text-[#0066cc]"
                  />
                  <span>Điều trị Ngoại trú &amp; Thuốc tây theo đơn (Tối đa 10 - 20tr/năm)</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[#4a6785] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dentalAddon}
                    onChange={(e) => handleChange("dentalAddon", e.target.checked)}
                    className="h-4 w-4 rounded border-[#cce0f5] text-[#0066cc]"
                  />
                  <span>Chăm sóc Nha khoa (Trám răng, cạo vôi, nhổ răng sâu)</span>
                </label>
              </div>
            </>
          )}

          {/* ACCIDENT / TRAVEL / LIFE FALLBACK FORMS */}
          {(isAccident || isTravel || isLife) && (
            <>
              <div>
                <label className="text-xs font-bold text-[#0b2341] block mb-1">
                  Họ và tên người tham gia <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.insuredName || formData.ownerName}
                  onChange={(e) => {
                    handleChange("insuredName", e.target.value.toUpperCase());
                    handleChange("ownerName", e.target.value.toUpperCase());
                  }}
                  placeholder="VD: NGUYỄN VĂN A"
                  className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b2341] block mb-1">
                  Số tiền bảo hiểm lựa chọn
                </label>
                <select
                  value={formData.coverageLimit}
                  onChange={(e) => handleChange("coverageLimit", e.target.value)}
                  className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-bold text-[#0066cc] outline-none focus:border-[#0066cc]"
                >
                  <option value="20000000">Hạn mức 20.000.000 đ/người/vụ</option>
                  <option value="50000000">Hạn mức 50.000.000 đ/người/vụ</option>
                  <option value="100000000">Hạn mức 100.000.000 đ/người/vụ</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* RIGHT COLUMN: OWNER & CONTACT INFORMATION */}
        <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-[#07192f] border-b border-[#eef6ff] pb-3 flex items-center gap-2">
            <Icon name="shield" size={18} className="text-[#0066cc]" />
            <span>Chủ xe &amp; Thông tin liên hệ</span>
          </h3>

          <div>
            <label className="text-xs font-bold text-[#0b2341] block mb-1">
              Họ và tên chủ xe / Người đứng tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => handleChange("ownerName", e.target.value.toUpperCase())}
              placeholder="VD: TRẦN TRỌNG ANH"
              className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#0b2341] block mb-1">
              Số CCCD / CMND (12 chữ số) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.idCardNumber}
              onChange={(e) => handleChange("idCardNumber", e.target.value)}
              placeholder="Nhập 12 số CCCD"
              className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-mono font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#0b2341] block mb-1">
              Số điện thoại liên hệ <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder="VD: 0916 201 085"
              className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#0b2341] block mb-1">
              Email nhận Giấy chứng nhận điện tử <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="VD: email@vidu.com"
              className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-semibold text-[#0b2341] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#0b2341] block mb-1">
              Địa chỉ thường trú <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="VD: Thôn 3, Ea Tiêu, Cư Kuin, Đắk Lắk"
              className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-3.5 py-2.5 text-xs font-semibold text-[#0b2341] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div className="rounded-xl bg-[#fffdf5] border border-[#f5ab19]/30 p-3 text-[11px] leading-relaxed text-[#4a6785]">
            ⚠️ Kiểm tra kỹ <strong>số khung, số máy, CCCD &amp; địa chỉ</strong> &mdash; in trực tiếp trên giấy chứng nhận điện tử BIC, không sửa được sau khi cấp đơn.
          </div>
        </div>
      </div>
    </div>
  );
}
