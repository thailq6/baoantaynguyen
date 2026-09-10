# Bảo An Tây Nguyên Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng website bảo hiểm đa sản phẩm Bảo An Tây Nguyên responsive, có báo giá hard-code minh bạch, form mô phỏng có validation và đầy đủ trang nội dung/SEO.

**Architecture:** Next.js App Router với Server Components cho nội dung và Client Components cho quote/form/menu. Dữ liệu sản phẩm và tỷ lệ nằm trong `config/`; calculator thuần nằm trong `lib/quote/`; UI chia theo layout, sections, products, quote và forms.

**Tech Stack:** Next.js, TypeScript strict, Tailwind CSS, React Hook Form, Zod, Lucide React, Vitest.

**Spec:** `docs/superpowers/specs/2026-09-09-bao-an-tay-nguyen-design.md`

## Global Constraints

- Không gọi API báo giá bên ngoài.
- VAT mặc định `10%`, đặt duy nhất trong `config/quote-rates.ts`.
- Không yêu cầu hoặc lưu CCCD, thông tin sức khỏe chi tiết, dữ liệu thanh toán.
- Placeholder liên hệ giữ nguyên: `[HOTLINE]`, `[ZALO_URL]`, `[EMAIL]`, `[ĐỊA_CHỈ]`, `[GIỜ_LÀM_VIỆC]`, `[FACEBOOK_URL]`.
- Mọi kết quả báo giá có disclaimer pháp lý đầy đủ.
- Nội dung đánh giá, bản đồ và gửi form demo phải ghi rõ là minh họa/mô phỏng.
- Production code mới phải có test thất bại trước theo TDD.

---

### Task 1: Scaffold ứng dụng và token giao diện

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `vitest.config.ts`
- Create: `app/globals.css`, `app/layout.tsx`, `types/brand.ts`
- Create: `public/favicon.svg`
- Test: `tests/smoke/app-config.test.ts`

**Interfaces:**
- Produces `BrandConfig` and configured scripts: `dev`, `build`, `lint`, `typecheck`, `test`.

- [ ] **Step 1: Write the failing test** asserting `brand.name`, placeholder contact values and quote disclaimer are exported.
- [ ] **Step 2: Run `npm test -- tests/smoke/app-config.test.ts`**; expected failure because files do not exist.
- [ ] **Step 3: Scaffold Next.js and implement brand tokens, fonts, CSS variables, reduced-motion rule and basic metadata.**
- [ ] **Step 4: Run `npm test -- tests/smoke/app-config.test.ts`; expected PASS.**
- [ ] **Step 5: Run `npm run typecheck`; expected PASS.**

### Task 2: Product and quote configuration

**Files:**
- Create: `types/product.ts`, `types/quote.ts`
- Create: `config/brand.ts`, `config/products.ts`, `config/quote-rates.ts`
- Test: `tests/config/products.test.ts`

**Interfaces:**
- Produces `insuranceProducts: InsuranceProduct[]`, `quoteRates`, `QuoteProductType`, `QuoteInput` and `QuoteResult`.

- [ ] **Step 1: Write the failing test** checking all 12 product slugs, three packages each and seven quote-enabled types.
- [ ] **Step 2: Run the focused Vitest test; expected failure because config exports are missing.**
- [ ] **Step 3: Add typed configuration with the exact rates, factors, add-ons and product copy from the spec.**
- [ ] **Step 4: Run the focused test; expected PASS.**
- [ ] **Step 5: Run `npm run typecheck`; expected PASS.**

### Task 3: Pure quote engine

**Files:**
- Create: `lib/quote/format.ts`, `lib/quote/automobile.ts`, `lib/quote/motorbike.ts`, `lib/quote/health.ts`, `lib/quote/travel.ts`, `lib/quote/home.ts`, `lib/quote/life.ts`, `lib/quote/business.ts`, `lib/quote/index.ts`
- Test: `tests/quote/quote-engine.test.ts`

