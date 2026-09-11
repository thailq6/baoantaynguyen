import Link from "next/link";
import { InteriorPage } from "../../components/layout/interior-page";

export const metadata = { title: "Cẩm nang bảo hiểm" };

export default function GuidePage() {
  const posts = [
    ["01", "Quy định mới về bảo hiểm bắt buộc TNDS ô tô xe máy", "Nghị định 67/2023/NĐ-CP và giá trị pháp lý tương đương của Giấy chứng nhận điện tử có mã QR."],
    ["02", "Hiểu đúng về mức miễn thường và quyền lợi bảo hiểm xe", "Cách lựa chọn gói bảo hiểm tối ưu chi phí nhưng vẫn đảm bảo bảo vệ toàn diện xe ô tô."],
    ["03", "Kinh nghiệm bồi thường bảo hiểm không lo bị từ chối", "Các lưu ý sống còn về hồ sơ hiện trường, nồng độ cồn và thời gian thông báo sự cố cho BIC."],
  ];

  return (
    <InteriorPage
      eyebrow="CẨM NANG BẢO HIỂM"
      title={<>Kiến thức bảo hiểm chuẩn xác,<br /><span className="text-[#0066cc]">giải thích minh bạch và dễ hiểu.</span></>}
      intro="Tổng hợp thông tin pháp lý, kinh nghiệm mua bảo hiểm và hướng dẫn bồi thường chuẩn xác từ Bảo An Tây Nguyên."
    >
      <section className="mx-auto grid max-w-[1240px] gap-6 px-5 py-16 md:grid-cols-3 lg:px-8">
        {posts.map(([n, t, d]) => (
          <article key={n} className="flex flex-col justify-between rounded-[8px] border border-[#cce0f5] bg-[#ffffff] p-6 transition duration-200 hover:border-[#0066cc]">
            <div>
              <span className="font-mono text-xs font-semibold text-[#0066cc]">{n} // GUIDE</span>
              <h2 className="mt-4 text-lg font-semibold text-[#0b2341]">{t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4a6785]">{d}</p>
            </div>
            <Link href="/lien-he" className="mt-6 inline-flex text-xs font-semibold text-[#0066cc] hover:text-[#0052b3]">
              Tư vấn trực tuyến ↗
            </Link>
          </article>
        ))}
      </section>
    </InteriorPage>
  );
}


