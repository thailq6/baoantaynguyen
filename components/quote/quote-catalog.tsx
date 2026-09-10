"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { insuranceProducts } from "../../config/products";
import { productDetails } from "../../config/product-details";
import { formatVnd } from "../../lib/quote";
import { Icon } from "../ui/icon";

const categories = [
  { value: "all", label: "Tất cả" },
  { value: "ca-nhan", label: "Cá nhân" },
  { value: "gia-dinh", label: "Gia đình" },
  { value: "doanh-nghiep", label: "Doanh nghiệp" },
] as const;

const imageMap: Record<string, string> = {
  "bao-hiem-o-to": "/image/car_hero.png",
  "bao-hiem-xe-may": "/image/motorbike_hero.png",
  "bao-hiem-suc-khoe": "/image/family_hero.png",
  "bao-hiem-nhan-tho": "/image/life_hero.png",
  "bao-hiem-tai-nan": "/image/accident_hero.png",
  "bao-hiem-du-lich": "/image/travel_hero.png",
};

export function QuoteCatalog() {
  const [category, setCategory] = useState<(typeof categories)[number]["value"]>("all");
  const [selectedSlug, setSelectedSlug] = useState<string>(insuranceProducts[0][0]);

  const filteredProducts = useMemo(
    () =>
      insuranceProducts.filter(
        (product) => category === "all" || product[3] === category,
      ),
    [category],
  );
  const selected =
    insuranceProducts.find((product) => product[0] === selectedSlug) ??
    filteredProducts[0] ??
    insuranceProducts[0];
  const detail = productDetails[selected[0]];

  function selectCategory(value: (typeof categories)[number]["value"]) {
    setCategory(value);
    const nextProduct = insuranceProducts.find(
      (product) => value === "all" || product[3] === value,
    );
    if (nextProduct) setSelectedSlug(nextProduct[0]);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 border-b border-[#cce5e1] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#006b66]">
            DANH MỤC BÁO GIÁ
          </p>
          <h2 className="mt-2 text-[28px] font-bold tracking-tight text-[#103b3b]">
            Chọn sản phẩm phù hợp
          </h2>
        </div>
        <p className="max-w-sm text-[13px] leading-5 text-[#577572] sm:text-right">
          Tất cả mức phí dưới đây là minh họa để bạn dễ hình dung ngân sách bảo vệ.
        </p>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Lọc nhóm sản phẩm">
        {categories.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={category === item.value}
            onClick={() => selectCategory(item.value)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition ${
              category === item.value
                ? "border-[#006b66] bg-[#006b66] text-white"
                : "border-[#cce5e1] bg-white text-[#456464] hover:border-[#006b66] hover:text-[#006b66]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => {
          const productDetail = productDetails[product[0]];
          const isSelected = selected[0] === product[0];
          return (
            <button
              key={product[0]}
              type="button"
              onClick={() => setSelectedSlug(product[0])}
              className={`group overflow-hidden rounded-[16px] border bg-white text-left transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(0,56,53,0.09)] ${
                isSelected ? "border-[#006b66] ring-2 ring-[#006b66]/10" : "border-[#cce5e1]"
              }`}
            >
              <div className="relative aspect-[2.15/1] overflow-hidden bg-[#eaf5f2]">
                {imageMap[product[0]] ? (
                  <img
                    src={imageMap[product[0]]}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#006b66]">
                    <Icon name="shield" size={32} />
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#006b66]">
                  {product[3] === "ca-nhan" ? "Cá nhân" : product[3] === "gia-dinh" ? "Gia đình" : "Doanh nghiệp"}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[16px] font-bold text-[#103b3b]">{product[1]}</p>
                <p className="mt-2 text-[12px] leading-5 text-[#577572]">
                  {productDetail?.pricePrefix}
                  {productDetail ? formatVnd(productDetail.price) : "Liên hệ"}
                  <span className="ml-1">{productDetail?.priceSuffix}</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {detail && (
        <section className="mt-6 grid gap-6 rounded-[18px] border border-[#cce5e1] bg-white p-6 shadow-[0_12px_35px_rgba(0,56,53,0.07)] lg:grid-cols-[1fr_1.1fr] lg:p-8" aria-live="polite">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#006b66]">
              GÓI ĐANG XEM
            </p>
            <h3 className="mt-2 text-[28px] font-bold tracking-tight text-[#103b3b]">{selected[1]}</h3>
            <p className="mt-3 text-[15px] leading-6 text-[#577572]">{selected[2]}</p>
            <div className="mt-6 rounded-[14px] bg-[#003835] p-5 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d5e5e2]">Mức phí tham khảo</p>
              <p className="mt-2 text-[30px] font-bold tracking-tight text-[#f5ab19]">
                {detail.pricePrefix}{formatVnd(detail.price)}
                <span className="ml-1 text-[14px] font-medium text-[#d5e5e2]">{detail.priceSuffix}</span>
              </p>
              <p className="mt-1 text-[12px] leading-5 text-[#d5e5e2]">{detail.priceNote}</p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="flex items-center gap-2 text-[15px] font-bold text-[#103b3b]">
                <Icon name="check" size={17} className="text-[#006b66]" />
                Quyền lợi chính
              </h4>
              <ul className="mt-3 space-y-3 text-[14px] leading-5 text-[#577572]">
                {detail.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-[15px] font-bold text-[#103b3b]">
                <Icon name="shield" size={17} className="text-[#006b66]" />
                Cần lưu ý
              </h4>
              <ul className="mt-3 space-y-3 text-[14px] leading-5 text-[#577572]">
                {detail.exclusions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="sm:col-span-2">
              <Link
                href={`/san-pham/${selected[0]}`}
                className="inline-flex items-center gap-2 text-[14px] font-bold text-[#006b66] hover:text-[#005450]"
              >
                Xem chi tiết sản phẩm
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
