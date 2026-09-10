"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "../ui/icon";

const links = [
  ["Sản phẩm", "/san-pham"],
  ["Vì sao chọn", "/#vi-sao-chon"],
  ["Quy trình", "/#quy-trinh"],
  ["Bảng giá", "/bao-gia"],
  ["Hướng dẫn", "/cam-nang"],
  ["Hỏi đáp", "/cau-hoi"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#cce5e1] bg-[#f4faf8]/95 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/image/bic-logo.png" alt="BIC" className="h-10 w-auto object-contain" />
          <span className="text-[20px] font-bold tracking-tight text-[#006b66]">
            Bảo An Tây Nguyên
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-[15px] font-medium text-[#103b3b] transition-colors hover:text-[#006b66]"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Action */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:0396998765"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-[#006b66] hover:underline"
          >
            <Icon name="phone" size={16} />
            <span>SĐT: 0396998765</span>
          </a>
          <Link
            href="/bao-gia"
            className="inline-flex items-center justify-center rounded-full bg-[#006b66] px-6 py-2.5 text-[14px] font-semibold text-white transition-transform duration-150 hover:bg-[#005450] active:scale-95 shadow-sm"
          >
            Mua ngay
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="p-2 text-[#103b3b] lg:hidden focus:outline-none"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-b border-[#cce5e1] bg-white px-6 py-5 lg:hidden animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-1 text-[16px] font-medium text-[#103b3b] hover:text-[#006b66]"
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-[#cce5e1] flex flex-col gap-3">
              <a
                href="tel:0396998765"
                className="inline-flex items-center justify-center gap-2 text-[15px] font-bold text-[#006b66] py-2"
              >
                <Icon name="phone" size={18} />
                <span>SĐT: 0396998765</span>
              </a>
              <Link
                href="/bao-gia"
                onClick={() => setOpen(false)}
                className="w-full text-center rounded-full bg-[#006b66] py-3 text-[15px] font-semibold text-white"
              >
                Mua ngay
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}





