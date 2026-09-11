import { InteriorPage } from "../../components/layout/interior-page";

export const metadata = { title: "Giới thiệu Bảo An Tây Nguyên" };

export default function AboutPage() {
  return (
    <InteriorPage
      eyebrow="VỀ BẢO AN TÂY NGUYÊN"
      title={<>Nền tảng bảo hiểm thế hệ mới<br /><span className="text-[#0066cc]">kết hợp công nghệ số và bảo lãnh BIC.</span></>}
      intro="Bảo An Tây Nguyên mang đến trải nghiệm tham khảo phí, chuẩn bị hồ sơ và kết nối tư vấn bảo hiểm minh bạch."
    >
      <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-normal tracking-tight text-[#0b2341] lg:text-3xl">
            Đơn giản hóa trải nghiệm bảo hiểm phức tạp.
          </h2>
          <p className="text-sm leading-relaxed text-[#4a6785]">
            Chúng tôi ứng dụng công cụ số để phân tích nhu cầu, tính phí minh họa và giúp khách hàng chuẩn bị thông tin trước khi trao đổi với tư vấn viên.
          </p>
          <div className="rounded-[18px] border border-[#cce0f5] bg-[#ffffff] p-6">
            <h3 className="text-base font-semibold text-[#0066cc]">Đối tác chiến lược BIC (BIDV)</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#4a6785]">
              Hợp đồng và giấy chứng nhận chỉ có hiệu lực sau khi được doanh nghiệp bảo hiểm xác nhận phát hành theo đúng quy trình sản phẩm.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[18px] border border-[#cce0f5] bg-[#ffffff] p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <img
              src="/image/baoan.jpg"
              alt="Bảo An Tây Nguyên"
              className="h-12 w-12 rounded-full object-cover border border-[#0066cc]/40 shadow-sm"
            />
            <div>
              <div className="text-lg font-bold text-[#0b2341]">Bảo An Tây Nguyên</div>
              <div className="font-mono text-xs font-semibold text-[#0066cc]">TƯ VẤN VÀ HỖ TRỢ HỒ SƠ BẢO HIỂM</div>
            </div>
          </div>
          <p className="my-8 text-xl font-normal leading-relaxed text-[#4a6785]">
            “Xem phí tham khảo nhanh, chuẩn bị thông tin rõ ràng và hoàn tất phát hành qua quy trình chính thức.”
          </p>
          <div className="font-mono text-xs text-[#4a6785]">
            HỆ THỐNG PHÂN PHỐI BẢO HIỂM SỐ 4.0
          </div>
        </div>
      </section>
    </InteriorPage>
  );
}


