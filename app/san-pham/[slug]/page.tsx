import { notFound } from "next/navigation";
import { InteriorPage } from "../../../components/layout/interior-page";
import { insuranceProducts } from "../../../config/products";
import { productDetails } from "../../../config/product-details";
import { bicProductInfo } from "../../../config/bic-product-info";
import { formatVnd } from "../../../lib/quote";
import { Icon } from "../../../components/ui/icon";
import { ProductQuoteSection } from "../../../components/quote/product-quote-section";

const productImageMap: Record<string, string> = {
  "bao-hiem-o-to": "/image/car_hero.png",
  "bao-hiem-xe-may": "/image/motorbike_hero.png",
  "bao-hiem-suc-khoe": "/image/family_hero.png",
  "bao-hiem-nhan-tho": "/image/life_hero.png",
  "bao-hiem-tai-nan": "/image/accident_hero.png",
  "bao-hiem-du-lich": "/image/travel_hero.png",
};

export function generateStaticParams() {
  return insuranceProducts.map((p) => ({ slug: p[0] }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = insuranceProducts.find((item) => item[0] === slug);
  if(!p)notFound();
  const detail=productDetails[p[0]];
  const bicInfo=bicProductInfo[p[0]];
  const quoteType = detail?.quoteType ?? "business";
  return <InteriorPage eyebrow="CHI TIẾT SẢN PHẨM" title={<>{p[1]}<br/><span className="text-[#006b66]">rõ ràng hơn.</span></>} intro={p[2]}>
    <section className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
      <div>
        {productImageMap[p[0]] ? <img src={productImageMap[p[0]]} alt={p[1]} className="aspect-[16/9] w-full rounded-[18px] object-cover shadow-[0_16px_35px_rgba(0,56,53,0.12)]" /> : <div className="flex aspect-[16/9] items-center justify-center rounded-[18px] bg-[#eaf5f2] text-[#006b66]"><Icon name="shield" size={64} /></div>}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-[22px] font-bold text-[#103b3b]">Quyền lợi chính</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-6 text-[#577572]">
              {bicInfo.coverage.slice(0, 4).map((item)=><li key={item} className="flex gap-2"><Icon name="check" size={17} className="mt-1 shrink-0 text-[#006b66]" /><span>{item}</span></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-[22px] font-bold text-[#103b3b]">Cần lưu ý</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-6 text-[#577572]">
              {bicInfo.exclusions.map((item)=><li key={item} className="flex gap-2"><Icon name="shield" size={17} className="mt-1 shrink-0 text-[#006b66]" /><span>{item}</span></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-10 rounded-[18px] bg-[#eaf5f2] p-6 lg:p-7">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#006b66]">THÔNG TIN THAM KHẢO TỪ BIC</p>
          <h2 className="mt-2 text-[24px] font-bold tracking-tight text-[#103b3b]">{bicInfo.officialName}</h2>
          <p className="mt-3 text-[15px] leading-6 text-[#577572]">{bicInfo.audience}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-[16px] font-bold text-[#103b3b]">Hồ sơ nên chuẩn bị</h3>
              <ul className="mt-3 space-y-2 text-[14px] leading-5 text-[#577572]">
                {bicInfo.documents.map((item)=><li key={item} className="flex gap-2"><Icon name="check" size={15} className="mt-0.5 shrink-0 text-[#006b66]" /><span>{item}</span></li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#103b3b]">Phạm vi cần xác nhận</h3>
              <p className="mt-3 text-[14px] leading-5 text-[#577572]">Quyền lợi thực tế, giới hạn trách nhiệm, thời gian chờ và loại trừ được xác định trong quy tắc, hợp đồng hoặc giấy chứng nhận do BIC phát hành.</p>
            </div>
          </div>
          <a href={bicInfo.sourceUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-[#006b66] hover:text-[#005450]">
            Đọc nguồn chính thức: {bicInfo.sourceLabel}
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </div>
      <aside className="h-fit rounded-[18px] border border-[#cce5e1] bg-white p-7 shadow-[0_12px_35px_rgba(0,56,53,0.07)] lg:sticky lg:top-24">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#006b66]">PHÍ THAM KHẢO</p>
        {detail && <><p className="mt-3 text-[34px] font-bold tracking-tight text-[#006b66]">{detail.pricePrefix}{formatVnd(detail.price)}</p><p className="text-[14px] text-[#577572]">{detail.priceSuffix}</p><p className="mt-2 text-[13px] leading-5 text-[#6f8585]">{detail.priceNote}</p></>}
        <div className="mt-6 border-t border-[#eaf5f2] pt-6">
          <h2 className="text-[22px] font-bold text-[#103b3b]">Bạn nhận được gì?</h2>
          <ul className="mt-4 space-y-3 text-[14px] leading-5 text-[#577572]">
            <li>• Mức phí được giải thích theo từng thành phần.</li>
            <li>• Tư vấn phạm vi bảo vệ trước khi đăng ký.</li>
            <li>• Hỗ trợ chuẩn bị hồ sơ khi cần yêu cầu bồi thường.</li>
          </ul>
        </div>
        <a href="#tinh-phi" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#006b66] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#005450]">
          Tính phí theo nhu cầu <Icon name="calculator" size={16} />
        </a>
        <p className="mt-4 text-[12px] leading-5 text-[#6f8585]">Phí chính thức phụ thuộc thông tin thực tế và điều khoản sản phẩm.</p>
      </aside>
    </section>
    <ProductQuoteSection initialProductType={quoteType} />
  </InteriorPage>
}
