import { InteriorPage } from "../../components/layout/interior-page";
import { QuickQuote } from "../../components/quote/quick-quote";
import { QuoteCatalog } from "../../components/quote/quote-catalog";

export const metadata = { title: "Báo giá bảo hiểm trực tuyến" };

export default function QuotePage() {
  return (
    <InteriorPage
      eyebrow="TÍNH PHÍ TRỰC TUYẾN"
      title={<>Biết trước mức phí.<br /><span className="text-[#006b66]">Chọn đúng lớp bảo vệ.</span></>}
      intro="Xem nhanh mức phí tham khảo của từng sản phẩm, quyền lợi đi kèm và những điểm cần lưu ý trước khi nhận tư vấn."
    >
      <section className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
        <QuoteCatalog />
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <QuickQuote />
        </aside>
      </section>
      <section className="border-t border-[#cce5e1] bg-[#eaf5f2]">
        <div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#006b66]">LƯU Ý VỀ BÁO GIÁ</p>
              <h2 className="mt-2 text-[22px] font-bold text-[#103b3b]">Mức phí trên là số liệu minh họa</h2>
            </div>
            <p className="max-w-2xl text-[14px] leading-6 text-[#577572]">
              Phí và quyền lợi chính thức còn phụ thuộc vào thông tin tài sản, độ tuổi, phạm vi bảo vệ,
              quy tắc sản phẩm và kết quả thẩm định của doanh nghiệp bảo hiểm. Bạn không cần nhập thông tin
              cá nhân để xem các mức phí trên.
            </p>
          </div>
        </div>
      </section>
    </InteriorPage>
  );
}

