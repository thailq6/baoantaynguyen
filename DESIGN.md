# Hướng Dẫn Thiết Kế Hệ Thống & Quy Chuẩn Giao Diện — BẢO AN TÂY NGUYÊN (Apple Design System)

Tài liệu này tổng hợp toàn bộ triết lý thiết kế, bảng màu thương hiệu, typography, layout, components và các quy tắc nghiêm ngặt (Rules & Directives) dành cho dự án **Bảo An Tây Nguyên** (Tổng Công Ty Bảo Hiểm BIC).

---

## 1. Triết Lý Thiết Kế Trọng Tâm (Design Philosophy)

Hệ thống thiết kế của **Bảo An Tây Nguyên** kết hợp giữa **Apple Web Aesthetic** (tối giản, coi sản phẩm là trọng tâm, typography tự tin, nhịp điệu tile rõ ràng) và **Nhận diện thương hiệu Bảo Hiểm BIC**:

1. **Sản phẩm & Hình ảnh là Trọng Tâm (Photography-First)**: Giao diện UI phải tinh giản tối đa để hình ảnh sản phẩm bảo hiểm chuẩn studio tỏa sáng.
2. **Loại bỏ Hoàn toàn Màu Đen (Zero-Black Policy)**: Ngành bảo hiểm tượng trưng cho sự an tâm, may mắn và bảo vệ. Không bao giờ sử dụng màu đen thuần (`#000000`) hay xám đen thô ráp. Thay thế toàn bộ bằng sắc xanh rừng thẳm **Deep Forest Teal (`#003835`)**.
3. **Không Sử Dụng Từ Khóa "AI" (Zero-AI Policy)**: Website lấy thương hiệu chính thức là **Bảo An Tây Nguyên**. Tuyệt đối không dùng các cụm từ gây cảm giác máy móc như "Bảo hiểm AI", "Cấp đơn AI", "Trợ lý AI". Thay bằng "Cấp đơn cấp tốc", "Hệ thống hỗ trợ 24/7", "Tư vấn trực tuyến".
4. **Loại Bỏ Emoji - Sử Dụng SVG Vector Icons**: Mọi biểu tượng và nút bấm phải sử dụng SVG vector sắc nét, chuyên nghiệp. Không dùng emoji trình duyệt (🚗, 🏍️,...).
5. **Chỉ Hiển Thị Phí Khi Người Dùng Yêu Cầu (Lazy Fee Calculation)**: Tại công cụ tính phí nhanh (`QuickQuote`), không tự động hiển thị số tiền khi mở trang. Chỉ hiển thị số tiền phí sau khi người dùng chọn tham số và bấm **"Tính phí ngay"**.

---

## 2. Hệ Thống Màu Sắc Thương Hiệu (Color System)

| Tên Token | Mã Hex / Value | Mục Đích Sử Dụng |
|---|---|---|
| `primary` | `#006b66` | **Primary Emerald Teal** — Màu chủ đạo BIC. Dùng cho nút bấm CTA chính, icon active, link, viền nổi bật |
| `primary-hover` | `#005854` | Trạng thái Hover của nút bấm primary |
| `primary-focus` | `#0b8f86` | Trạng thái Focus / Highlight ring |
| `accent-gold` | `#f5ab19` | **Amber Gold** — Màu vàng kim may mắn chuẩn logo BIC. Dùng cho badge ("Cấp đơn cấp tốc"), điểm nhấn uy tín |
| `accent-gold-hover` | `#e09b10` | Hover cho các phần tử mang sắc vàng |
| `canvas-light` | `#ffffff` | Nền trắng chủ đạo cho các thẻ card sản phẩm, container chính |
| `canvas-mint` | `#eaf5f2` | **Soft Mint Glass** — Nền xanh bạc hà dịu nhẹ, dùng cho khối background phụ, card nổi bật |
| `canvas-parchment` | `#f4faf8` | Nền chuyển tiếp dịu mát |
| `surface-dark-teal` | `#003835` | **Deep Forest Teal** — Thay thế hoàn toàn cho màu đen. Dùng cho footer, section tile tối |
| `surface-dark-teal-2` | `#084c47` | Xanh teal đậm cấp 2 cho các khối thẻ phụ trên nền tối |
| `ink-main` | `#103b3b` | Sắc chữ đậm chủ đạo trên nền sáng (thay thế chữ đen) |
| `ink-muted` | `#516f6f` | Chữ phụ, mô tả ngắn, phụ đề |
| `ink-subtle` | `#6f8585` | Chữ fine-print, ghi chú nhỏ |
| `text-on-dark` | `#ffffff` | Chữ trắng trên nền xanh đậm `#003835` |
| `text-muted-on-dark` | `#d5e5e2` | Chữ phụ xanh mint nhạt trên nền xanh đậm `#003835` |
| `hairline-border` | `#d5e5e2` | Viền mảnh 1px cho card, divider |
| `glass-border` | `rgba(0, 107, 102, 0.12)` | Viền mờ glassmorphism |

