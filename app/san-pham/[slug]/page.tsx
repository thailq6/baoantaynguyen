import { notFound } from "next/navigation";
import { InteriorPage } from "../../../components/layout/interior-page";
import { insuranceProducts } from "../../../config/products";
import { productDetails } from "../../../config/product-details";
import { bicProductInfo } from "../../../config/bic-product-info";
import { quotePlans } from "../../../config/quote-plans";
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
  if (!p) notFound();

  const detail = productDetails[p[0]];
  const bicInfo = bicProductInfo[p[0]] || bicProductInfo["bao-hiem-o-to"];
  const quoteType = detail?.quoteType ?? "auto";
  const plansForProduct = quotePlans[quoteType];

  return (
    <InteriorPage
      eyebrow="THÔNG TIN SẢN PHẨM BIC CHÍNH THỨC"
      title={
        <>
          {p[1]}
          <br />
          <span className="text-[#0066cc]">minh bạch & bảo vệ toàn diện.</span>
        </>
      }
      intro={p[2]}
    >
      {/* Main Grid Layout */}
      <section className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        {/* Left Column - Extensive Product Information */}
        <div className="space-y-10">
          {/* Visual Studio Image Banner */}
          <div className="overflow-hidden rounded-[20px] bg-[#f4f8fd] border border-[#cce0f5] shadow-sm">
            {productImageMap[p[0]] ? (
              <img
                src={productImageMap[p[0]]}
                alt={p[1]}
                className="aspect-[16/9] w-full object-cover transition duration-500 hover:scale-102"
              />
            ) : (
              <div className="flex aspect-[16/9] items-center justify-center bg-[#eef6ff] text-[#0066cc]">
                <Icon name="shield" size={64} />
              </div>
            )}
            {bicInfo.legalBasis && (
              <div className="bg-[#eef6ff] px-6 py-3 border-t border-[#cce0f5] flex items-center gap-2 text-[13px] font-medium text-[#0066cc]">
                <Icon name="award" size={16} className="shrink-0" />
                <span>Căn cứ pháp lý: {bicInfo.legalBasis}</span>
              </div>
            )}
          </div>

          {/* Section 1: Hạn Mức Trách Nhiệm Bảo Hiểm */}
          <div className="rounded-[18px] border border-[#cce0f5] bg-white p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#eef6ff] pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef6ff] text-[#0066cc]">
                <Icon name="shield" size={20} />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0066cc]">HẠN MỨC BẢO VỆ</p>
                <h2 className="text-[20px] font-bold text-[#0b2341]">Mức chi trả bồi thường tối đa</h2>
              </div>
            </div>
            <ul className="mt-5 space-y-3">
              {bicInfo.limits.map((limit) => (
                <li key={limit} className="flex items-start gap-3 rounded-[12px] bg-[#f4f8fd] p-4 text-[14px] leading-6 font-medium text-[#0b2341]">
                  <Icon name="check" size={18} className="mt-0.5 shrink-0 text-[#0066cc]" />
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Phạm Vi Quyền Lợi Chi Tiết */}
          <div className="rounded-[18px] border border-[#cce0f5] bg-white p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#eef6ff] pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef6ff] text-[#0066cc]">
                <Icon name="sparkles" size={20} />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0066cc]">QUYỀN LỢI CHI TIẾT</p>
                <h2 className="text-[20px] font-bold text-[#0b2341]">Phạm vi được BIC chi trả</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {bicInfo.coverage.map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-[14px] border border-[#eef6ff] bg-[#ffffff] p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0066cc] text-[12px] font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="text-[14px] leading-relaxed text-[#4a6785]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Bảng So Sánh 3 Gói Bảo Vệ (Cơ bản - Nâng cao - Toàn diện) */}
          {plansForProduct && (
            <div className="rounded-[18px] border border-[#cce0f5] bg-white p-6 lg:p-8 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0066cc]">CÁC GÓI CHƯƠNG TRÌNH</p>
              <h2 className="mt-1 text-[22px] font-bold text-[#0b2341]">Lựa chọn mức độ bảo vệ phù hợp</h2>
              
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {(["basic", "advanced", "comprehensive"] as const).map((planKey) => {
                  const planItem = plansForProduct[planKey];
                  const isFeatured = planKey === "advanced";
                  return (
                    <div
                      key={planKey}
                      className={`flex flex-col justify-between rounded-[16px] p-5 border transition ${
                        isFeatured
                          ? "border-[#0066cc] bg-[#eef6ff]/50 ring-2 ring-[#0066cc]/20"
                          : "border-[#cce0f5] bg-white"
                      }`}
                    >
                      <div>
                        {isFeatured && (
                          <span className="inline-block mb-2 rounded-full bg-[#f5ab19] px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                            Phổ biến nhất
                          </span>
                        )}
                        <h3 className="text-[18px] font-bold text-[#0b2341]">{planItem.name}</h3>
                        <p className="mt-2 text-[12px] leading-5 text-[#4a6785]">{planItem.summary}</p>
                        <ul className="mt-4 space-y-2 text-[13px] text-[#3b5878]">
                          {planItem.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-1.5">
                              <Icon name="check" size={14} className="mt-0.5 shrink-0 text-[#0066cc]" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 pt-4 border-t border-[#cce0f5]">
                        <p className="text-[11px] font-medium text-[#6b84a5]">Phù hợp:</p>
                        <p className="text-[12px] font-semibold text-[#0b2341]">{planItem.bestFor}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 4: Đối Tượng & Điều Kiện Tham Gia */}
          <div className="rounded-[18px] border border-[#cce0f5] bg-[#eef6ff] p-6 lg:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0066cc]">ĐỐI TƯỢNG THAM GIA</p>
            <h2 className="mt-1 text-[22px] font-bold text-[#0b2341]">Ai nên tham gia sản phẩm này?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4a6785]">{bicInfo.audience}</p>
            
            <div className="mt-6 pt-6 border-t border-[#cce0f5]">
              <h3 className="text-[15px] font-bold text-[#0b2341]">Giấy tờ cần chuẩn bị khi mua:</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-[14px] text-[#4a6785]">
                {bicInfo.documents.map((doc) => (
                  <li key={doc} className="flex items-center gap-2">
                    <Icon name="check" size={16} className="text-[#0066cc]" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5: Quy Trình Bồi Thường 4 Bước */}
          <div className="rounded-[18px] border border-[#cce0f5] bg-white p-6 lg:p-8 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0066cc]">QUY TRÌNH BỒI THƯỜNG SỐ</p>
            <h2 className="mt-1 text-[22px] font-bold text-[#0b2341]">4 Bước xử lý bồi thường nhanh chóng</h2>
            <div className="mt-6 space-y-4">
              {bicInfo.claimSteps.map((step) => (
                <div key={step} className="rounded-[14px] bg-[#f4f8fd] p-4 text-[14px] leading-6 font-medium text-[#0b2341] border border-[#cce0f5]/60">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Điều Khoản Loại Trừ Trách Nhiệm */}
          <div className="rounded-[18px] border border-[#ffdede] bg-[#fff8f8] p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4d4d] text-white">
                <Icon name="shield" size={18} />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#d93838]">ĐIỀU KHOẢN LOẠI TRỪ</p>
                <h2 className="text-[18px] font-bold text-[#991b1b]">Các trường hợp BIC không chi trả</h2>
              </div>
            </div>
            <ul className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-[#7f1d1d]">
              {bicInfo.exclusions.map((ex) => (
                <li key={ex} className="flex items-start gap-2">
                  <span className="mt-1 font-bold text-[#d93838]">✕</span>
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official BIC Reference Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-[14px] bg-[#07192f] p-6 text-white">
            <div>
              <p className="text-[12px] font-mono text-[#60a5fa] uppercase tracking-wider">NGUỒN DỮ LIỆU CHÍNH THỨC</p>
              <p className="mt-1 text-[16px] font-bold text-white">{bicInfo.officialName}</p>
            </div>
            <a
              href={bicInfo.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#0052b3]"
            >
              <span>Xem tài liệu gốc BIC</span>
              <Icon name="arrow-right" size={15} />
            </a>
          </div>
        </div>

        {/* Right Column - Sticky Calculation Widget & Fast Contact */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[20px] border border-[#cce0f5] bg-white p-6 lg:p-7 shadow-[0_12px_40px_rgba(7,25,47,0.08)]">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0066cc]">PHÍ BẢO HIỂM THAM KHẢO</p>
            {detail && (
              <div className="mt-3">
                <p className="text-[34px] font-bold tracking-tight text-[#0066cc]">
                  {detail.pricePrefix}
                  {formatVnd(detail.price)}
                </p>
                <p className="text-[14px] font-medium text-[#4a6785]">{detail.priceSuffix}</p>
                <p className="mt-2 text-[13px] leading-5 text-[#6b84a5]">{detail.priceNote}</p>
              </div>
            )}

            <div className="mt-6 border-t border-[#eef6ff] pt-6 space-y-3">
              <a
                href="#tinh-phi"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0066cc] py-3.5 px-6 text-[15px] font-bold text-white shadow-md transition hover:bg-[#0052b3] active:scale-95"
              >
                <Icon name="calculator" size={18} />
                <span>Tính phí theo nhu cầu ngay</span>
              </a>

              <a
                href="tel:0916201085"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#0066cc] bg-white py-3 px-6 text-[14px] font-bold text-[#0066cc] transition hover:bg-[#0066cc]/10"
              >
                <Icon name="phone" size={16} />
                <span>Hotline SĐT: 0916 201 085</span>
              </a>

              <a
                href="https://zalo.me/0916201085"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#cce0f5] bg-[#f4f8fd] py-3 px-6 text-[14px] font-bold text-[#0b2341] transition hover:bg-[#eef6ff]"
              >
                <Icon name="message" size={16} className="text-[#0066cc]" />
                <span>Nhắn Zalo: 0916 201 085</span>
              </a>
            </div>

            <div className="mt-6 rounded-[12px] bg-[#f4f8fd] p-4 text-[12px] leading-relaxed text-[#4a6785]">
              <strong className="text-[#0b2341]">Cam kết Bảo An Tây Nguyên:</strong> Đơn bảo hiểm được cấp điện tử chính hãng từ BIC (BIDV), giá trị pháp lý 100% trên toàn quốc.
            </div>
          </div>
        </aside>
      </section>

      {/* Quote Section at Bottom */}
      <ProductQuoteSection initialProductType={quoteType} />
    </InteriorPage>
  );
}
