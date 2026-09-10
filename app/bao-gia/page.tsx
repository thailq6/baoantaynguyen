import { InteriorPage } from "../../components/layout/interior-page";
import { QuickQuote } from "../../components/quote/quick-quote";

export const metadata = { title: "Báo giá bảo hiểm trực tuyến" };

export default function QuotePage() {
  return (
    <InteriorPage
      eyebrow="TÍNH PHÍ TRỰC TUYẾN"
      title={<>Chủ động tính phí tức thì cùng AI.<br /><span className="text-[#006b66]">Cấp đơn nhanh chóng.</span></>}
      intro="Nhận báo giá minh bạch theo quy chuẩn Bộ Tài Chính và BIC. Không cần để lại thông tin cá nhân để xem phí."
    >
      <section className="mx-auto flex max-w-[860px] justify-center px-5 py-16 lg:px-8">
        <QuickQuote />
      </section>
    </InteriorPage>
  );
}