**Interfaces:**
- Produces `calculateQuote(input: QuoteInput): QuoteResult` and `formatVnd(value: number): string`.

- [ ] **Step 1: Write failing tests** for one normal case and one boundary case per calculator, VAT, add-ons, invalid ranges and breakdown labels.
- [ ] **Step 2: Run `npm test -- tests/quote/quote-engine.test.ts`; expected FAIL with missing calculator exports.**
- [ ] **Step 3: Implement minimal pure functions using `quote-rates.ts`; clamp/round only where specified and return structured breakdown.**
- [ ] **Step 4: Run focused tests; expected PASS.**
- [ ] **Step 5: Refactor shared VAT and factor helpers; rerun focused tests.**

### Task 4: Shared layout and navigation

**Files:**
- Create: `config/navigation.ts`
- Create: `components/layout/site-header.tsx`, `components/layout/mobile-nav.tsx`, `components/layout/site-footer.tsx`, `components/layout/breadcrumbs.tsx`, `components/layout/floating-cta.tsx`, `components/ui/button.tsx`, `components/ui/section-heading.tsx`
- Modify: `app/layout.tsx`
- Test: `tests/components/navigation.test.tsx`

**Interfaces:**
- Consumes `navigationItems`, `brandConfig`.
- Produces keyboard-accessible desktop mega menu, mobile menu and persistent hotline/quote CTA.

- [ ] **Step 1: Write failing component tests** for all navigation labels, mobile menu toggle, Escape close and non-empty CTA hrefs.
- [ ] **Step 2: Run focused tests; expected FAIL because components are missing.**
- [ ] **Step 3: Implement semantic header/footer, focus styles, responsive menu and floating CTAs.**
- [ ] **Step 4: Run focused tests; expected PASS.**

### Task 5: Product discovery and detail pages

**Files:**
- Create: `components/products/product-card.tsx`, `components/products/product-filter.tsx`, `components/products/package-table.tsx`, `components/products/product-detail.tsx`
- Create: `app/san-pham/page.tsx`, `app/san-pham/[slug]/page.tsx`
- Test: `tests/components/product-filter.test.tsx`

**Interfaces:**
- Consumes `insuranceProducts`.
- Produces searchable/filterable product grid, detail content, package comparison and quote/advice CTAs.

- [ ] **Step 1: Write failing tests** for search, category filter, empty state and slug lookup.
- [ ] **Step 2: Run focused tests; expected FAIL.**
- [ ] **Step 3: Implement cards, filters, breadcrumb, detail page, related article links and disclaimer.**
- [ ] **Step 4: Run focused tests and `npm run typecheck`; expected PASS.**

### Task 6: Quick quote and detailed quote wizard

**Files:**
- Create: `components/quote/quote-fields.tsx`, `components/quote/quote-breakdown.tsx`, `components/quote/quick-quote.tsx`, `components/quote/quote-wizard.tsx`, `components/quote/quote-compare.tsx`, `components/quote/quote-storage.ts`
- Create: `app/bao-gia/page.tsx`
- Test: `tests/quote/quote-storage.test.ts`, `tests/components/quick-quote.test.tsx`

**Interfaces:**
- Consumes `calculateQuote`, `formatVnd`, `QuoteInput`.
- Produces dynamic fields, five-step wizard, three-package comparison, localStorage persistence, print and copy actions.

- [ ] **Step 1: Write failing tests** for product-dependent fields, immediate validation, rendered total, disclaimer, storage round-trip and quote code format.
- [ ] **Step 2: Run focused tests; expected FAIL.**
- [ ] **Step 3: Implement quick quote client component and detailed wizard with stable step state.**
- [ ] **Step 4: Add print CSS and clipboard fallback; run focused tests; expected PASS.**
- [ ] **Step 5: Manually verify seven calculators in browser at mobile and desktop widths.**

### Task 7: Home page conversion sections

