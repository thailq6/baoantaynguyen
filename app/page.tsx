import Link from "next/link";
import { ProductCard } from "../components/products/product-card";
import { QuickQuote } from "../components/quote/quick-quote";
import { Icon } from "../components/ui/icon";
import { insuranceProducts } from "../config/products";

export default function HomePage() {
  return (
    <>
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
                Hệ thống tư vấn đúng nhu cầu, tính phí tham khảo tức thì và hỗ trợ chuẩn bị hồ sơ phát hành. Ô tô, xe máy, sức khỏe, nhân thọ, du lịch.
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
                  href="tel:0916201085"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#0066cc] bg-white/80 px-6 py-3.5 text-[17px] font-semibold text-[#0066cc] transition-transform duration-150 hover:bg-[#0066cc]/10 active:scale-95 shadow-sm"
                >
                  <Icon name="phone" size={18} className="text-[#0066cc]" />
                  <span>Tư vấn SĐT: 0916 201 085</span>
                </a>
              </div>

              {/* Key Trust Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#cce0f5] pt-8 w-full max-w-[540px]">
                <div>
                  <div className="text-[24px] font-bold tracking-tight text-[#0066cc]">Nhanh</div>
                  <div className="mt-1 text-[13px] text-[#4a6785] font-medium">Gửi yêu cầu tư vấn</div>
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
                Xem phí minh họa nhanh, chuẩn bị thông tin gọn và được tư vấn viên xác nhận trước khi phát hành chính thức.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  icon: "calculator",
                  title: "Tính phí tức thì",
                  desc: "Công cụ hiển thị phí minh họa theo dữ liệu đã chọn để bạn dự trù ngân sách trước khi tư vấn.",
                },
                {
                  step: "02",
                  icon: "award",
                  title: "Chuẩn bị hồ sơ gọn",
                  desc: "Tập hợp thông tin cần thiết để tư vấn viên kiểm tra điều kiện và hướng dẫn phát hành qua kênh chính thức.",
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
                3 bước để gửi yêu cầu mua bảo hiểm
              </h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="rounded-[18px] bg-white p-8 text-center border border-[#cce0f5] shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0066cc] text-white font-mono text-xl font-bold">
                  1
                </div>
                <h3 className="mt-6 text-[22px] font-bold text-[#0b2341] tracking-tight">Chọn gói & Tính phí</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4a6785]">
                  Chọn sản phẩm, số chỗ ngồi hoặc quyền lợi mong muốn. Hệ thống hiển thị mức phí minh họa để tham khảo.
                </p>
              </div>

              <div className="rounded-[18px] bg-white p-8 text-center border border-[#cce0f5] shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0066cc] text-white font-mono text-xl font-bold">
                  2
                </div>
                <h3 className="mt-6 text-[22px] font-bold text-[#0b2341] tracking-tight">Xác nhận thông tin</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4a6785]">
                  Kiểm tra thông tin chủ xe/người tham gia và gửi yêu cầu để tư vấn viên đối chiếu.
                </p>
              </div>

              <div className="rounded-[18px] bg-white p-8 text-center border border-[#cce0f5] shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0066cc] text-white font-mono text-xl font-bold">
                  3
                </div>
                <h3 className="mt-6 text-[22px] font-bold text-[#0b2341] tracking-tight">Hoàn tất qua tư vấn viên</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4a6785]">
                  Phí, điều kiện và giấy chứng nhận chính thức chỉ có hiệu lực sau khi doanh nghiệp bảo hiểm xác nhận phát hành.
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
                Tính phí và gửi yêu cầu hôm nay
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-[#4a6785]">
                Nhập thông tin một lần, xem phí minh họa và kết nối tư vấn viên để hoàn tất đúng quy trình.
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
                  href="tel:0916201085"
                  className="rounded-full border border-[#0066cc] bg-transparent px-7 py-3.5 text-[17px] font-semibold text-[#0066cc] transition-transform duration-150 hover:bg-[#0066cc]/10 active:scale-95 inline-flex items-center gap-2"
                >
                  <Icon name="phone" size={18} />
                  <span>Gọi SĐT: 0916 201 085</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}



