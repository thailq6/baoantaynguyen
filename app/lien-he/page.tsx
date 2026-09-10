import { InteriorPage } from "../../components/layout/interior-page";
import { ContactForm } from "../../components/forms/contact-form";

export const metadata = { title: "Liên hệ tư vấn" };

export default function ContactPage() {
  return (
    <InteriorPage
      eyebrow="KẾT NỐI TƯ VẤN"
      title={<>Cần hỗ trợ tư vấn bảo hiểm?<br /><span className="text-[#006b66]">Đội ngũ AI và chuyên viên luôn sẵn sàng.</span></>}
      intro="Để lại thông tin hoặc liên hệ trực tiếp qua hotline/Zalo để nhận phản hồi trong vòng 3 phút."
    >
      <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="space-y-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[2.52px] text-[#006b66]">
              TRUNG TÂM HỖ TRỢ
            </p>
            <h2 className="mt-3 text-2xl font-normal text-[#103b3b] lg:text-3xl">
              Hỗ trợ đa kênh 24/7
            </h2>
          </div>

          <dl className="space-y-6 text-sm">
            <div className="rounded-[8px] border border-[#d5e5e2] bg-[#ffffff] p-4">
              <dt className="font-mono text-[11px] font-semibold tracking-wider text-[#006b66]">HOTLINE TRỰC TUYẾN</dt>
              <dd className="mt-1 font-mono text-lg font-bold text-[#103b3b]">0949 013 668</dd>
            </div>
            <div className="rounded-[8px] border border-[#d5e5e2] bg-[#ffffff] p-4">
              <dt className="font-mono text-[11px] font-semibold tracking-wider text-[#006b66]">ZALO OA CHÍNH THỨC</dt>
              <dd className="mt-1 text-base text-[#103b3b]">Bảo Hiểm AI - BIC</dd>
            </div>
            <div className="rounded-[8px] border border-[#d5e5e2] bg-[#ffffff] p-4">
              <dt className="font-mono text-[11px] font-semibold tracking-wider text-[#006b66]">ĐỐI TÁC BẢO HIỂM</dt>
              <dd className="mt-1 text-sm text-[#456464]">Tổng Công ty Bảo hiểm BIDV (BIC)</dd>
            </div>
          </dl>
        </div>

        <div>
          <ContactForm />
        </div>
      </section>
    </InteriorPage>
  );
}


