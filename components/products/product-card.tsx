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
    <Link
      href={`/san-pham/${slug}`}
      className="group flex flex-col justify-between rounded-[18px] border border-[#cce0f5] bg-[#ffffff] p-5 transition duration-300 hover:border-[#0066cc]/60 hover:shadow-[0_14px_35px_rgba(7,25,47,0.1)] active:scale-[0.99] md:p-6 cursor-pointer"
    >
      <div>
        {/* Category Header */}
        <div className="mb-4 flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef6ff] text-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white transition-colors shadow-sm">
            <Icon name={safeIcon} size={20} />
          </span>
          <span className="rounded-full bg-[#f5ab19]/15 border border-[#f5ab19]/40 px-3 py-1 text-[11px] font-bold tracking-wide text-[#b87c00]">
            Cấp đơn cấp tốc
          </span>
        </div>

        {/* Product Visual */}
        <div className="my-3 block overflow-hidden rounded-[12px] bg-[#f4f8fd] aspect-[4/3] p-2">
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full rounded-[8px] object-cover shadow-[0_8px_20px_rgba(7,25,47,0.12)] transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <h3 className="mt-4 text-[20px] font-bold tracking-tight text-[#0b2341] transition-colors group-hover:text-[#0066cc]">
          {name}
        </h3>
        <p className="mt-2 text-[16px] leading-relaxed text-[#4a6785]">
          {desc}
        </p>
        {detail && (
          <div className="mt-5 rounded-[12px] bg-[#f4f8fd] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4a6785]">
              Phí tham khảo
            </p>
            <p className="mt-1 text-[24px] font-bold tracking-tight text-[#0066cc]">
              {detail.pricePrefix}
              {formatVnd(detail.price).replace(/\s/g, " ")}
              <span className="ml-1 text-[14px] font-medium text-[#4a6785]">{detail.priceSuffix}</span>
            </p>
            <p className="mt-1 text-[13px] leading-5 text-[#6b84a5]">{detail.priceNote}</p>
            <ul className="mt-3 space-y-1.5 text-[14px] leading-5 text-[#3b5878]">
              {detail.highlights.slice(0, 2).map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-[#0066cc]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#eef6ff]">
        <div className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0066cc] py-3.5 px-4 text-[15px] font-bold text-white shadow-sm transition-all duration-200 group-hover:bg-[#0052b3] group-hover:shadow-md">
          <span>Tính phí & cấp đơn</span>
          <Icon name="arrow-right" size={16} />
        </div>
      </div>
    </Link>
  );
}