---

## 3. Hệ Thống Typography (Typographic Hierarchy)

Sử dụng bộ font `SF Pro Display`, `Inter` hoặc `system-ui` với negative letter-spacing chuẩn Apple ở tiêu đề lớn.

| Cap / Token | Kích Thước | Font Weight | Line Height | Tracking | Mô Tả & Vị Trí Sử Dụng |
|---|---|---|---|---|---|
| `display-hero` | 44px - 56px | 700 (Bold) | 1.08 | -0.02em | Hero headline chính ở trang chủ |
| `display-section` | 28px - 36px | 700 (Bold) | 1.15 | -0.02em | Tiêu đề các phần / section |
| `display-card` | 20px - 22px | 600 (SemiBold) | 1.25 | -0.01em | Tiêu đề thẻ sản phẩm / tin tức |
| `eyebrow` | 12px - 14px | 600 (SemiBold) | 1.20 | 0.05em | Nhãn phía trên tiêu đề (ví dụ: `BẢO AN TÂY NGUYÊN // BẢO HIỂM`) |
| `body-lead` | 17px - 18px | 400 (Regular) | 1.50 | -0.01em | Đoạn mở đầu / Sub-headline |
| `body-main` | 15px - 16px | 400 (Regular) | 1.60 | 0 | Chữ nội dung bài viết, mô tả sản phẩm |
| `button-label` | 14px - 15px | 600 (SemiBold) | 1.00 | 0 | Chữ trong nút bấm CTA |
| `caption-legal` | 12px - 13px | 400 (Regular) | 1.40 | 0 | Bản quyền, chú thích chân trang |

---

## 4. Bố Cục & Hình Khối (Layout & Geometry)

### 4.1. Khung Lưới (Grid & Spacing)
- **Max Container Width**: `1240px` (căn giữa với padding `px-5` trên mobile, `px-8` trên desktop).
- **Rhythm Section Padding**: `py-16` (64px) đến `py-24` (96px) giữa các section.
- **Card Padding**: `p-6` (24px) hoặc `p-8` (32px).
- **Card Gap**: `gap-6` (24px) giữa các thẻ sản phẩm.

### 4.2. Bo Góc (Border Radius Scale)
- `rounded-full` (`9999px`): Tất cả các nút bấm CTA chính (`button-primary`, `button-accent`, `button-secondary`), badge trạng thái, search box.
- `rounded-2xl` (`16px` - `20px`): Các thẻ sản phẩm (Product Card), QuickQuote box, Feature container.
- `rounded-xl` (`12px`): Nút phụ dạng Pearl capsule, input field, dropdown menu.

### 4.3. Hiệu Ứng Nổi & Đổ Bóng (Elevation & Glassmorphism)
- **Glassmorphism Frosted**: `bg-white/85 backdrop-blur-md border border-[#d5e5e2]` dùng cho Header thanh điều hướng cố định.
- **Product Image Shadow**: Đổ bóng tự nhiên cho hình ảnh sản phẩm: `drop-shadow-[0_12px_24px_rgba(0,107,102,0.15)]`.
- **Card Hover Elevation**: `transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,107,102,0.12)]`.

