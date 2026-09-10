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
        setStatus("AI đã tiếp nhận yêu cầu! Chuyên viên BIC và AI Agent sẽ liên hệ qua Zalo/SĐT trong 3 phút.");
        f.reset();
      }}
      className="space-y-4 rounded-[8px] border border-[#d5e5e2] bg-[#ffffff] p-6 text-[#103b3b] lg:p-8"
      noValidate
    >
      <div className="flex items-center justify-between border-b border-[#d5e5e2] pb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#103b3b]">Gửi yêu cầu hỗ trợ AI</h3>
          <p className="text-xs text-[#6f8585]">Nhận tư vấn chi tiết từ AI và chuyên viên BIC</p>
        </div>
        <span className="rounded-full border border-[#006b66]/40 bg-[#f7fbfa] px-2.5 py-1 font-mono text-[11px] text-[#006b66]">
          ● 24/7 Live
        </span>
      </div>

      <label className="block text-xs font-semibold text-[#456464]">
        Họ và tên
        <input
          name="name"
          required
          placeholder="Nguyễn Văn An"
          className="mt-2 w-full rounded-[6px] border border-[#d5e5e2] bg-[#f7fbfa] p-3 text-sm text-[#103b3b] outline-none focus:border-[#006b66]"
        />
      </label>

      <label className="block text-xs font-semibold text-[#456464]">
        Số điện thoại (Nhận báo giá / Zalo)
        <input
          name="phone"
          required
          inputMode="tel"
          placeholder="09xx xxx xxx"
          className="mt-2 w-full rounded-[6px] border border-[#d5e5e2] bg-[#f7fbfa] p-3 text-sm text-[#103b3b] outline-none focus:border-[#006b66]"
        />
      </label>

      <label className="block text-xs font-semibold text-[#456464]">
        Email <span className="font-normal text-[#6f8585]">(tùy chọn)</span>
        <input
          name="email"
          type="email"
          placeholder="ban@vidu.vn"
          className="mt-2 w-full rounded-[6px] border border-[#d5e5e2] bg-[#f7fbfa] p-3 text-sm text-[#103b3b] outline-none focus:border-[#006b66]"
        />
      </label>

      <label className="block text-xs font-semibold text-[#456464]">
        Sản phẩm bạn muốn tư vấn
        <select
          name="interest"
          className="mt-2 w-full rounded-[6px] border border-[#d5e5e2] bg-[#f7fbfa] p-3 text-sm text-[#103b3b] outline-none focus:border-[#006b66]"
        >
          <option>Bảo hiểm TNDS bắt buộc ô tô</option>
          <option>Bảo hiểm xe máy điện tử</option>
          <option>Bảo hiểm sức khỏe & viện phí</option>
          <option>Bảo hiểm du lịch quốc tế</option>
          <option>Bảo hiểm nhà xưởng & doanh nghiệp</option>
        </select>
      </label>

      <label className="block text-xs font-semibold text-[#456464]">
        Yêu cầu chi tiết
        <textarea
          name="message"
          rows={3}
          placeholder="Ví dụ: Xe ô tô 5 chỗ chạy taxi công nghệ, cần cấp giấy chứng nhận trong ngày..."
          className="mt-2 w-full rounded-[6px] border border-[#d5e5e2] bg-[#f7fbfa] p-3 text-sm text-[#103b3b] outline-none focus:border-[#006b66]"
        />
      </label>

      <label className="flex items-center gap-2 text-[12px] text-[#6f8585]">
        <input name="consent" type="checkbox" required className="accent-[#006b66]" />
        Tôi đồng ý với chính sách xử lý thông tin cấp đơn bảo hiểm.
      </label>

      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />

      <button
        className="w-full rounded-[6px] bg-[#006b66] px-5 py-3 text-sm font-semibold text-[#f7fbfa] transition-colors hover:bg-[#0b8f86]"
        type="submit"
      >
        Gửi yêu cầu qua AI & BIC ngay
      </button>

      {status && (
        <p className="text-xs text-[#006b66] font-mono" role="status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  );
}


