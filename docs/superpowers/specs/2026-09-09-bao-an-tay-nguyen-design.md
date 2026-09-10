# Bảo An Tây Nguyên Website Design

## 1. Mục tiêu

Xây dựng website bảo hiểm đa sản phẩm bằng Next.js App Router, ưu tiên người dùng di động tại Việt Nam và khu vực Tây Nguyên. Website giúp khách truy cập hiểu sản phẩm, tự nhận phí minh họa, so sánh gói và gửi yêu cầu tư vấn mà không cần tài khoản hoặc nhập dữ liệu nhạy cảm.

Thông điệp thương hiệu: **Vững tâm hôm nay, an toàn ngày mai.**

## 2. Giả định và giới hạn

- Đây là phiên bản đầu, không có database, thanh toán, tài khoản khách hàng hoặc tích hợp báo giá bên ngoài.
- Các form liên hệ và nhận tư vấn chỉ mô phỏng gửi thành công phía trình duyệt; giao diện ghi rõ chưa kết nối hệ thống tiếp nhận thật.
- Thông tin liên hệ chưa có dùng nguyên placeholder: `[HOTLINE]`, `[ZALO_URL]`, `[EMAIL]`, `[ĐỊA_CHỈ]`, `[GIỜ_LÀM_VIỆC]`, `[FACEBOOK_URL]`.
- Wordmark chữ “Bảo An Tây Nguyên” được dùng thay logo chính thức.
- Công thức báo giá là dữ liệu minh họa, không được mô tả là biểu phí pháp lý hoặc biểu phí được phê duyệt.
- Nội dung đánh giá khách hàng được ghi rõ là minh họa.
- Ảnh thương hiệu chính dùng artwork CSS/SVG trừu tượng, tránh phụ thuộc ảnh có bản quyền và tránh mô tả văn hóa bản địa rập khuôn.

## 3. Hướng thiết kế

### 3.1 Phong cách

“Tây Nguyên hiện đại, vững chãi và gần gũi”: nền kem ấm, mảng xanh rừng sâu, điểm nhấn đất nung và vàng ấm. Họa tiết hình học dạng dải viền lấy cảm hứng từ nhịp điệu dệt, được dùng tiết chế ở hero, tiêu đề section và footer.

### 3.2 Typography và màu

- Tiêu đề: Lora.
- Nội dung: Be Vietnam Pro.
- Forest Green: `#174A3A`.
- Highland Green: `#2E6B4F`.
- Terracotta: `#C65D38`.
- Warm Gold: `#E1AA45`.
- Cream: `#F7F1E5`.
- Charcoal: `#24312D`.

Font được nạp bằng `next/font/google`; giao diện vẫn có fallback serif/sans-serif phù hợp khi font mạng chưa tải.

### 3.3 Trải nghiệm

- Header desktop có mega menu sản phẩm; mobile có menu thu gọn và CTA báo giá/hotline dễ chạm.
- Báo giá nhanh xuất hiện ngay sau khối tạo niềm tin trên trang chủ.
- Mọi kết quả báo giá hiển thị bảng phân rã phí và cảnh báo pháp lý cạnh kết quả.
- CTA dùng động từ rõ ràng: “Nhận báo giá”, “Yêu cầu tư vấn”, “Xem hướng dẫn”.
- Animation chỉ gồm fade/slide ngắn khi section xuất hiện và bị vô hiệu hóa khi `prefers-reduced-motion` bật.

## 4. Kiến trúc kỹ thuật

### 4.1 Stack

- Next.js App Router, TypeScript, React.
- Tailwind CSS.
- React Hook Form và Zod.
- Lucide React cho icon.
- Vitest cho hàm báo giá và validation.
- ESLint và TypeScript strict.

### 4.2 Phân lớp

- `app/`: route, metadata, JSON-LD và composition theo trang.
- `components/layout/`: header, mega menu, mobile navigation, footer, breadcrumb, floating CTA.
- `components/sections/`: section dùng ở trang chủ và landing pages.
- `components/products/`: tìm kiếm, lọc, card, so sánh gói, chi tiết sản phẩm.
- `components/quote/`: báo giá nhanh, wizard chi tiết, trường nhập động, kết quả, so sánh gói.
- `components/forms/`: form tư vấn/liên hệ và trạng thái gửi mô phỏng.
- `config/`: thông tin thương hiệu, navigation, dữ liệu sản phẩm, bảng phí và hệ số.
- `lib/quote/`: hàm thuần tính phí; không chứa JSX hoặc truy cập trình duyệt.
- `lib/validation/`: schema Zod dùng chung.
- `types/`: kiểu sản phẩm, gói và kết quả báo giá.

Client components chỉ dùng tại menu tương tác, accordion, bộ lọc, báo giá và form. Nội dung trang, metadata và danh sách sản phẩm ưu tiên Server Components.

## 5. Sitemap và URL