---

## 5. Quy Chuẩn Các Component Chính (Core Components)

### 5.1. Header Bar (`SiteHeader`)
- **Cấu trúc**: 1 thanh điều hướng đơn duy nhất (Height: `64px`), cố định top với hiệu ứng mờ kính `backdrop-blur-md`.
- **Thành phần**:
  - Logo BIC (kèm tên thương hiệu **Bảo An Tây Nguyên** kế bên).
  - Thanh Menu links (Trang chủ, Sản phẩm, Báo giá, Bồi thường, Giới thiệu, Cẩm nang, Liên hệ).
  - SĐT Hotline tư vấn (`0396998765`) với icon SVG điện thoại.
  - Nút CTA primary "Mua ngay" (`#006b66`, rounded-full).
- **Lưu ý**: Không có thanh top-bar rườm rà ở trên cùng.

### 5.2. Thẻ Sản Phẩm (`ProductCard`)
- **Khung thẻ**: Nền trắng `#ffffff`, viền `#d5e5e2`, bo góc `20px`, hiệu ứng hover nẩy nhẹ.
- **Badge**: Màu vàng `#f5ab19` với chữ đen/dark teal "Cấp đơn cấp tốc" (Tuyệt đối không để "Cấp đơn AI").
- **Hình ảnh**: Ảnh studio photography tỉ lệ 16:9 sắc nét cho từng loại bảo hiểm:
  - Ô tô (`car_hero.png`)
  - Xe máy (`motorbike_hero.png`)
  - Sức khỏe gia đình (`family_hero.png`)
  - Du lịch (`travel_hero.png`)
  - Nhân thọ (`life_hero.png`)
  - Tai nạn cá nhân (`accident_hero.png`)
- **Icons**: Sử dụng icon SVG vector phù hợp (Không dùng emoji).

### 5.3. Công Cụ Tính Phí Nhanh (`QuickQuote`)
- **Quy tắc tính phí**: Mặc định không hiển thị giá tiền ngay. Giá tiền chỉ xuất hiện sau khi người dùng tương tác và bấm nút **"Tính phí ngay"**.
- **Giao diện**: Nền `#eaf5f2` hoặc `#003835`, nút bấm chính `#006b66` hoặc `#f5ab19`.

### 5.4. Chân Trang (`SiteFooter`)
- **Nền**: `#003835` (Deep Forest Teal).
- **Nội dung**: Thông tin thương hiệu **Bảo An Tây Nguyên**, tổng công ty bảo hiểm BIC, danh mục sản phẩm, chính sách bảo mật, liên hệ hotline và địa chỉ. Chữ trắng & xanh mint nhạt.

---

## 6. Danh Sách Quy Tắc Bắt Buộc (Strict Checklist for Future Pages)

Khi khởi tạo hoặc chỉnh sửa bất kỳ trang web nào trong hệ thống **Bảo An Tây Nguyên**, bắt buộc tuân thủ 7 điều khoản sau:

1. ✅ **Brand Name**: Tên website luôn là **Bảo An Tây Nguyên**.
2. ✅ **Zero AI Terms**: Không chứa từ "AI" ở bất cứ đâu (Title, Metadata, Card, Header, Footer, Copywriter text).
3. ✅ **Zero Pure Black**: Không dùng `#000000` hay xám đen. Dùng `#003835` cho các mảng tối.
4. ✅ **SVG Icons Only**: Dùng SVG cho tất cả các icon (không dùng emoji `🚗`, `🏥`, `✈️`).
5. ✅ **No Automatic Fee Display**: Không hiển thị số tiền tính phí trước khi bấm nút hành động.
6. ✅ **BIC Colors**: Sử dụng đúng mã màu Emerald Teal `#006b66` và Amber Gold `#f5ab19`.
7. ✅ **Clean Navigation**: Giữ duy nhất 1 thanh Header 64px, loại bỏ hoàn toàn top-bar cũ.

---
*Tài liệu quy chuẩn được phê duyệt và áp dụng chính thức cho dự án Bảo An Tây Nguyên.*
