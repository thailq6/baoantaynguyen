# Bảo An Tây Nguyên

Bản Next.js App Router gồm trang chủ, 11 route nội dung, hệ thống component Tailwind, báo giá nhanh hard-code và form tư vấn mô phỏng.

## Deploy Cloudflare Pages

Project này dùng Next.js Static HTML Export, không dùng OpenNext hay Workers adapter.

Build local:

```bash
npm run build:cloudflare
```

Thư mục output là `out/`.

Nếu deploy bằng Cloudflare Pages Git integration, chọn:

- Framework preset: `Next.js (Static HTML Export)`
- Production branch: `main`
- Build command: `npm run build:cloudflare`
- Build output directory: `out`

Không đặt Build command là `npx opennextjs-cloudflare build`. Nếu Cloudflare vẫn hiện command này, project đang dùng cấu hình Workers/automatic configuration cũ; hãy chuyển sang Pages project hoặc xóa command cũ trong Settings > Builds & deployments rồi lưu lại.

Deploy trực tiếp bằng Wrangler:

```bash
npm run deploy:cloudflare
```

## Chạy bản demo

Chạy `npm install`, sau đó `npm run dev`.

## Cấu hình cần thay thế

- `[HOTLINE]`
- `[ZALO_URL]`
- `[EMAIL]`
- `[ĐỊA_CHỈ]`
- `[GIỜ_LÀM_VIỆC]`
- `[FACEBOOK_URL]`

## Lưu ý

`config/`, `types/` và `lib/quote/` là nguồn dữ liệu và logic duy nhất. Form chưa kết nối backend thật. Môi trường hiện tại chặn tải dependency npm, nên cần chạy các lệnh kiểm tra sau khi có quyền registry.
"# baoantaynguyen" 
"# baoantaynguyen" 
