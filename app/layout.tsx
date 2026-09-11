import type { Metadata } from "next";
import "./globals.css";

import { SiteHeader } from "../components/layout/site-header";
import { SiteFooter } from "../components/layout/site-footer";
import { MobileActionBar } from "../components/layout/mobile-action-bar";

export const metadata: Metadata = {
  title: {
    default: "Bảo An Tây Nguyên — Mua bảo hiểm trực tuyến tiện lợi | Bảo lãnh bởi BIC",
    template: "%s | Bảo An Tây Nguyên",
  },
  description: "Hệ thống tư vấn đúng nhu cầu, tính phí tham khảo tức thì và hỗ trợ chuẩn bị hồ sơ bảo hiểm ô tô, xe máy, sức khỏe, du lịch, nhà.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-[#f4f8fd] text-[#0b2341] font-sans antialiased pb-16 lg:pb-0 flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}



