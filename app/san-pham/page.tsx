import { InteriorPage } from "../../components/layout/interior-page";
import { ProductCard } from "../../components/products/product-card";
import { insuranceProducts } from "../../config/products";
export const metadata={title:"Sản phẩm bảo hiểm"};
export default function ProductsPage(){return <InteriorPage eyebrow="12 NHÓM BẢO VỆ" title={<>Chọn đúng lớp bảo vệ<br/><span className="text-[#0066cc]">cho điều quan trọng.</span></>} intro="Từ chuyến đi hằng ngày đến kế hoạch dài hạn, hãy bắt đầu bằng nhu cầu thật của bạn. Mỗi sản phẩm đều có phí tham khảo và phần giải thích quyền lợi rõ ràng."><section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{insuranceProducts.map(product=><ProductCard key={product[0]} product={product}/>)}</div></section></InteriorPage>}