**Files:**
- Create: `components/sections/announcement-bar.tsx`, `components/sections/home-hero.tsx`, `components/sections/trust-points.tsx`, `components/sections/product-groups.tsx`, `components/sections/why-us.tsx`, `components/sections/process-steps.tsx`, `components/sections/audience-cards.tsx`, `components/sections/claim-guide-preview.tsx`, `components/sections/testimonial-placeholder.tsx`, `components/sections/faq-preview.tsx`, `components/sections/final-cta.tsx`
- Create: `app/page.tsx`
- Test: `tests/home/home-sections.test.tsx`

**Interfaces:**
- Consumes `QuickQuote`, product config and FAQ/article data.
- Produces the required home section order with one H1 and functional internal links.

- [ ] **Step 1: Write failing test** asserting section order, one H1, quick quote presence and no fake numeric claims.
- [ ] **Step 2: Run focused test; expected FAIL.**
- [ ] **Step 3: Implement responsive home composition, CSS/SVG artwork and light reveal animation.**
- [ ] **Step 4: Run focused test; expected PASS.**

### Task 8: Content, contact and claim-support pages

**Files:**
- Create: `config/content.ts`, `components/forms/contact-form.tsx`, `components/forms/advice-form.tsx`, `components/ui/faq-accordion.tsx`
- Create: `app/gioi-thieu/page.tsx`, `app/lien-he/page.tsx`, `app/boi-thuong/page.tsx`, `app/cau-hoi-thuong-gap/page.tsx`, `app/cam-nang/page.tsx`, `app/cam-nang/[slug]/page.tsx`
- Test: `tests/forms/contact-form.test.tsx`, `tests/components/faq-accordion.test.tsx`

**Interfaces:**
- Produces validated simulated-submit form states, FAQ accordion, claim checklist, article list/detail and all placeholder contact details.

- [ ] **Step 1: Write failing tests** for required name/phone/consent, honeypot handling, success/error copy and FAQ keyboard toggle.
- [ ] **Step 2: Run focused tests; expected FAIL.**
- [ ] **Step 3: Implement Zod schemas, forms, simulated submit state, claim guidance and content pages.**
- [ ] **Step 4: Run focused tests; expected PASS.**

### Task 9: Legal pages, metadata and error states

**Files:**
- Create: `app/chinh-sach-bao-mat/page.tsx`, `app/dieu-khoan-su-dung/page.tsx`, `app/not-found.tsx`, `app/error.tsx`, `app/loading.tsx`, `app/sitemap.ts`, `app/robots.ts`
- Modify: route page files to add `metadata` and JSON-LD.
- Test: `tests/seo/metadata.test.ts`

**Interfaces:**
- Produces route-level metadata, Organization/InsuranceAgency, FAQPage and BreadcrumbList JSON-LD without fake claims.

- [ ] **Step 1: Write failing test** for unique titles, one H1 per route, sitemap entries and required legal disclaimer.
- [ ] **Step 2: Run focused test; expected FAIL.**
- [ ] **Step 3: Implement legal content, metadata, structured data and loading/error/404 states.**
- [ ] **Step 4: Run focused test; expected PASS.**

### Task 10: Verification and polish

**Files:**
- Modify any files identified by verification; no new feature scope.
- Test: full test suite and manual browser checklist.

- [ ] **Step 1: Run `npm test`; expected all tests pass with zero failures.**
- [ ] **Step 2: Run `npm run lint`; expected zero errors and warnings.**
- [ ] **Step 3: Run `npm run typecheck`; expected exit code 0.**
- [ ] **Step 4: Run `npm run build`; expected exit code 0.**
- [ ] **Step 5: Manually inspect 375/768/1024/1440 px, keyboard navigation, print quote, localStorage, all CTA links, loading/empty/error states and `prefers-reduced-motion`.**
- [ ] **Step 6: Record unresolved external integrations and replacement variables in `README.md`.**

