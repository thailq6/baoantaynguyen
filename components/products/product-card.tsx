import Link from "next/link";
import { formatVnd } from "../../lib/quote";
import { productDetails } from "../../config/product-details";
import { Icon, type IconName } from "../ui/icon";

type Props = {
  product: readonly [string, string, string, string, string];
};

const productImageMap: Record<string, string> = {
  "bao-hiem-o-to": "/image/car_hero.png",
  "bao-hiem-xe-may": "/image/motorbike_hero.png",
  "bao-hiem-suc-khoe": "/image/family_hero.png",
  "bao-hiem-nhan-tho": "/image/life_hero.png",
  "bao-hiem-tai-nan": "/image/accident_hero.png",
  "bao-hiem-du-lich": "/image/travel_hero.png",
};

export function ProductCard({ product }: Props) {
  const [slug, name, desc, , icon] = product;
  const safeIcon: IconName = [
    "car",
    "bike",
    "heart",
    "home",
    "briefcase",
    "plane",
    "sprout",
    "bolt",
    "building",
  ].includes(icon)
    ? (icon as IconName)
    : "shield";

  const imageSrc = productImageMap[slug] || "/image/family_hero.png";
  const detail = productDetails[slug];

  return (
    <article className="group flex flex-col justify-between rounded-[18px] border border-[#cce5e1] bg-[#ffffff] p-5 transition duration-300 hover:border-[#006b66]/60 hover:shadow-[0_14px_35px_rgba(0,56,53,0.1)] bic-btn-active md:p-6">
      <div>
        {/* Category Header */}
        <div className="mb-4 flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf5f2] text-[#006b66] group-hover:bg-[#006b66] group-hover:text-white transition-colors shadow-sm">
            <Icon name={safeIcon} size={20} />
          </span>
          <span className="rounded-full bg-[#f5ab19]/15 border border-[#f5ab19]/40 px-3 py-1 text-[11px] font-bold tracking-wide text-[#b87c00]">
            Cấp đơn cấp tốc
          </span>
        </div>

        {/* Product Visual */}
        <Link
          href={`/san-pham/${slug}`}
          aria-label={`Xem chi tiết ${name}`}
          className="my-3 block overflow-hidden rounded-[12px] bg-[#f4faf8] aspect-[4/3] p-2"
        >
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full rounded-[8px] object-cover shadow-[0_8px_20px_rgba(0,56,53,0.12)] transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Content */}
        <Link href={`/san-pham/${slug}`} className="block">
          <h3 className="mt-4 text-[20px] font-bold tracking-tight text-[#103b3b] transition-colors group-hover:text-[#006b66]">
            {name}
          </h3>
        </Link>
        <p className="mt-2 text-[16px] leading-relaxed text-[#577572]">
          {desc}
        </p>
        {detail && (
          <div className="mt-5 rounded-[12px] bg-[#f4faf8] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#577572]">
              Phí tham khảo
            </p>
            <p className="mt-1 text-[24px] font-bold tracking-tight text-[#006b66]">
              {detail.pricePrefix}
              {formatVnd(detail.price).replace(/\s/g, " ")}
              <span className="ml-1 text-[14px] font-medium text-[#577572]">{detail.priceSuffix}</span>
            </p>
            <p className="mt-1 text-[13px] leading-5 text-[#6f8585]">{detail.priceNote}</p>
            <ul className="mt-3 space-y-1.5 text-[14px] leading-5 text-[#456464]">
              {detail.highlights.slice(0, 2).map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-[#006b66]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#eaf5f2]">
        <Link
          href={`/san-pham/${slug}`}
          className="inline-flex items-center gap-2 text-[16px] font-bold text-[#006b66] transition-all group-hover:gap-3"
        >
          <span>Tính phí & cấp đơn</span>
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </article>
  );
}

