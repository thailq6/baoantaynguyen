import { InteriorPage } from "../../components/layout/interior-page";

export const metadata = { title: "Giới thiệu Bảo Hiểm AI" };

export default function AboutPage() {
  return (
    <InteriorPage
      eyebrow="VỀ BẢO HIỂM AI"
      title={<>Nền tảng bảo hiểm thế hệ mới<br /><span className="text-[#006b66]">kết hợp AI và bảo lãnh BIC.</span></>}
      intro="Bảo Hiểm AI mang đến giải pháp mua và quản lý bảo hiểm tự động, minh bạch, bảo lãnh chính hãng bởi Tổng Công ty Bảo hiểm BIDV (BIC)."
    >
      <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-normal tracking-tight text-[#103b3b] lg:text-3xl">
            Đơn giản hóa trải nghiệm bảo hiểm phức tạp.
          </h2>
          <p className="text-sm leading-relaxed text-[#6f8585]">
            Chúng tôi ứng dụng mô hình trí tuệ nhân tạo để phân tích nhu cầu, tính toán biểu phí chuẩn xác và tự động hóa toàn bộ quy trình phát hành chứng nhận bảo hiểm điện tử theo quy định của Bộ Tài chính.
          </p>
          <div className="rounded-[8px] border border-[#d5e5e2] bg-[#ffffff] p-6">
            <h3 className="text-base font-semibold text-[#006b66]">Đối tác chiến lược BIC (BIDV)</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#6f8585]">
              Mọi hợp đồng và giấy chứng nhận đều được cấp trực tiếp qua hệ thống API của BIC, đảm bảo giá trị pháp lý tuyệt đối và quyền lợi chi trả bồi thường trên toàn quốc.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[8px] border border-[#d5e5e2] bg-[#ffffff] p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#006b66] text-xl font-bold text-[#f7fbfa]">
              AI
            </span>
            <div>
              <div className="text-lg font-bold text-[#103b3b]">Bảo Hiểm AI</div>
              <div className="font-mono text-xs text-[#006b66]">POWERED BY BIC BIDV</div>
            </div>
          </div>
          <p className="my-8 text-xl font-normal leading-relaxed text-[#456464]">
            “Mua bảo hiểm thông minh cùng AI — cấp đơn trong vài phút, bảo vệ trọn vẹn mọi hành trình.”
          </p>
          <div className="font-mono text-xs text-[#6f8585]">
            HỆ THỐNG PHÂN PHỐI BẢO HIỂM SỐ 4.0
          </div>
        </div>
      </section>
    </InteriorPage>
  );
}


