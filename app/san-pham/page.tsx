import { InteriorPage } from "../../components/layout/interior-page";
import { ProductCard } from "../../components/products/product-card";
import { insuranceProducts } from "../../config/products";
export const metadata={title:"Sản phẩm bảo hiểm"};
export default function ProductsPage(){return <InteriorPage eyebrow="12 NHÓM BẢO VỆ" title={<>Chọn đúng lớp bảo vệ<br/><em className="not-italic text-[var(--terracotta)]">cho điều quan trọng.</em></>} intro="Từ chuyến đi hằng ngày đến kế hoạch dài hạn, hãy bắt đầu bằng nhu cầu thật của bạn."><section className="mx-auto max-w-[1180px] px-5 py-20 lg:px-7"><div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{insuranceProducts.map(product=><ProductCard key={product[0]} product={product}/>)}</div></section></InteriorPage>}

