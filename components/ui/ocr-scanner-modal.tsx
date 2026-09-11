"use client";

import { useState } from "react";
import { processOcrDocument, type OcrResult } from "../../lib/ocr";
import { Icon } from "./icon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: OcrResult) => void;
};

/** Render a value or a placeholder dash when the OCR couldn't extract it */
function Val({ value, mono }: { value?: string; mono?: boolean }) {
  if (!value || value.trim().length === 0) {
    return <span className="text-[#6b84a5] italic">—</span>;
  }
  return <strong className={mono ? "font-mono" : ""}>{value}</strong>;
}

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

  const hasUsefulData = ocrData && ocrData.fieldsFound > 0;
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
              <h3 className="text-lg font-bold text-[#0b2341]">OCR Scanner</h3>
              <p className="text-xs text-[#4a6785]">Scan Cà vẹt xe / CCCD &mdash; Tự động bóc tách thông tin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-[#4a6785] hover:bg-[#f4f8fd] hover:text-[#0b2341]"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-4">
          {!previewUrl ? (
            <label className="flex flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#cce0f5] bg-[#f4f8fd] p-8 text-center cursor-pointer hover:border-[#0066cc] transition">
              <Icon name="shield" size={40} className="text-[#0066cc] mb-2" />
              <p className="text-sm font-bold text-[#0b2341]">Tải ảnh Giấy đăng ký xe (Cà vẹt) hoặc CCCD</p>
              <p className="mt-1 text-xs text-[#4a6785]">Hỗ trợ định dạng PNG, JPG, WEBP (Tối đa 10MB)</p>
              <span className="mt-4 rounded-full bg-[#0066cc] px-5 py-2 text-xs font-semibold text-white shadow-sm">
                Chọn tệp ảnh
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-[16px] border border-[#cce0f5] bg-[#07192f] p-2 aspect-[16/9] flex items-center justify-center">
              <img src={previewUrl} alt="Preview" className="h-full w-full object-contain rounded-[12px]" />

              {/* Laser Scanning Animation */}
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

          {/* Parsed Result Display */}
          {ocrData && (
            <div className="rounded-[16px] border border-[#cce0f5] bg-[#eef6ff] p-4 text-xs space-y-3">
              {/* Confidence header */}
              <div className="flex items-center justify-between border-b border-[#cce0f5] pb-2">
                <span className={`font-bold ${confidencePct > 30 ? "text-[#0066cc]" : "text-[#f5ab19]"}`}>
                  {hasUsefulData ? (
                    <>Trích xuất {ocrData.fieldsFound}/{ocrData.fieldsTotal} trường ({confidencePct}%)</>
                  ) : (
                    <>Không nhận dạng được thông tin cà vẹt trong ảnh này</>
                  )}
                </span>
                {ocrData.licensePlate && (
                  <span className="font-mono font-extrabold text-[#0b2341]">{ocrData.licensePlate}</span>
                )}
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[#0b2341]">
                <div><span className="text-[#4a6785]">Biển số:</span> <Val value={ocrData.licensePlate} mono /></div>
                <div><span className="text-[#4a6785]">Chủ xe:</span> <Val value={ocrData.ownerName} /></div>
                <div><span className="text-[#4a6785]">Số khung:</span> <Val value={ocrData.chassisNumber} mono /></div>
                <div><span className="text-[#4a6785]">Số máy:</span> <Val value={ocrData.engineNumber} mono /></div>
                <div><span className="text-[#4a6785]">Nhãn hiệu:</span> <Val value={ocrData.vehicleBrand} /></div>
                <div><span className="text-[#4a6785]">Dòng xe:</span> <Val value={ocrData.vehicleModel} /></div>
                <div><span className="text-[#4a6785]">Màu sơn:</span> <Val value={ocrData.vehicleColor} /></div>
                <div><span className="text-[#4a6785]">Số chỗ:</span> <Val value={ocrData.capacitySeats} /></div>
                <div><span className="text-[#4a6785]">Dung tích:</span> <Val value={ocrData.engineCapacity ? `${ocrData.engineCapacity} cc` : ""} /></div>
                <div><span className="text-[#4a6785]">Đăng ký:</span> <Val value={ocrData.firstRegistrationDate} /></div>
                {ocrData.address && (
                  <div className="col-span-2"><span className="text-[#4a6785]">Địa chỉ:</span> <Val value={ocrData.address} /></div>
                )}
              </div>

              {/* Raw text toggle */}
              <div className="border-t border-[#cce0f5] pt-2">
                <button
                  onClick={() => setShowRawText(!showRawText)}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0066cc] hover:text-[#0052b3] transition"
                >
                  <span className={`inline-block transition-transform ${showRawText ? "rotate-90" : ""}`}>
                    <Icon name="arrow-right" size={12} />
                  </span>
                  <span>{showRawText ? "Ẩn" : "Xem"} raw text OCR ({ocrData.rawExtractedText.length} ký tự)</span>
                </button>
                {showRawText && (
                  <pre className="mt-2 max-h-40 overflow-y-auto rounded-xl bg-[#07192f] p-3 text-[10px] leading-relaxed text-[#d0e2f7] font-mono whitespace-pre-wrap break-all">
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

          {ocrData && hasUsefulData && (
            <button
              onClick={handleApplyData}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0066cc] py-3 text-xs font-bold text-white shadow-md hover:bg-[#0052b3]"
            >
              <Icon name="check" size={16} />
              <span>Áp dụng thông tin này vào bản tính phí</span>
            </button>
          )}

          {ocrData && !hasUsefulData && (
            <div className="flex w-full flex-col items-center gap-2 text-center">
              <p className="text-xs text-[#4a6785]">
                Không trích xuất được dữ liệu. Vui lòng thử ảnh rõ nét hơn hoặc chụp lại.
              </p>
              <button
                onClick={resetModal}
                className="rounded-full bg-[#0066cc] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0052b3]"
              >
                Thử lại với ảnh khác
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
