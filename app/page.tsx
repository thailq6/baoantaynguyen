import Link from "next/link";
import { SiteHeader } from "../components/layout/site-header";
import { SiteFooter } from "../components/layout/site-footer";
import { ProductCard } from "../components/products/product-card";
import { QuickQuote } from "../components/quote/quick-quote";
import { Icon } from "../components/ui/icon";
import { insuranceProducts } from "../config/products";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f4f8fd] text-[#0b2341] font-sans antialiased">
      <SiteHeader />

      <main>
        {/* ====================================================================
            TILE 1 (Apple Luminous Ice Blue Canvas): HERO & QUICK QUOTE
            ==================================================================== */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#cbe4ff_0%,#eef6ff_45%,#f4f8fd_100%)] py-16 lg:py-24 border-b border-[#cce0f5]">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            {/* Hero Content Left */}
            <div className="flex flex-col items-start">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0066cc]/30 bg-white/90 px-4 py-1.5 text-[13px] font-bold text-[#0066cc] shadow-sm backdrop-blur">
                <Icon name="sparkles" size={16} className="text-[#f5ab19]" />
                <span className="tracking-wide uppercase">BẢO AN TÂY NGUYÊN · BẢO LÃNH CHÍNH HÃNG BIC</span>
              </div>

              {/* Display Headline - Tight BIC tracking */}
              <h1 className="mt-6 text-[42px] font-bold leading-[1.08] tracking-[-0.025em] text-[#0b2341] sm:text-[54px] lg:text-[62px]">
                Mua bảo hiểm trực tuyến cùng Bảo An Tây Nguyên.
              </h1>

              {/* Tagline */}
              <p className="mt-5 max-w-[560px] text-[19px] leading-[1.47] text-[#4a6785] tracking-tight">
                Hệ thống tư vấn đúng nhu cầu, tính phí tức thì và cấp giấy chứng nhận điện tử ngay. Ô tô, xe máy, sức khỏe, nhân thọ, du lịch — bảo lãnh bởi BIC (BIDV).
              </p>

              {/* Action Buttons - BIC Emerald Pill & Gold Accents */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/bao-gia"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] px-8 py-3.5 text-[17px] font-semibold text-white transition-transform duration-150 hover:bg-[#0052b3] active:scale-95 shadow-md"
                >
                  <span>Xem sản phẩm & tính phí</span>
                  <Icon name="arrow-right" size={18} />
                </Link>
                <a
                  href="tel:0396998765"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#0066cc] bg-white/80 px-6 py-3.5 text-[17px] font-semibold text-[#0066cc] transition-transform duration-150 hover:bg-[#0066cc]/10 active:scale-95 shadow-sm"
                >
                  <Icon name="phone" size={18} className="text-[#0066cc]" />
                  <span>Tư vấn SĐT: 0396998765</span>
                </a>
              </div>

              {/* Key Trust Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#cce0f5] pt-8 w-full max-w-[540px]">
                <div>
                  <div className="text-[24px] font-bold tracking-tight text-[#0066cc]">2 phút</div>
                  <div className="mt-1 text-[13px] text-[#4a6785] font-medium">Cấp giấy chứng nhận</div>
                </div>
                <div>
                  <div className="text-[24px] font-bold tracking-tight text-[#0066cc]">24 / 7</div>
                  <div className="mt-1 text-[13px] text-[#4a6785] font-medium">Hỗ trợ trực tuyến</div>
                </div>
                <div>
                  <div className="text-[24px] font-bold tracking-tight text-[#0066cc]">BIC</div>
                  <div className="mt-1 text-[13px] text-[#4a6785] font-medium">Thành viên BIDV</div>
                </div>
              </div>
            </div>

            {/* Hero Right Widget - QuickQuote (Lazy Calculated) */}
            <div className="flex justify-center lg:justify-end">
              <QuickQuote />
            </div>
          </div>
        </section>

        {/* ====================================================================
            TILE 2 (Deep Ocean Navy #07192f - ZERO BLACK): FEATURES
            ==================================================================== */}
        <section id="vi-sao-chon" className="bg-[#07192f] text-white py-20 lg:py-28 relative">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="text-center">
              <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#f5ab19]">
                VÌ SAO CHỌN BẢO AN TÂY NGUYÊN
              </p>
              <h2 className="mt-3 text-[34px] font-bold leading-tight tracking-[-0.02em] text-white lg:text-[44px]">
                Trải nghiệm mua bảo hiểm minh bạch & tiện lợi
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-[#d0e2f7]">
                Tốc độ vượt trội, cấp đơn tự động — giá trị bảo vệ cam kết chính hãng bởi Tổng Công ty Bảo hiểm BIDV (BIC).
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  icon: "calculator",
                  title: "Tính phí tức thì",
                  desc: "Hệ thống tính phí chính xác theo quy chuẩn Bộ Tài Chính và BIC chỉ trong 1 giây, minh bạch 100%.",
                },
                {
                  step: "02",
                  icon: "award",
                  title: "Cấp chứng nhận ngay",
                  desc: "Giấy chứng nhận điện tử có mã QR xác thực hợp lệ theo Nghị định 67/2023/NĐ-CP.",
                },
                {
                  step: "03",
                  icon: "shield",
                  title: "Bảo lãnh bởi BIC",
                  desc: "BIC là đơn vị thành viên của BIDV — Top 5 công ty bảo hiểm phi nhân thọ uy tín nhất Việt Nam.",
                },
                {
                  step: "04",
                  icon: "sparkles",
                  title: "Bồi thường số 24/7",
                  desc: "Tải ảnh tổn thất và nộp hồ sơ qua Zalo/Portal. Hệ thống tự động quét hóa đơn, đối chiếu điều khoản.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-[18px] bg-[#0e2a4e] p-7 transition duration-200 hover:bg-[#11325d] bic-btn-active border border-[#143c6f]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5ab19]/20 text-[#f5ab19]">
                      <Icon name={item.icon as any} size={22} />
                    </span>
                    <span className="font-mono text-[12px] font-bold text-[#90c2f7]">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[20px] font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#d0e2f7]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            TILE 3 (Soft Ice Blue Canvas #f4f8fd): PRODUCT CARDS
            ==================================================================== */}
        <section className="bg-[#f4f8fd] py-20 lg:py-28 border-b border-[#cce0f5]">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#0066cc]">
                  SẢN PHẨM CHỦ LỰC
                </p>
                <h2 className="mt-3 text-[34px] font-bold leading-tight tracking-[-0.02em] text-[#0b2341] lg:text-[44px]">
                  Bảo hiểm chính hãng BIC trực tuyến
                </h2>
              </div>
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-2 text-[16px] font-bold text-[#0066cc] transition-colors hover:text-[#0052b3]"
              >
                <span>Xem tất cả gói bảo hiểm</span>
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {insuranceProducts.slice(0, 6).map((product) => (
                <ProductCard key={product[0]} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            TILE 4 (Soft Sky Blue Surface #eef6ff): PROCESS
            ==================================================================== */}
        <section id="quy-trinh" className="bg-[#eef6ff] text-[#0b2341] py-20 lg:py-28 border-b border-[#cce0f5]">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="text-center">
              <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#0066cc]">
                QUY TRÌNH ĐƠN GIẢN
              </p>
              <h2 className="mt-3 text-[34px] font-bold leading-tight tracking-[-0.02em] text-[#0b2341] lg:text-[44px]">
                3 bước để nhận giấy chứng nhận điện tử
              </h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="rounded-[18px] bg-white p-8 text-center border border-[#cce0f5] shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0066cc] text-white font-mono text-xl font-bold">
                  1
                </div>
                <h3 className="mt-6 text-[22px] font-bold text-[#0b2341] tracking-tight">Chọn gói & Tính phí</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4a6785]">
                  Chọn sản phẩm, số chỗ ngồi hoặc quyền lợi mong muốn. Hệ thống tự động tính mức phí chính xác tức thì.
                </p>
              </div>

              <div className="rounded-[18px] bg-white p-8 text-center border border-[#cce0f5] shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0066cc] text-white font-mono text-xl font-bold">
                  2
                </div>
                <h3 className="mt-6 text-[22px] font-bold text-[#0b2341] tracking-tight">Xác nhận & Thanh toán</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4a6785]">
                  Quét mã VietQR chuyển khoản nhanh chóng hoặc thanh toán qua thẻ ngân hàng, an toàn 100%.
                </p>
              </div>

              <div className="rounded-[18px] bg-white p-8 text-center border border-[#cce0f5] shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0066cc] text-white font-mono text-xl font-bold">
                  3
                </div>
                <h3 className="mt-6 text-[22px] font-bold text-[#0b2341] tracking-tight">Nhận giấy chứng nhận</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4a6785]">
                  Giấy chứng nhận điện tử có mã QR của BIC được gửi thẳng vào Zalo và Email của bạn trong 2 phút.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            TILE 5 (BIC White & Gold Banner Surface): CTA & TRUST
            ==================================================================== */}
        <section className="bg-[#f4f8fd] py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="rounded-[24px] bg-white p-10 lg:p-16 text-center border border-[#cce0f5] shadow-[0_14px_40px_rgba(7,25,47,0.06)]">
              <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#0066cc]">
                SẴN SÀNG AN TÂM CÙNG BẢO AN TÂY NGUYÊN
              </span>
              <h2 className="mt-4 text-[34px] font-bold tracking-tight text-[#0b2341] lg:text-[46px]">
                Tính phí và nhận bảo hiểm ngay hôm nay
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-[#4a6785]">
                Không mất thời gian chờ đợi, không thủ tục rườm rà. Hệ thống tư vấn chính xác, cấp đơn tức thì 24/7.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/bao-gia"
                  className="rounded-full bg-[#0066cc] px-8 py-3.5 text-[17px] font-semibold text-white transition-transform duration-150 hover:bg-[#0052b3] active:scale-95 shadow-md inline-flex items-center gap-2"
                >
                  <Icon name="calculator" size={18} />
                  <span>Tính phí ngay</span>
                </Link>
                <a
                  href="tel:0396998765"
                  className="rounded-full border border-[#0066cc] bg-transparent px-7 py-3.5 text-[17px] font-semibold text-[#0066cc] transition-transform duration-150 hover:bg-[#0066cc]/10 active:scale-95 inline-flex items-center gap-2"
                >
                  <Icon name="phone" size={18} />
                  <span>Gọi SĐT: 0396998765</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}




