"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculateQuote, formatVnd } from "../../lib/quote";
import type { QuoteProductType } from "../../types/quote";

// Exact options matching the screenshot
const PURPOSE_OPTIONS = [
  { value: "commercial_5", label: "Kinh doanh chở người (taxi, hợp đồng)", seats: "5", price: 831600 },
  { value: "commercial_7", label: "Kinh doanh chở người (taxi, hợp đồng)", seats: "7", price: 1188000 },
  { value: "non_commercial_5", label: "Không kinh doanh vận tải (xe gia đình)", seats: "5", price: 480700 },
  { value: "non_commercial_7", label: "Không kinh doanh vận tải (xe gia đình)", seats: "7", price: 873400 },
  { value: "truck", label: "Xe ô tô chở hàng (xe tải)", seats: "2", price: 1027400 },
];

export function QuickQuote() {
  const [purpose, setPurpose] = useState<string>("Kinh doanh chở người (taxi, hợp đồng)");
  const [seats, setSeats] = useState<string>("5 chỗ");
  const [calculated, setCalculated] = useState<boolean>(true);

  // Price determination based on screenshot (831.600đ/năm for 5 seats commercial)
  const currentPrice = useMemo(() => {
    if (purpose.includes("Kinh doanh")) {
      if (seats.includes("5")) return 831600;
      if (seats.includes("7")) return 1188000;
      return 1518000;
    } else {
      if (seats.includes("5")) return 480700;
      if (seats.includes("7")) return 873400;
      return 950000;
    }
  }, [purpose, seats]);

  return (
    <div className="w-full max-w-[480px] rounded-[16px] border border-[#d5e5e2] bg-[#ffffff] p-6 lg:p-7 shadow-2xl transition-all">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-5 border-b border-[#d5e5e2]">
        <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#006b66] text-xs font-bold text-[#f7fbfa]">
          AI
        </span>
        <h3 className="text-[16px] font-semibold text-[#103b3b]">
          Tính phí nhanh — TNDS ô tô
        </h3>
      </div>

      {/* Form controls */}
      <div className="mt-5 space-y-4">
        <div>
          <label className="block text-[13px] text-[#456464] mb-2">
            Mục đích sử dụng
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full rounded-[8px] border border-[#d5e5e2] bg-[#f7fbfa] px-3.5 py-2.5 text-[14px] text-[#103b3b] outline-none transition focus:border-[#006b66]"
          >
            <option value="Kinh doanh chở người (taxi, hợp đồng)">
              Kinh doanh chở người (taxi, hợp đồng)
            </option>
            <option value="Không kinh doanh vận tải (xe gia đình)">
              Không kinh doanh vận tải (xe gia đình)
            </option>
            <option value="Xe ô tô chở hàng (xe tải)">
              Xe ô tô chở hàng (xe tải)
            </option>
          </select>
        </div>

        <div>
          <label className="block text-[13px] text-[#456464] mb-2">
            Số chỗ ngồi
          </label>
          <select
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full rounded-[8px] border border-[#d5e5e2] bg-[#f7fbfa] px-3.5 py-2.5 text-[14px] text-[#103b3b] outline-none transition focus:border-[#006b66]"
          >
            <option value="5 chỗ">5 chỗ</option>
            <option value="7 chỗ">7 chỗ</option>
            <option value="9 chỗ">9 chỗ</option>
          </select>
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full rounded-[6px] bg-[#006b66] py-2.5 text-[14px] font-semibold text-[#f7fbfa] transition-colors hover:bg-[#0b8f86]"
        >
          Tính phí ngay
        </button>
      </div>

      {/* Price output display matching Image #1 */}
      {calculated && (
        <div className="mt-6 pt-6 border-t border-dashed border-[#d5e5e2] text-center">
          <div className="text-[32px] font-bold tracking-tight text-[#006b66] lg:text-[36px]">
            {formatVnd(currentPrice)}
            <span className="text-[18px] font-normal text-[#456464]">/năm</span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-[#6f8585]">
            Phí bảo hiểm TNDS bắt buộc theo quy định, đã bao gồm VAT 10%. · BIC API live MVL/BIC_MVL_2025 — TNDS xe ô tô
          </p>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/bao-gia"
              className="inline-flex items-center justify-center rounded-[6px] bg-[#006b66] px-4 py-3 text-[14px] font-semibold text-[#f7fbfa] transition-colors hover:bg-[#0b8f86]"
            >
              Mua ngay online →
            </Link>

            <a
              href="tel:0949013668"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-[#006b66] bg-transparent px-4 py-2.5 text-[14px] font-semibold text-[#006b66] transition-colors hover:bg-[#006b66]/10"
            >
              <span>☎</span> Tư vấn: 0949 013 668
            </a>

            <a
              href="https://zalo.me"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-[#d5e5e2] bg-[#f7fbfa] px-4 py-2.5 text-[14px] font-medium text-[#103b3b] transition-colors hover:border-[#006b66]"
            >
              <span>💬</span> Nhắn Zalo OA
            </a>
          </div>
        </div>
      )}
    </div>
  );
}


