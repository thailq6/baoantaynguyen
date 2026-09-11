import { InteriorPage } from "../../components/layout/interior-page";

export const metadata = { title: "Câu hỏi thường gặp" };

export default function FaqPage() {
  const rows = [
    ["Giấy chứng nhận điện tử có giá trị khi CSGT kiểm tra không?", "Theo quy định hiện hành, giấy chứng nhận bảo hiểm điện tử được cấp đúng quy định có thể được xuất trình để đối chiếu. Với sản phẩm BIC, thông tin trên giấy chứng nhận có thể được kiểm tra bằng mã số hoặc mã QR."],
    ["Báo giá trên hệ thống có phải phí chính thức không?", "Không. Mức phí hiển thị trên website là mức tham khảo để bạn dự trù ngân sách. Phí, quyền lợi và điều kiện chính thức phụ thuộc thông tin kê khai, quy tắc sản phẩm và xác nhận phát hành của BIC."],
    ["Sau khi thanh toán bao lâu thì nhận được giấy chứng nhận?", "Thời gian phát hành phụ thuộc vào việc xác nhận thông tin và quy trình của sản phẩm. Với sản phẩm đủ điều kiện cấp điện tử, BIC có thể gửi giấy chứng nhận qua email hoặc kênh điện tử đã đăng ký. Website hiện là bản mô phỏng và chưa kết nối phát hành thật."],
    ["Khi xảy ra tai nạn va chạm, tôi cần liên hệ ai?", "Bạn hãy giữ an toàn, chụp ảnh hiện trường và gọi Hotline BIC 1900 9456 hoặc liên hệ SĐT hỗ trợ 0396998765 để được hướng dẫn xử lý bồi thường kịp thời."],
    ["Bảo An Tây Nguyên là gì?", "Bảo An Tây Nguyên là nền tảng tư vấn và mua bảo hiểm trực tuyến, giúp khách hàng xem sản phẩm, tham khảo mức phí, lựa chọn quyền lợi và chuẩn bị thông tin trước khi trao đổi với tư vấn viên. Sản phẩm được phát hành theo quy trình của BIC khi đủ điều kiện."],
    ["Mua bảo hiểm qua Bảo An Tây Nguyên có hợp lệ không?", "Việc mua bảo hiểm trực tuyến hợp lệ khi hợp đồng hoặc giấy chứng nhận được phát hành bởi doanh nghiệp bảo hiểm được phép triển khai sản phẩm. Với sản phẩm BIC, giấy chứng nhận điện tử cần có đầy đủ thông tin theo quy định và có thể được đối chiếu bằng mã số hoặc mã QR."],
    ["Tư vấn trực tuyến có chính xác không?", "Công cụ trên website giúp bạn tham khảo sản phẩm và cách tính phí theo thông tin đã nhập. Kết quả không thay thế tư vấn, thẩm định hoặc xác nhận chính thức của BIC; các trường hợp đặc thù nên được tư vấn viên kiểm tra thêm."],
    ["TNDS xe máy giá bao nhiêu?", "Theo Phụ lục I Nghị định 67/2023/NĐ-CP, phí gốc một năm chưa gồm VAT là 55.000 đồng với mô tô hai bánh dưới 50cc, 60.000 đồng với mô tô hai bánh từ 50cc trở lên và 55.000 đồng với xe máy điện. Mức thu thực tế cần đối chiếu VAT, loại xe và quy định đang áp dụng."],
    ["Không mua bảo hiểm TNDS có bị phạt không?", "Có thể bị xử phạt nếu không có hoặc không mang theo giấy chứng nhận TNDS còn hiệu lực. Mức phạt phụ thuộc loại phương tiện và quy định hiện hành tại thời điểm kiểm tra; bạn nên xem văn bản pháp luật mới nhất hoặc hỏi tư vấn viên."],
    ["Tại sao nên mua bảo hiểm TNDS bắt buộc?", "Đây là loại bảo hiểm bắt buộc đối với nhóm xe thuộc phạm vi pháp luật quy định. Khi phát sinh thiệt hại thuộc phạm vi, doanh nghiệp bảo hiểm chi trả trách nhiệm dân sự cho bên thứ ba trong giới hạn và điều kiện của hợp đồng, giúp chủ xe chủ động hơn về tài chính."],
    ["Mua bảo hiểm online tại Bảo An Tây Nguyên có uy tín không?", "Bạn nên kiểm tra tên doanh nghiệp phát hành, mã số hoặc mã QR trên giấy chứng nhận, quy tắc sản phẩm và thông tin liên hệ chính thức trước khi thanh toán. Bảo An Tây Nguyên cung cấp nội dung tham khảo và hỗ trợ kết nối; sản phẩm chỉ có hiệu lực khi được BIC xác nhận phát hành theo đúng quy trình."],
  ];

  return (
    <InteriorPage
      eyebrow="HỎI ĐÁP & HỖ TRỢ"
      title={<>Những thắc mắc thường gặp<br /><span className="text-[#0066cc]">về bảo hiểm điện tử BIC.</span></>}
      intro="Nếu chưa thấy câu trả lời bạn cần, hãy kết nối ngay qua SĐT 0396998765 hoặc nhắn tin Zalo Bảo An Tây Nguyên."
    >
      <section className="mx-auto max-w-[900px] px-5 py-16 lg:px-8">
        <div className="border-t border-[#cce0f5]">
          {rows.map(([q, a], i) => (
            <details key={q} open={i === 0} className="border-b border-[#cce0f5] py-6 group">
              <summary className="flex cursor-pointer list-none justify-between text-base font-semibold text-[#0b2341] group-open:text-[#0066cc]">
                {q}
                <span className="text-[#0066cc] text-xl leading-none">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-[#4a6785]">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </InteriorPage>
  );
}