- `/`: Trang Chủ.
- `/san-pham`: danh sách, tìm kiếm và lọc 12 nhóm sản phẩm.
- `/san-pham/[slug]`: chi tiết từng sản phẩm.
- `/bao-gia`: wizard báo giá 5 bước và so sánh gói.
- `/gioi-thieu`: câu chuyện, nguyên tắc tư vấn, khu vực phục vụ.
- `/lien-he`: thông tin liên hệ, bản đồ placeholder và form.
- `/boi-thuong`: việc cần làm, hồ sơ, quy trình và trạng thái minh họa.
- `/cau-hoi-thuong-gap`: FAQ đầy đủ.
- `/cam-nang`: danh sách bài viết mẫu.
- `/cam-nang/[slug]`: nội dung bài viết và liên kết sản phẩm.
- `/chinh-sach-bao-mat`: chính sách bảo mật.
- `/dieu-khoan-su-dung`: điều khoản sử dụng.
- `not-found`: trang 404 với liên kết về trang chủ và sản phẩm.

## 6. User flow chính

### 6.1 Báo giá nhanh

Trang chủ → chọn loại bảo hiểm → trường nhập thay đổi theo sản phẩm → validation tức thời → xem phí và bảng giải thích → mở báo giá chi tiết hoặc form tư vấn.

### 6.2 Báo giá chi tiết

Chọn sản phẩm → nhập thông tin rủi ro → chọn gói/quyền lợi → xem kết quả và so sánh ba gói → lưu mã tạm/in → tự nguyện để lại thông tin tư vấn.

### 6.3 Tìm hiểu sản phẩm

Mega menu hoặc danh sách sản phẩm → tìm kiếm/lọc → chi tiết sản phẩm → xem quyền lợi, phạm vi, loại trừ và gói → nhận báo giá hoặc yêu cầu tư vấn.

### 6.4 Hỗ trợ bồi thường

Mở trang bồi thường → chọn nhóm sản phẩm → xem việc cần làm ngay và hồ sơ → xem quy trình tiếp nhận minh họa → dùng CTA hotline.

## 7. Dữ liệu sản phẩm

Mỗi `InsuranceProduct` gồm:

```ts
type ProductPackage = {
  name: "Cơ Bản" | "Nâng Cao" | "Toàn Diện";
  summary: string;
  highlights: string[];
};

type InsuranceProduct = {
  slug: string;
  name: string;
  shortDescription: string;
  audience: string;
  category: "ca-nhan" | "gia-dinh" | "doanh-nghiep";
  icon: string;
  benefits: string[];
  coverage: string[];
  exclusions: string[];
  packages: ProductPackage[];
  quoteType?: QuoteProductType;
  featured?: boolean;
  relatedArticleSlugs: string[];
};
```

Dữ liệu gồm đủ 12 nhóm: ô tô, xe máy, sức khỏe, nhân thọ, tai nạn cá nhân, du lịch, nhà ở, tài sản/cháy nổ, doanh nghiệp, trách nhiệm, hàng hóa, nông nghiệp.

## 8. Công cụ báo giá

### 8.1 Giao diện chung

Mỗi calculator nhận input đã chuẩn hóa và trả `QuoteResult`:

```ts
type QuoteLine = {
  label: string;
  value: number;
  kind: "base" | "factor" | "addon" | "subtotal" | "tax" | "total";
  displayValue?: string;
};

type QuoteResult = {
  productType: QuoteProductType;
  basePremium: number;
  adjustmentFactors: Array<{ label: string; value: number }>;
  addOnPremium: number;
  preTaxPremium: number;
  vatRate: number;
  vatAmount: number;
  totalPremium: number;
  breakdown: QuoteLine[];
};
```

Tiền được làm tròn đến đồng và định dạng bằng locale `vi-VN`, currency `VND`.

### 8.2 Quy tắc

- Ô tô: giá trị xe × tỷ lệ loại xe × hệ số tuổi xe × hệ số gói × hệ số miễn thường.
- Xe máy: mức phí cố định theo loại xe.
- Sức khỏe: phí tuổi × hệ số gói + tổng quyền lợi bổ sung.
- Du lịch: số ngày × phí vùng × hệ số gói × hệ số tuổi.
- Nhà ở: giá trị tài sản × `0,12%` × hệ số loại nhà × hệ số gói.
- Nhân thọ: số tiền bảo hiểm × tỷ lệ tuổi × hệ số thời hạn + quyền lợi bổ sung.
- Doanh nghiệp/cháy nổ: giá trị tài sản × tỷ lệ rủi ro × hệ số gói.
- VAT mặc định `10%`, nằm duy nhất trong `config/quote-rates.ts`.

Các bảng tỷ lệ và hệ số dùng đúng dữ liệu đầu vào của yêu cầu, không bổ sung mức phí giả. Input ngoài phạm vi hỗ trợ trả lỗi validation thay vì tự nội suy.

