import Link from "next/link";
import { Icon } from "../ui/icon";

type Props = {
  product: readonly [string, string, string, string, string];
};

export function ProductCard({ product }: Props) {
  const [slug, name, desc, , icon] = product;
  const safeIcon = ["car", "heart", "home", "briefcase", "plane", "sprout"].includes(icon)
    ? (icon as "car" | "heart" | "home" | "briefcase" | "plane" | "sprout")
    : "shield";

  return (
    <article className="group flex min-h-[220px] flex-col justify-between rounded-[8px] border border-[#d5e5e2] bg-[#f7fbfa] p-6 transition duration-200 hover:border-[#006b66]/50 hover:bg-[#ffffff]">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#d5e5e2] bg-[#ffffff] text-[#006b66] transition-colors group-hover:border-[#006b66]">
            <Icon name={safeIcon} size={20} />
          </span>
          <span className="rounded-full border border-[#d5e5e2] bg-[#ffffff] px-2 py-0.5 font-mono text-[10px] text-[#006b66]">
            AI cấp tốc
          </span>
        </div>
        <h3 className="text-[18px] font-semibold text-[#103b3b] group-hover:text-[#006b66] transition-colors">
          {name}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[#6f8585]">
          {desc}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-[#d5e5e2]/60">
        <Link
          href={`/san-pham/${slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#006b66] transition-colors hover:text-[#0b8f86]"
        >
          Tính phí & cấp đơn ngay <Icon name="arrow" size={13} />
        </Link>
      </div>
    </article>
  );
}


