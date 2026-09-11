"use client";

import { useState } from "react";
import { quotePlans } from "../../config/quote-plans";
import type { QuoteInput, QuoteProductType } from "../../types/quote";
import { Icon } from "../ui/icon";
import { QuickQuote } from "./quick-quote";

type Props = {
  initialProductType: QuoteProductType;
};

const productLabels: Record<QuoteProductType, string> = {
  auto: "Bảo hiểm ô tô",
  motorbike: "Bảo hiểm xe máy",
  health: "Bảo hiểm sức khỏe & tai nạn",
  travel: "Bảo hiểm du lịch",
  home: "Bảo hiểm nhà ở",
  life: "Bảo hiểm nhân thọ",
  business: "Bảo hiểm doanh nghiệp, tài sản & hàng hóa",
};

export function ProductQuoteSection({ initialProductType }: Props) {
  const [selection, setSelection] = useState<{
    productType: QuoteProductType;
    plan: QuoteInput["plan"];
  }>({ productType: initialProductType, plan: "basic" });
  const selectedPlan = quotePlans[selection.productType][selection.plan];

  return (
    <section id="tinh-phi" className="border-t border-[#cce0f5] bg-[#eef6ff]">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-start lg:px-8">
        <div className="pt-2">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0066cc]">TÍNH PHÍ THEO NHU CẦU</p>
          <h2 className="mt-3 text-[32px] font-bold tracking-tight text-[#0b2341]">Chọn mức bảo vệ phù hợp với bạn.</h2>
          <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#4a6785]">
            Bạn đang xem <strong className="text-[#0b2341]">{productLabels[selection.productType]} · Gói {selectedPlan.name}</strong>.
            Nội dung bên dưới sẽ cập nhật theo lựa chọn trong bảng tính phí.
          </p>

          <div className="mt-8 rounded-[18px] border border-[#cce0f5] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0066cc]">GÓI ĐANG CHỌN</p>
                <h3 className="mt-2 text-[24px] font-bold tracking-tight text-[#0b2341]">{selectedPlan.name}</h3>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef6ff] text-[#0066cc]">
                <Icon name="shield" size={20} />
              </span>
            </div>
            <p className="mt-3 text-[15px] leading-6 text-[#4a6785]">{selectedPlan.summary}</p>
            <div className="mt-6">
              <h4 className="text-[15px] font-bold text-[#0b2341]">Gói này bao gồm</h4>
              <ul className="mt-3 space-y-3 text-[14px] leading-5 text-[#4a6785]">
                {selectedPlan.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[#0066cc]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 border-t border-[#eef6ff] pt-4 text-[13px] leading-5 text-[#6b84a5]">
              <strong className="text-[#0b2341]">Phù hợp với:</strong> {selectedPlan.bestFor}
            </p>
          </div>
          <p className="mt-6 max-w-xl text-[13px] leading-5 text-[#6b84a5]">
            Đây là công cụ minh họa, không thay thế báo giá và thẩm định chính thức của BIC. Quyền lợi thực tế
            được xác định theo quy tắc và giấy chứng nhận của sản phẩm.
          </p>
        </div>
        <QuickQuote
          initialProductType={initialProductType}
          compact
          onSelectionChange={setSelection}
        />
      </div>
    </section>
  );
}
