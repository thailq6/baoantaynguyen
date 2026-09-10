import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bảo An Tây Nguyên — Mua bảo hiểm trực tuyến tiện lợi | Bảo lãnh bởi BIC",
    template: "%s | Bảo An Tây Nguyên",
  },
  description: "Hệ thống tư vấn đúng nhu cầu, tính phí tức thì và cấp giấy chứng nhận điện tử ngay. Ô tô, xe máy, sức khỏe, du lịch, nhà — sản phẩm chính hãng bảo lãnh bởi BIC (BIDV).",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-[#f4faf8] text-[#103b3b] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}




