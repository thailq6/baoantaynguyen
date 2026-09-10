import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Bảo Hiểm AI — Mua bảo hiểm thông minh cùng AI | Bảo lãnh bởi BIC",
    template: "%s | Bảo Hiểm AI",
  },
  description: "Trợ lý AI tư vấn đúng nhu cầu, tính phí tức thì và cấp giấy chứng nhận điện tử ngay. Ô tô, xe máy, sức khỏe, du lịch, nhà — sản phẩm chính hãng bảo lãnh bởi BIC (BIDV).",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" >
      <body className={`${inter.variable} min-h-screen bg-[#f7fbfa] text-[#103b3b] font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}