### 8.3 Lưu và in

- `localStorage` chỉ lưu dữ liệu rủi ro không nhạy cảm, lựa chọn gói và kết quả.
- Mã báo giá tạm được tạo cục bộ, có tiền tố `BATN`, ngày và chuỗi ngẫu nhiên ngắn; mã không phải số hợp đồng.
- Nút sao chép dùng Clipboard API và có fallback thông báo lỗi.
- CSS `@media print` ẩn navigation, CTA nổi và form; giữ thông tin báo giá, thời điểm tạo và disclaimer.

## 9. Form và trạng thái

- Form liên hệ: họ tên, điện thoại, email tùy chọn, sản phẩm quan tâm, lời nhắn, checkbox đồng ý và honeypot.
- Form tư vấn từ báo giá có cùng quy tắc đồng ý, không yêu cầu CCCD, thông tin sức khỏe chi tiết hoặc thanh toán.
- Submit chờ ngắn để mô phỏng, sau đó thông báo: “Yêu cầu đang được mô phỏng trên trình duyệt; chưa gửi đến hệ thống thật.”
- Honeypot có dữ liệu trả trạng thái thất bại chung, không tiết lộ cơ chế chống spam.
- Loading, success và error dùng `aria-live`; lỗi trường liên kết bằng `aria-describedby`.

## 10. Nội dung trang chủ

Thứ tự section giữ đúng yêu cầu: thanh hỗ trợ, header, hero, tín hiệu tin cậy không số liệu, báo giá nhanh, nhóm sản phẩm, lý do lựa chọn, quy trình bốn bước, phân nhóm cá nhân/gia đình/doanh nghiệp, hướng dẫn sự cố, đánh giá minh họa, FAQ, CTA cuối và footer.

Điểm tin cậy dùng nguyên tắc có thể kiểm chứng: giải thích dễ hiểu, báo phí trước khi lấy thông tin cá nhân, đồng hành chuẩn bị hồ sơ, am hiểu nhu cầu khu vực. Không dùng số lượng khách hàng, tỷ lệ bồi thường, đối tác hoặc chứng nhận giả.

## 11. SEO

- Mỗi route có title và description riêng; một H1 duy nhất.
- Root layout có metadataBase placeholder an toàn cho môi trường local và Open Graph mặc định.
- `sitemap.ts` và `robots.ts` liệt kê route công khai.
- JSON-LD: Organization/InsuranceAgency ở root hoặc trang giới thiệu; FAQPage tại trang FAQ; BreadcrumbList ở trang con.
- Bài viết mẫu liên kết đến sản phẩm phù hợp; trang sản phẩm liên kết ngược đến bài viết.
- URL dùng tiếng Việt không dấu; alt text mô tả mục đích ảnh/artwork.

## 12. Accessibility và responsive

- Skip link, landmark semantic, focus ring rõ, thứ tự heading hợp lý.
- Mega menu và mobile menu dùng nút thật, hỗ trợ Escape và điều hướng bàn phím hợp lý.
- Màu văn bản/CTA đạt tương phản WCAG AA; thông tin không truyền đạt chỉ bằng màu.
- Vùng bấm tối thiểu khoảng 44 px.
- Layout kiểm tra tại 375 px, 768 px, 1024 px và 1440 px.
- Bảng so sánh gói cuộn ngang có nhãn trên mobile; form xếp một cột trên mobile.

## 13. Hiệu năng

- Server Components mặc định; JavaScript chỉ nạp cho tương tác cần thiết.
- Không video, carousel nặng hoặc animation liên tục.
- Artwork dùng CSS/SVG nhỏ; hình minh họa dùng `next/image` nếu có bitmap.
- Nội dung dưới màn hình đầu không làm tăng Largest Contentful Paint.

## 14. Kiểm thử và tiêu chí hoàn tất

- Unit test cho từng calculator, VAT, biên tuổi, hệ số, add-on và input không hợp lệ.
- Unit test cho schema form chính.
- Component smoke test cho báo giá nhanh, FAQ, tìm kiếm/lọc và trạng thái form nếu môi trường kiểm thử DOM ổn định.
- Chạy `npm test`, `npm run lint`, `npm run typecheck` và `npm run build`.
- Kiểm tra thủ công navigation, liên kết CTA, responsive, bàn phím, in báo giá và lưu/khôi phục báo giá.
- Không báo hoàn tất nếu bất kỳ lệnh xác minh bắt buộc nào còn lỗi.

## 15. Không thuộc phạm vi

- API báo giá, CRM, database, cổng thanh toán, đăng nhập, dashboard khách hàng.
- Theo dõi hồ sơ bồi thường thật.
- Gửi email/SMS/Zalo thật.
- Logo đối tác, chứng nhận, giấy phép hoặc lời chứng thực thật khi chưa có dữ liệu được phê duyệt.

