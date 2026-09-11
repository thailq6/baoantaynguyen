import { InteriorPage } from "../../components/layout/interior-page";

export const metadata = { title: "Hướng dẫn bồi thường" };

export default function ClaimsPage() {
  return (
    <InteriorPage
      eyebrow="QUY TRÌNH BỒI THƯỜNG"
      title={<>Xử lý sự cố nhanh gọn.<br /><span className="text-[#0066cc]">Bảo vệ quyền lợi tối đa.</span></>}
      intro="Quy trình bồi thường được hỗ trợ tự động qua hệ thống số của BIC và Bảo An Tây Nguyên, giúp rút ngắn thời gian xử lý hồ sơ."
    >
      <section className="mx-auto max-w-[900px] px-5 py-16 lg:px-8">
        <div className="space-y-4">
          {[
            ["01", "Đảm bảo an toàn", "Ưu tiên cứu chữa người và hạn chế tổn thất tài sản trước tiên."],
            ["02", "Ghi nhận hiện trường & chụp ảnh", "Chụp ảnh tổn thất toàn cảnh và cận cảnh, thời gian, địa điểm xảy ra sự việc."],
            ["03", "Liên hệ Hotline BIC hoặc Bảo An Tây Nguyên", "Gọi SĐT 0396998765 hoặc hotline BIC 1900 9456 để thông báo sự cố."],
            ["04", "Nộp hồ sơ bồi thường trực tuyến", "Tải ảnh hóa đơn, chứng từ qua Zalo hoặc cổng thông tin để hoàn tất thủ tục bồi thường."],
          ].map(([n, t, d]) => (
            <div key={n} className="flex gap-6 rounded-[8px] border border-[#cce0f5] bg-[#ffffff] p-6">
              <span className="font-mono text-2xl font-bold text-[#0066cc]">{n}</span>
              <div>
                <h2 className="text-lg font-semibold text-[#0b2341]">{t}</h2>
                <p className="mt-2 text-sm text-[#4a6785]">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </InteriorPage>
  );
}

