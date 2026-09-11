import type { Metadata } from "next";
import "./globals.css";

import { MobileActionBar } from "../components/layout/mobile-action-bar";

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
      <body className="min-h-screen bg-[#f4f8fd] text-[#0b2341] font-sans antialiased pb-16 lg:pb-0">
        {children}
        <MobileActionBar />
      </body>
    </html>
  );
}




