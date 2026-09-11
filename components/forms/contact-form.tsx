"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = e.currentTarget;
        if ((f.elements.namedItem("website") as HTMLInputElement).value) {
          setStatus("Không thể gửi yêu cầu này.");
          return;
        }
        if (
          !(f.elements.namedItem("name") as HTMLInputElement).value.trim() ||
          !(f.elements.namedItem("phone") as HTMLInputElement).value.trim() ||
          !(f.elements.namedItem("consent") as HTMLInputElement).checked
        ) {
          setStatus("Vui lòng điền họ tên, số điện thoại và đồng ý điều khoản.");
          return;
        }
        setStatus("Yêu cầu đã được ghi nhận trên trình duyệt. Form này chưa kết nối hệ thống gửi dữ liệu thật; vui lòng gọi/Zalo 0916 201 085 để được tư vấn ngay.");
        f.reset();
      }}
      className="space-y-4 rounded-[18px] border border-[#cce0f5] bg-[#ffffff] p-6 text-[#0b2341] lg:p-8"
      noValidate
    >
      <div className="flex items-center justify-between border-b border-[#cce0f5] pb-4">
        <div>
          <h3 className="text-lg font-bold text-[#0b2341]">Gửi yêu cầu tư vấn</h3>
          <p className="text-xs text-[#4a6785]">Để lại thông tin nháp trước khi kết nối tư vấn thật qua Hotline/Zalo</p>
        </div>
        <span className="rounded-full border border-[#0066cc]/40 bg-[#f4f8fd] px-3 py-1 font-mono text-[11px] font-bold text-[#0066cc]">
          Bản nháp
        </span>
      </div>

      <label className="block text-xs font-semibold text-[#0b2341]">
        Họ và tên
        <input
          name="name"
          required
          placeholder="Nguyễn Văn An"
          className="mt-2 w-full rounded-[11px] border border-[#cce0f5] bg-[#f4f8fd] p-3 text-sm text-[#0b2341] outline-none focus:border-[#0066cc]"
        />
      </label>

      <label className="block text-xs font-semibold text-[#0b2341]">
        Số điện thoại (Nhận báo giá / Zalo)
        <input
          name="phone"
          required
          inputMode="tel"
          placeholder="09xx xxx xxx"
          className="mt-2 w-full rounded-[11px] border border-[#cce0f5] bg-[#f4f8fd] p-3 text-sm text-[#0b2341] outline-none focus:border-[#0066cc]"
        />
      </label>

      <label className="block text-xs font-semibold text-[#0b2341]">
        Email <span className="font-normal text-[#4a6785]">(tùy chọn)</span>
        <input
          name="email"
          type="email"
          placeholder="ban@vidu.vn"
          className="mt-2 w-full rounded-[11px] border border-[#cce0f5] bg-[#f4f8fd] p-3 text-sm text-[#0b2341] outline-none focus:border-[#0066cc]"
        />
      </label>

      <label className="block text-xs font-semibold text-[#0b2341]">
        Sản phẩm bạn muốn tư vấn
        <select
          name="interest"
          className="mt-2 w-full rounded-[11px] border border-[#cce0f5] bg-[#f4f8fd] p-3 text-sm text-[#0b2341] outline-none focus:border-[#0066cc]"
        >
          <option>Bảo hiểm TNDS bắt buộc ô tô</option>
          <option>Bảo hiểm xe máy điện tử</option>
          <option>Bảo hiểm sức khỏe & viện phí</option>
          <option>Bảo hiểm du lịch quốc tế</option>
          <option>Bảo hiểm nhà xưởng & doanh nghiệp</option>
        </select>
      </label>

      <label className="block text-xs font-semibold text-[#0b2341]">
        Yêu cầu chi tiết
        <textarea
          name="message"
          rows={3}
          placeholder="Ví dụ: Xe ô tô 5 chỗ chạy taxi công nghệ, cần cấp giấy chứng nhận trong ngày..."
          className="mt-2 w-full rounded-[11px] border border-[#cce0f5] bg-[#f4f8fd] p-3 text-sm text-[#0b2341] outline-none focus:border-[#0066cc]"
        />
      </label>

      <label className="flex items-center gap-2 text-[12px] text-[#4a6785]">
        <input name="consent" type="checkbox" required className="accent-[#0066cc]" />
        Tôi đồng ý với chính sách xử lý thông tin cấp đơn bảo hiểm.
      </label>

      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />

      <button
        className="w-full rounded-full bg-[#0066cc] px-5 py-3.5 text-sm font-semibold text-white transition-transform duration-150 hover:bg-[#0052b3] active:scale-95 shadow-sm"
        type="submit"
      >
        Lưu yêu cầu tư vấn
      </button>

      {status && (
        <p className="text-xs text-[#0066cc] font-mono" role="status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  );
}

