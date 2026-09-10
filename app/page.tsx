import Link from "next/link";
import { SiteHeader } from "../components/layout/site-header";
import { SiteFooter } from "../components/layout/site-footer";
import { ProductCard } from "../components/products/product-card";
import { QuickQuote } from "../components/quote/quick-quote";
import { Icon } from "../components/ui/icon";
import { insuranceProducts } from "../config/products";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7fbfa] text-[#103b3b]">
      <SiteHeader />

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-[#d5e5e2] bg-[radial-gradient(circle_at_85%_20%,#d7f1ec,transparent_35%),linear-gradient(135deg,#f7fbfa_0%,#e7f5f1_100%)] py-14 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            {/* Hero Left Content */}
            <div className="flex flex-col items-start">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d5e5e2] bg-[#ffffff] px-3.5 py-1.5 text-xs text-[#006b66]">
                <span>🤖</span>
                <span className="font-mono uppercase tracking-wider text-[11px] font-semibold text-[#006b66]">
                  BẢO HIỂM ỨNG DỤNG AI · BẢO LÃNH BỞI BIC
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="mt-6 text-[38px] font-normal leading-[1.15] tracking-[-0.9px] text-[#103b3b] sm:text-[50px] lg:text-[60px] lg:leading-[64px]">
                Mua bảo hiểm thông minh cùng AI — cấp đơn trong vài phút
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-[560px] text-[16px] leading-[26px] text-[#456464] lg:text-[18px]">
                Trợ lý AI tư vấn đúng nhu cầu, tính phí tức thì và cấp giấy chứng nhận điện tử ngay. Ô tô, xe máy, sức khỏe, du lịch, nhà — sản phẩm chính hãng bảo lãnh bởi BIC (BIDV).
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/bao-gia"
                  className="inline-flex items-center justify-center rounded-[6px] bg-[#006b66] px-6 py-3.5 text-[15px] font-semibold text-[#f7fbfa] transition-colors hover:bg-[#0b8f86]"
                >
                  Xem sản phẩm & tính phí
                </Link>
                <a
                  href="tel:0949013668"
                  className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-[#006b66] bg-transparent px-5 py-3.5 text-[15px] font-semibold text-[#006b66] transition-colors hover:bg-[#006b66]/10"
                >
                  <span>☎</span> Tư vấn 0949 013 668
                </a>
              </div>

              {/* Stat Highlights */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#d5e5e2] pt-8 w-full max-w-[540px]">
                <div>
                  <div className="text-[20px] font-bold text-[#103b3b]">Vài phút</div>
                  <div className="mt-1 text-xs text-[#6f8585]">AI cấp giấy chứng nhận</div>
                </div>
                <div>
                  <div className="text-[20px] font-bold text-[#103b3b]">24/7</div>
                  <div className="mt-1 text-xs text-[#6f8585]">trợ lý AI tư vấn</div>
                </div>
                <div>
                  <div className="text-[20px] font-bold text-[#103b3b]">BIC</div>
                  <div className="mt-1 text-xs text-[#6f8585]">bảo lãnh bởi BIDV</div>
                </div>
              </div>
              <div className="mt-8 overflow-hidden rounded-[20px] border border-[#d5e5e2] bg-white shadow-[0_18px_50px_rgba(0,77,74,0.12)]">
                <img src="/image/family.jpg" alt="Gia đình an tâm tận hưởng cuộc sống" className="h-48 w-full object-cover sm:h-56" />
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-sm font-semibold text-[#103b3b]">Bảo vệ điều bạn yêu thương</span>
                  <span className="rounded-full bg-[#fdf3d7] px-3 py-1 text-xs font-bold text-[#a66a00]">BIC đồng hành</span>
                </div>
              </div>
            </div>

            {/* Hero Right Widget */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute -inset-5 rounded-[28px] bg-[#006b66]/10 blur-2xl" aria-hidden="true" />
              <div className="relative z-10 w-full max-w-[480px]">
                <QuickQuote />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: VÌ SAO CHỌN BẢO HIỂM AI */}
        <section id="vi-sao-chon" className="border-b border-[#d5e5e2] bg-[#f7fbfa] py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="text-center">
              <p className="font-mono text-[13px] font-semibold uppercase tracking-[2.52px] text-[#006b66]">
                VÌ SAO CHỌN BẢO HIỂM AI
              </p>
              <h2 className="mt-3 text-[30px] font-normal leading-tight tracking-[-0.9px] text-[#103b3b] lg:text-[42px]">
                Trải nghiệm mua bảo hiểm thông minh nhất Việt Nam
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[16px] text-[#6f8585]">
                Sức mạnh của AI cho tốc độ và sự chính xác — quyền lợi được bảo chứng bởi Tổng Công ty Bảo hiểm BIDV (BIC).
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Tính phí tức thì",
                  desc: "Nhập thông số xe hoặc thông tin cá nhân, AI tính phí chính xác theo quy chuẩn Bộ Tài Chính và BIC chỉ trong 1 giây.",
                },
                {
                  step: "02",
                  title: "Cấp giấy chứng nhận ngay",
                  desc: "Giấy chứng nhận điện tử có mã QR xác thực hợp lệ theo Nghị định 67/2023/NĐ-CP, lưu trữ trực tuyến an toàn.",
                },
                {
                  step: "03",
                  title: "Bảo lãnh bởi BIC",
                  desc: "BIC là đơn vị thành viên của BIDV — Top 5 công ty bảo hiểm phi nhân thọ uy tín nhất thị trường Việt Nam.",
                },
                {
                  step: "04",
                  title: "Hỗ trợ bồi thường số",
                  desc: "Chụp ảnh tổn thất và nộp hồ sơ trực tiếp qua Zalo/Portal. AI quét hóa đơn, đối chiếu điều khoản và hỗ trợ bồi thường nhanh.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-[8px] border border-[#d5e5e2] bg-[#ffffff] p-6 transition duration-200 hover:border-[#006b66]/60"
                >
                  <div className="font-mono text-xs font-semibold text-[#006b66]">
                    {item.step} // FEATURE
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold text-[#103b3b]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#6f8585]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: DANH MỤC SẢN PHẨM */}
        <section className="border-b border-[#d5e5e2] bg-[#f7fbfa] py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[13px] font-semibold uppercase tracking-[2.52px] text-[#006b66]">
                  SẢN PHẨM CHỦ LỰC
                </p>
                <h2 className="mt-3 text-[30px] font-normal leading-tight tracking-[-0.9px] text-[#103b3b] lg:text-[38px]">
                  Bảo hiểm chính hãng BIC tích hợp AI
                </h2>
              </div>
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#006b66] transition-colors hover:text-[#0b8f86]"
              >
                Xem tất cả 12 gói bảo hiểm <Icon name="arrow" size={14} />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {insuranceProducts.slice(0, 6).map((product) => (
                <ProductCard key={product[0]} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: QUY TRÌNH 3 BƯỚC */}
        <section id="quy-trinh" className="border-b border-[#d5e5e2] bg-[#f7fbfa] py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="text-center">
              <p className="font-mono text-[13px] font-semibold uppercase tracking-[2.52px] text-[#006b66]">
                QUY TRÌNH ĐƠN GIẢN
              </p>
              <h2 className="mt-3 text-[30px] font-normal leading-tight tracking-[-0.9px] text-[#103b3b] lg:text-[40px]">
                3 bước để nhận giấy chứng nhận điện tử
              </h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="rounded-[8px] border border-[#d5e5e2] bg-[#ffffff] p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#006b66] bg-[#f7fbfa] font-mono text-lg font-bold text-[#006b66]">
                  1
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#103b3b]">Chọn gói & Tính phí</h3>
                <p className="mt-3 text-sm text-[#6f8585]">
                  Chọn sản phẩm, số chỗ ngồi hoặc quyền lợi mong muốn. AI tự động tính mức phí chính xác tức thì.
                </p>
              </div>

              <div className="rounded-[8px] border border-[#d5e5e2] bg-[#ffffff] p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#006b66] bg-[#f7fbfa] font-mono text-lg font-bold text-[#006b66]">
                  2
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#103b3b]">Xác nhận & Thanh toán</h3>
                <p className="mt-3 text-sm text-[#6f8585]">
                  Quét mã VietQR chuyển khoản nhanh chóng hoặc thanh toán thẻ tiện lợi, an toàn 100%.
                </p>
              </div>

              <div className="rounded-[8px] border border-[#d5e5e2] bg-[#ffffff] p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#006b66] bg-[#f7fbfa] font-mono text-lg font-bold text-[#006b66]">
                  3
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#103b3b]">Nhận giấy chứng nhận</h3>
                <p className="mt-3 text-sm text-[#6f8585]">
                  Giấy chứng nhận điện tử có mã QR của BIC được gửi thẳng vào Zalo và email trong 2 phút.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CTA BANNER */}
        <section className="bg-[#f7fbfa] py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="rounded-[12px] border border-[#006b66]/40 bg-gradient-to-b from-[#ffffff] to-[#f7fbfa] p-8 lg:p-14 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[#006b66]">
                SẴN SÀNG AN TÂM CÙNG AI
              </span>
              <h2 className="mt-4 text-[32px] font-normal tracking-tight text-[#103b3b] lg:text-[44px]">
                Tính phí và nhận bảo hiểm ngay hôm nay
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] text-[#456464]">
                Không mất thời gian chờ đợi, không thủ tục rườm rà. Tư vấn chính xác, cấp đơn tức thì 24/7.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/bao-gia"
                  className="rounded-[6px] bg-[#006b66] px-6 py-3.5 text-sm font-semibold text-[#f7fbfa] transition-colors hover:bg-[#0b8f86]"
                >
                  Tính phí ngay
                </Link>
                <a
                  href="tel:0949013668"
                  className="rounded-[6px] border border-[#d5e5e2] bg-[#f7fbfa] px-6 py-3.5 text-sm font-semibold text-[#103b3b] transition-colors hover:border-[#006b66] hover:text-[#006b66]"
                >
                  Gọi hotline 0949 013 668
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


