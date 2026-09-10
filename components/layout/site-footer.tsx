import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d5e5e2] bg-[#f7fbfa] text-[#456464]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2.5 text-white">
            <img src="/image/bic-logo.png" alt="BIC" className="h-10 w-auto object-contain" />
            <span className="text-[17px] font-bold tracking-tight text-[#103b3b]">Bảo hiểm BIC</span>
          </div>
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[#6f8585]">
            Nền tảng mua bảo hiểm trực tuyến tích hợp trí tuệ nhân tạo. Phục vụ 24/7, tính phí minh bạch và cấp đơn điện tử tức thì. Bảo lãnh bởi BIC (BIDV).
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#006b66]">
            <span className="h-2 w-2 rounded-full bg-[#006b66] animate-pulse"></span>
            BIC API LIVE · MVL/BIC_MVL_2025
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[2.52px] text-[#103b3b]">
            SẢN PHẨM
          </h4>
          {[
            ["Bảo hiểm TNDS ô tô", "/san-pham/bao-hiem-o-to"],
            ["Bảo hiểm xe máy điện tử", "/san-pham/bao-hiem-xe-may"],
            ["Bảo hiểm sức khỏe BIC", "/san-pham/bao-hiem-suc-khoe"],
            ["Bảo hiểm du lịch quốc tế", "/san-pham/bao-hiem-du-lich"],
            ["Bảo hiểm cháy nổ & nhà ở", "/san-pham/bao-hiem-nha-o"],
          ].map(([t, h]) => (
            <Link className="mb-3 block text-[14px] text-[#6f8585] transition-colors hover:text-[#006b66]" href={h} key={t}>
              {t}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[2.52px] text-[#103b3b]">
            HỖ TRỢ & HƯỚNG DẪN
          </h4>
          {[
            ["Quy trình bồi thường số", "/boi-thuong"],
            ["Câu hỏi thường gặp (FAQ)", "/cau-hoi"],
            ["Cẩm nang luật bảo hiểm", "/cam-nang"],
            ["Tra cứu giấy chứng nhận", "/cau-hoi"],
            ["Trung tâm tư vấn AI", "/lien-he"],
          ].map(([t, h]) => (
            <Link className="mb-3 block text-[14px] text-[#6f8585] transition-colors hover:text-[#006b66]" href={h} key={t}>
              {t}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[2.52px] text-[#103b3b]">
            KẾT NỐI & TƯ VẤN
          </h4>
          <p className="mb-2 text-[14px] text-[#103b3b]">Hotline: <a href="tel:0949013668" className="text-[#006b66] hover:underline font-mono">0949 013 668</a></p>
          <p className="mb-2 text-[14px] text-[#6f8585]">Zalo OA: <a href="https://zalo.me" target="_blank" rel="noreferrer" className="text-[#006b66] hover:underline">Bảo Hiểm AI</a></p>
          <p className="mb-2 text-[14px] text-[#6f8585]">Hỗ trợ: 24/7 trực tuyến toàn quốc</p>
          <p className="text-[13px] text-[#6f8585]">Đối tác bảo hiểm: Tổng Công ty Bảo hiểm BIDV (BIC)</p>
        </div>
      </div>

      <div className="border-t border-[#d5e5e2] bg-[#f7fbfa]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-6 text-xs text-[#6f8585] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 Bảo Hiểm AI. Nền tảng phân phối bảo hiểm công nghệ cao.</span>
          <div className="flex gap-6">
            <Link href="/chinh-sach-bao-mat" className="hover:text-[#006b66]">Chính sách bảo mật</Link>
            <Link href="/dieu-khoan-su-dung" className="hover:text-[#006b66]">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}



