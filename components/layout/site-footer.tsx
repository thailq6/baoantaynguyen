import Link from "next/link";
import { Icon } from "../ui/icon";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#132c4c] bg-[#07192f] text-white">
      {/* Upper Links Section */}
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/image/baoan.jpg"
              alt="Bảo An Tây Nguyên"
              className="h-9 w-9 rounded-full object-cover border border-[#0066cc]/50"
            />
            <img src="/image/bic-logo.png" alt="BIC" className="h-8 w-auto object-contain brightness-110" />
            <span className="text-[18px] font-bold tracking-tight text-white">Bảo An Tây Nguyên</span>
          </div>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#94a3b8]">
            Nền tảng mua bảo hiểm trực tuyến thông minh. Phục vụ 24/7, tính phí tức thì và cấp giấy chứng nhận điện tử hợp lệ theo quy định Bộ Tài Chính.
          </p>
          <div className="mt-5 flex items-center gap-2 text-[12px] font-mono text-[#60a5fa] font-semibold">
            <span className="h-2 w-2 rounded-full bg-[#3b82f6] animate-pulse"></span>
            BIC ONLINE LIVE · MVL/BIC_2026
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em] text-[#60a5fa]">
            SẢN PHẨM BẢO HIỂM
          </h4>
          <ul className="space-y-1 text-[14px] leading-[2.2]">
            {[
              ["Bảo hiểm TNDS Ô tô", "/san-pham/bao-hiem-o-to"],
              ["Bảo hiểm Xe máy điện tử", "/san-pham/bao-hiem-xe-may"],
              ["Bảo hiểm Sức khỏe BIC", "/san-pham/bao-hiem-suc-khoe"],
              ["Bảo hiểm Nhân thọ", "/san-pham/bao-hiem-nhan-tho"],
              ["Bảo hiểm Tai nạn cá nhân", "/san-pham/bao-hiem-tai-nan"],
              ["Bảo hiểm Du lịch Quốc tế", "/san-pham/bao-hiem-du-lich"],
            ].map(([t, h]) => (
              <li key={t}>
                <Link className="text-[#cbd5e1] transition-colors hover:text-[#60a5fa] font-medium" href={h}>
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em] text-[#60a5fa]">
            HỖ TRỢ KHÁCH HÀNG
          </h4>
          <ul className="space-y-1 text-[14px] leading-[2.2]">
            {[
              ["Quy trình Bồi thường số", "/boi-thuong"],
              ["Câu hỏi thường gặp (FAQ)", "/cau-hoi"],
              ["Cẩm nang Luật bảo hiểm", "/cam-nang"],
              ["Tra cứu Hợp đồng BIC", "/cau-hoi"],
              ["Trung tâm tư vấn 24/7", "/lien-he"],
            ].map(([t, h]) => (
              <li key={t}>
                <Link className="text-[#cbd5e1] transition-colors hover:text-[#60a5fa] font-medium" href={h}>
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em] text-[#60a5fa]">
            LIÊN HỆ & BẢO LÃNH
          </h4>
          <div className="space-y-2 text-[14px] text-[#cbd5e1]">
            <p className="flex items-center gap-2">
              <Icon name="phone" size={15} className="text-[#60a5fa]" />
              <span>SĐT: <a href="tel:0396998765" className="font-mono font-bold text-[#60a5fa] hover:underline">0396998765</a></span>
            </p>
            <p className="flex items-center gap-2">
              <Icon name="message" size={15} className="text-[#60a5fa]" />
              <span>Zalo OA: <a href="https://zalo.me" target="_blank" rel="noreferrer" className="text-[#60a5fa] font-semibold hover:underline">Bảo An Tây Nguyên</a></span>
            </p>
            <p className="text-[13px] text-[#94a3b8] mt-3 leading-relaxed">
              Đơn vị bảo lãnh: Tổng Công ty Bảo hiểm BIDV (BIC) — Top 5 Bảo hiểm phi nhân thọ uy tín nhất Việt Nam.
            </p>
          </div>
        </div>
      </div>

      {/* Fine-print Legal Bar */}
      <div className="border-t border-[#132c4c] bg-[#040f1e]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-6 text-[12px] text-[#94a3b8] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 Bảo An Tây Nguyên. Giấy chứng nhận điện tử phát hành theo Nghị định 67/2023/NĐ-CP.</span>
          <div className="flex gap-6">
            <Link href="/chinh-sach-bao-mat" className="hover:text-[#60a5fa]">Chính sách bảo mật</Link>
            <Link href="/dieu-khoan-su-dung" className="hover:text-[#60a5fa]">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}




