"use client";

import { useState } from "react";
import { processOcrDocument, type OcrResult } from "../../lib/ocr";
import { saveOcrResult } from "../../lib/ocr-store";
import { Icon } from "./icon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: OcrResult) => void;
};

export function OcrScannerModal({ isOpen, onClose, onApply }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrData, setOcrData] = useState<OcrResult | null>(null);
  const [showRawText, setShowRawText] = useState(false);

  if (!isOpen) return null;

  async function processSelectedFile(selectedFile: File) {
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setOcrData(null);
    setShowRawText(false);
    setIsScanning(true);
    try {
      const result = await processOcrDocument(selectedFile);
      setOcrData(result);
      saveOcrResult(result);
    } finally {
      setIsScanning(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processSelectedFile(selectedFile);
    }
  }

  async function startScan() {
    if (file) {
      await processSelectedFile(file);
    }
  }

  function handleFieldChange(field: keyof OcrResult, value: string) {
    if (!ocrData) return;
    const updated = { ...ocrData, [field]: value };

    const parseableFields = [
      updated.licensePlate,
      updated.ownerName,
      updated.address,
      updated.vehicleBrand,
      updated.vehicleModel,
      updated.vehicleColor,
      updated.engineNumber,
      updated.chassisNumber,
      updated.engineCapacity,
      updated.capacitySeats,
      updated.firstRegistrationDate,
    ];
    updated.fieldsFound = parseableFields.filter(
      (f) => f && String(f).trim().length > 0
    ).length;
    updated.confidenceScore =
      Math.round((updated.fieldsFound / updated.fieldsTotal) * 100) / 100;

    setOcrData(updated);
    saveOcrResult(updated);
  }

  function handleApplyData() {
    if (ocrData) {
      onApply(ocrData);
      onClose();
    }
  }

  function resetModal() {
    setPreviewUrl(null);
    setFile(null);
    setOcrData(null);
    setShowRawText(false);
  }

  const confidencePct = ocrData ? Math.round(ocrData.confidenceScore * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[20px] bg-white p-6 shadow-2xl border border-[#cce0f5]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eef6ff] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0066cc]/10 text-[#0066cc]">
              <Icon name="sparkles" size={18} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#0b2341]">OCR Scanner Cà Vẹt Xe</h3>
              <p className="text-xs text-[#4a6785]">
                Tự động quét &amp; hỗ trợ gõ chỉnh sửa trực tiếp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-[#4a6785] hover:bg-[#f4f8fd] hover:text-[#0b2341]"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="mt-5 space-y-4">
          {!previewUrl ? (
            <label className="flex flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#cce0f5] bg-[#f4f8fd] p-8 text-center cursor-pointer hover:border-[#0066cc] transition">
              <Icon name="shield" size={40} className="text-[#0066cc] mb-2" />
              <p className="text-sm font-bold text-[#0b2341]">
                Tải ảnh Giấy đăng ký xe (Cà vẹt) hoặc CCCD
              </p>
              <p className="mt-1 text-xs text-[#4a6785]">
                Hỗ trợ định dạng PNG, JPG, WEBP (Tối đa 10MB)
              </p>
              <span className="mt-4 rounded-full bg-[#0066cc] px-5 py-2 text-xs font-semibold text-white shadow-sm">
                Chọn tệp ảnh
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-[16px] border border-[#cce0f5] bg-[#07192f] p-2 aspect-[16/9] flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-contain rounded-[12px]"
              />

              {/* Laser Scan Animation */}
              {isScanning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                  <div className="w-full h-1 bg-[#f5ab19] shadow-[0_0_15px_#f5ab19] animate-pulse"></div>
                  <span className="mt-4 rounded-full bg-[#07192f]/90 px-4 py-1.5 font-mono text-xs font-bold text-white border border-[#0066cc]">
                    Bảo An Tây Nguyên đang phân tích...
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Results + Editable Input Grid */}
          {ocrData && (
            <div className="rounded-[16px] border border-[#cce0f5] bg-[#eef6ff] p-4 text-xs space-y-3">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between border-b border-[#cce0f5] pb-2">
                <span className="font-bold text-[#0066cc]">
                  Trích xuất {ocrData.fieldsFound}/{ocrData.fieldsTotal} trường ({confidencePct}%)
                </span>
                <span className="text-[11px] font-semibold text-[#4a6785]">
                  ✏️ Bạn có thể gõ sửa trực tiếp bên dưới
                </span>
              </div>

              {/* Editable Input Grid */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[#0b2341]">
                {/* Biển số xe */}
                <div>
                  <label className="text-[#4a6785] font-bold block mb-1">
                    Biển số xe: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={ocrData.licensePlate}
                    onChange={(e) => handleFieldChange("licensePlate", e.target.value)}
                    placeholder="VD: 47A-349.54"
                    className={`w-full rounded-xl border px-3 py-1.5 text-xs font-mono font-bold text-[#0b2341] outline-none transition ${
                      !ocrData.licensePlate
                        ? "border-[#f5ab19] bg-[#fffdf5] focus:border-[#0066cc]"
                        : "border-[#cce0f5] bg-white focus:border-[#0066cc]"
                    }`}
                  />
                </div>

                {/* Tên chủ xe */}
                <div>
                  <label className="text-[#4a6785] font-bold block mb-1">
                    Chủ xe: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={ocrData.ownerName}
                    onChange={(e) => handleFieldChange("ownerName", e.target.value)}
                    placeholder="VD: TRẦN TRỌNG ANH"
                    className={`w-full rounded-xl border px-3 py-1.5 text-xs font-bold text-[#0b2341] outline-none transition ${
                      !ocrData.ownerName
                        ? "border-[#f5ab19] bg-[#fffdf5] focus:border-[#0066cc]"
                        : "border-[#cce0f5] bg-white focus:border-[#0066cc]"
                    }`}
                  />
                </div>

                {/* Số khung */}
                <div>
                  <label className="text-[#4a6785] font-bold block mb-1">Số khung:</label>
                  <input
                    type="text"
                    value={ocrData.chassisNumber}
                    onChange={(e) => handleFieldChange("chassisNumber", e.target.value)}
                    placeholder="VD: 3GS1L2466644"
                    className="w-full rounded-xl border border-[#cce0f5] bg-white px-3 py-1.5 text-xs font-mono font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>

                {/* Số máy */}
                <div>
                  <label className="text-[#4a6785] font-bold block mb-1">Số máy:</label>
                  <input
                    type="text"
                    value={ocrData.engineNumber}
                    onChange={(e) => handleFieldChange("engineNumber", e.target.value)}
                    placeholder="VD: 2GD0816053"
                    className="w-full rounded-xl border border-[#cce0f5] bg-white px-3 py-1.5 text-xs font-mono font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>

                {/* Nhãn hiệu */}
                <div>
                  <label className="text-[#4a6785] font-bold block mb-1">Nhãn hiệu:</label>
                  <input
                    type="text"
                    value={ocrData.vehicleBrand || ""}
                    onChange={(e) => handleFieldChange("vehicleBrand", e.target.value)}
                    placeholder="VD: TOYOTA"
                    className="w-full rounded-xl border border-[#cce0f5] bg-white px-3 py-1.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>

                {/* Dòng xe */}
                <div>
                  <label className="text-[#4a6785] font-bold block mb-1">Dòng xe:</label>
                  <input
                    type="text"
                    value={ocrData.vehicleModel || ""}
                    onChange={(e) => handleFieldChange("vehicleModel", e.target.value)}
                    placeholder="VD: FORTUNER"
                    className="w-full rounded-xl border border-[#cce0f5] bg-white px-3 py-1.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>

                {/* Màu sơn */}
                <div>
                  <label className="text-[#4a6785] font-bold block mb-1">Màu sơn:</label>
                  <input
                    type="text"
                    value={ocrData.vehicleColor || ""}
                    onChange={(e) => handleFieldChange("vehicleColor", e.target.value)}
                    placeholder="VD: Bạc"
                    className="w-full rounded-xl border border-[#cce0f5] bg-white px-3 py-1.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>

                {/* Số chỗ ngồi */}
                <div>
                  <label className="text-[#4a6785] font-bold block mb-1">
                    Số chỗ ngồi: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={ocrData.capacitySeats || ""}
                    onChange={(e) => handleFieldChange("capacitySeats", e.target.value)}
                    placeholder="VD: 5 chỗ hoặc 7 chỗ"
                    className={`w-full rounded-xl border px-3 py-1.5 text-xs font-bold text-[#0b2341] outline-none transition ${
                      !ocrData.capacitySeats
                        ? "border-[#f5ab19] bg-[#fffdf5] focus:border-[#0066cc]"
                        : "border-[#cce0f5] bg-white focus:border-[#0066cc]"
                    }`}
                  />
                </div>

                {/* Dung tích */}
                <div>
                  <label className="text-[#4a6785] font-bold block mb-1">Dung tích:</label>
                  <input
                    type="text"
                    value={ocrData.engineCapacity || ""}
                    onChange={(e) => handleFieldChange("engineCapacity", e.target.value)}
                    placeholder="VD: 2393 cc"
                    className="w-full rounded-xl border border-[#cce0f5] bg-white px-3 py-1.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>

                {/* Ngày đăng ký */}
                <div>
                  <label className="text-[#4a6785] font-bold block mb-1">Ngày đăng ký:</label>
                  <input
                    type="text"
                    value={ocrData.firstRegistrationDate || ""}
                    onChange={(e) => handleFieldChange("firstRegistrationDate", e.target.value)}
                    placeholder="VD: 12/08/2020"
                    className="w-full rounded-xl border border-[#cce0f5] bg-white px-3 py-1.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>

                {/* Địa chỉ */}
                <div className="col-span-2">
                  <label className="text-[#4a6785] font-bold block mb-1">Địa chỉ chủ xe:</label>
                  <input
                    type="text"
                    value={ocrData.address || ""}
                    onChange={(e) => handleFieldChange("address", e.target.value)}
                    placeholder="VD: Thôn 3, Ea Tiêu, Cư Kuin..."
                    className="w-full rounded-xl border border-[#cce0f5] bg-white px-3 py-1.5 text-xs font-bold text-[#0b2341] outline-none focus:border-[#0066cc]"
                  />
                </div>
              </div>

              {/* Raw text toggle */}
              <div className="border-t border-[#cce0f5] pt-2">
                <button
                  onClick={() => setShowRawText(!showRawText)}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0066cc] hover:text-[#0052b3] transition"
                >
                  <span
                    className={`inline-block transition-transform ${
                      showRawText ? "rotate-90" : ""
                    }`}
                  >
                    <Icon name="arrow-right" size={12} />
                  </span>
                  <span>
                    {showRawText ? "Ẩn" : "Xem"} raw text OCR ({ocrData.rawExtractedText.length} ký tự)
                  </span>
                </button>
                {showRawText && (
                  <pre className="mt-2 max-h-36 overflow-y-auto rounded-xl bg-[#07192f] p-3 text-[10px] leading-relaxed text-[#d0e2f7] font-mono whitespace-pre-wrap break-all">
                    {ocrData.rawExtractedText || "(Không có text nào được trích xuất)"}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#eef6ff] pt-4">
          {previewUrl && (
            <button
              onClick={resetModal}
              className="rounded-full px-4 py-2 text-xs font-semibold text-[#4a6785] hover:bg-[#f4f8fd]"
            >
              Đổi ảnh khác
            </button>
          )}

          {previewUrl && !ocrData && (
            <button
              onClick={startScan}
              disabled={isScanning}
              className="flex items-center gap-2 rounded-full bg-[#0066cc] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0052b3]"
            >
              <Icon name="sparkles" size={14} />
              <span>{isScanning ? "Đang quét..." : "Phân tích OCR ngay"}</span>
            </button>
          )}

          {ocrData && (
            <button
              onClick={handleApplyData}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0066cc] py-3 text-xs font-bold text-white shadow-md hover:bg-[#0052b3]"
            >
              <Icon name="check" size={16} />
              <span>Áp dụng thông tin này vào bản tính phí</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
