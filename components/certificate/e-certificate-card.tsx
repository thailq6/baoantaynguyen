"use client";

import { useState } from "react";
import type { InsuranceCertificate } from "../../lib/certificate";
import { Icon } from "../ui/icon";

type Props = {
  cert: InsuranceCertificate;
  onClose?: () => void;
};

export function ECertificateCard({ cert, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    const link = cert.qrCodeData;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-[#cce0f5] bg-white shadow-2xl transition">
      {/* Top Header Bar */}
      <div className="relative bg-gradient-to-r from-[#07192f] via-[#0066cc] to-[#07192f] p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/image/baoan.jpg"
              alt="Bảo An Tây Nguyên Avatar"
              className="h-12 w-12 rounded-full border-2 border-white/80 object-cover shadow-md"
            />
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#f5ab19] uppercase">
                DỮ LIỆU MẪU BẢO AN TÂY NGUYÊN
              </span>
              <h2 className="text-[17px] font-extrabold tracking-tight text-white">
                THÔNG TIN CHỨNG NHẬN MINH HỌA
              </h2>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
              title="Đóng"
            >
              <Icon name="close" size={20} />
            </button>
          )}
        </div>

        {/* Verification Status Pill */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-md px-4 py-2 text-xs border border-white/20">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-emerald-300">DỮ LIỆU DEMO ĐỂ ĐỐI CHIẾU GIAO DIỆN</span>
          </div>
          <span className="font-mono text-white/90">Số: <strong>{cert.id}</strong></span>
        </div>
      </div>

      {/* Main Certificate Content Area */}
      <div className="p-6 md:p-8 space-y-6 bg-gradient-to-b from-[#f8fafc] to-white">
        {/* Important Alert Notice */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-900 flex items-start gap-3">
          <Icon name="shield" size={20} className="text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>Lưu ý:</strong> Đây là chứng nhận minh họa trong website, không có giá trị thay thế giấy chứng nhận do doanh nghiệp bảo hiểm phát hành.
          </div>
        </div>

        {/* Vehicle & Owner Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl border border-[#cce0f5] bg-white p-4 space-y-2.5 shadow-sm">
            <div className="text-[11px] font-bold text-[#0066cc] uppercase tracking-wider border-b border-[#eef6ff] pb-1.5 flex items-center gap-1.5">
              <Icon name="car" size={14} /> Thông tin phương tiện
            </div>
            <div>
              <span className="text-[#4a6785]">Biển kiểm soát:</span>
              <p className="text-base font-extrabold text-[#0b2341] font-mono tracking-tight">{cert.licensePlate}</p>
            </div>
            <div>
              <span className="text-[#4a6785]">Loại xe:</span>
              <p className="font-semibold text-[#0b2341]">{cert.vehicleType}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[#4a6785]">Số khung:</span>
                <p className="font-mono text-[11px] text-[#0b2341] truncate">{cert.chassisNumber}</p>
              </div>
              <div>
                <span className="text-[#4a6785]">Số máy:</span>
                <p className="font-mono text-[11px] text-[#0b2341] truncate">{cert.engineNumber}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#cce0f5] bg-white p-4 space-y-2.5 shadow-sm">
            <div className="text-[11px] font-bold text-[#0066cc] uppercase tracking-wider border-b border-[#eef6ff] pb-1.5 flex items-center gap-1.5">
              <Icon name="user" size={14} /> Chủ xe & Thời hạn bảo vệ
            </div>
            <div>
              <span className="text-[#4a6785]">Tên chủ xe:</span>
              <p className="text-sm font-bold text-[#0b2341]">{cert.ownerName}</p>
            </div>
            <div>
              <span className="text-[#4a6785]">Địa chỉ đăng ký:</span>
              <p className="text-[11px] text-[#0b2341] line-clamp-1">{cert.ownerAddress}</p>
            </div>
            <div>
              <span className="text-[#4a6785]">Thời hạn hiệu lực:</span>
              <p className="font-bold text-[#0066cc]">Từ {cert.startDate} đến {cert.endDate}</p>
            </div>
          </div>
        </div>

        {/* Coverage Limit & Premium details */}
        <div className="rounded-2xl border border-[#cce0f5] bg-[#eef6ff] p-4 text-xs space-y-2">
          <div className="flex justify-between items-center border-b border-[#cce0f5] pb-2">
            <span className="font-semibold text-[#4a6785]">Mức trách nhiệm bảo hiểm TNDS:</span>
            <strong className="text-[#0b2341]">{cert.coverageLimit}</strong>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="font-semibold text-[#4a6785]">Đơn vị phát hành & bảo lãnh:</span>
            <strong className="text-[#0066cc]">{cert.provider}</strong>
          </div>
        </div>

        {/* QR Code Verification Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-[#cce0f5] bg-white p-5 gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Visual SVG QR Code mock */}
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-white p-2 border-2 border-[#0066cc] shadow-md">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <rect x="0" y="0" width="100" height="100" fill="white" />
                {/* QR Finder patterns */}
                <rect x="5" y="5" width="25" height="25" fill="#07192f" />
                <rect x="9" y="9" width="17" height="17" fill="white" />
                <rect x="13" y="13" width="9" height="9" fill="#0066cc" />

                <rect x="70" y="5" width="25" height="25" fill="#07192f" />
                <rect x="74" y="9" width="17" height="17" fill="white" />
                <rect x="78" y="13" width="9" height="9" fill="#0066cc" />

                <rect x="5" y="70" width="25" height="25" fill="#07192f" />
                <rect x="9" y="74" width="17" height="17" fill="white" />
                <rect x="13" y="78" width="9" height="9" fill="#0066cc" />

                {/* Data blocks */}
                <rect x="35" y="10" width="8" height="8" fill="#07192f" />
                <rect x="50" y="10" width="8" height="8" fill="#07192f" />
                <rect x="35" y="25" width="15" height="8" fill="#0066cc" />
                <rect x="10" y="38" width="12" height="12" fill="#07192f" />
                <rect x="30" y="45" width="40" height="10" fill="#07192f" />
                <rect x="75" y="40" width="15" height="15" fill="#0066cc" />
                <rect x="40" y="65" width="20" height="8" fill="#07192f" />
                <rect x="65" y="75" width="25" height="15" fill="#07192f" />
              </svg>
            </div>
            <div>
              <span className="inline-block rounded-md bg-[#0066cc]/10 px-2 py-0.5 text-[10px] font-bold text-[#0066cc] mb-1">
                MÃ ĐỐI CHIẾU MẪU
              </span>
              <h4 className="text-sm font-bold text-[#0b2341]">Mã QR Minh Họa</h4>
              <p className="mt-0.5 text-xs text-[#4a6785] max-w-xs">
                Dùng để kiểm thử giao diện tra cứu; thông tin chính thức cần đối chiếu qua kênh phát hành của doanh nghiệp bảo hiểm.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0066cc] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#0052b3] transition"
            >
              <Icon name="download" size={15} />
              <span>In / Tải bản mẫu</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#cce0f5] bg-[#f4f8fd] px-5 py-2.5 text-xs font-bold text-[#0b2341] hover:bg-[#eef6ff] transition"
            >
              <Icon name="check" size={15} className={copied ? "text-emerald-600" : "text-[#4a6785]"} />
              <span>{copied ? "Đã sao chép link" : "Sao chép link mẫu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-[#eef6ff] bg-[#f8fafc] px-6 py-3 text-center text-[11px] text-[#4a6785]">
        Bảo An Tây Nguyên — Hotline Hỗ Trợ 24/7 & Bồi Thường Nhanh: <strong>0916 201 085</strong>
      </div>
    </div>
  );
}
