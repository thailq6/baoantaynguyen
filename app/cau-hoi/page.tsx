import { InteriorPage } from "../../components/layout/interior-page";

export const metadata = { title: "Câu hỏi thường gặp" };

export default function FaqPage() {
  const rows = [
    ["Giấy chứng nhận điện tử có giá trị khi CSGT kiểm tra không?", "Hoàn toàn có giá trị. Theo Nghị định 67/2023/NĐ-CP, Giấy chứng nhận bảo hiểm điện tử có mã QR của BIC có giá trị pháp lý tương đương bản giấy truyền thống. Khi CSGT kiểm tra, bạn chỉ cần mở hình ảnh trên điện thoại để quét mã QR."],
    ["Báo giá trên hệ thống có phải phí chính thức không?", "Chính xác 100%. Phí bảo hiểm bắt buộc TNDS được áp dụng theo đúng quy định biểu phí của Bộ Tài Chính và hệ thống BIC API Live. Bạn thanh toán đúng số tiền hiển thị mà không có phụ phí."],
    ["Sau khi thanh toán bao lâu thì nhận được giấy chứng nhận?", "Chỉ từ 1 - 3 phút. Sau khi hoàn tất chuyển khoản VietQR hoặc thẻ, hệ thống AI tự động kết nối API BIC cấp đơn và gửi file PDF có mã QR về Zalo và Email của bạn ngay lập tức."],
    ["Khi xảy ra tai nạn va chạm, tôi cần liên hệ ai?", "Bạn hãy giữ an toàn, chụp ảnh hiện trường và gọi ngay Hotline BIC 1900 9456 hoặc liên hệ hotline hỗ trợ 0949 013 668 để được hướng dẫn xử lý bồi thường kịp thời."],
  ];

  return (
    <InteriorPage
      eyebrow="HỎI ĐÁP & HỖ TRỢ"
      title={<>Những thắc mắc thường gặp<br /><span className="text-[#006b66]">về bảo hiểm điện tử BIC.</span></>}
      intro="Nếu chưa thấy câu trả lời bạn cần, hãy kết nối ngay với AI tư vấn hoặc hotline 0949 013 668."
    >
      <section className="mx-auto max-w-[900px] px-5 py-16 lg:px-8">
        <div className="border-t border-[#d5e5e2]">
          {rows.map(([q, a], i) => (
            <details key={q} open={i === 0} className="border-b border-[#d5e5e2] py-6 group">
              <summary className="flex cursor-pointer list-none justify-between text-base font-semibold text-[#103b3b] group-open:text-[#006b66]">
                {q}
                <span className="text-[#006b66] text-xl leading-none">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-[#6f8585]">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </InteriorPage>
  );
}


