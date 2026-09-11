"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "../ui/icon";

const links = [
  ["Sản phẩm", "/san-pham"],
  ["Tiện ích", "/tien-ich"],
  ["Bảng giá", "/bao-gia"],
  ["Hướng dẫn", "/cam-nang"],
  ["Hỏi đáp", "/cau-hoi"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#cce0f5] bg-[#f4f8fd]/95 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        {/* Brand Logo & Avatar */}
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/image/baoan.jpg"
            alt="Bảo An Tây Nguyên"
            className="h-10 w-10 rounded-full object-cover border border-[#0066cc]/30 shadow-sm"
          />
          <span className="text-[20px] font-bold tracking-tight text-[#0066cc]">
            Bảo An Tây Nguyên
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-[15px] font-medium text-[#0b2341] transition-colors hover:text-[#0066cc]"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Action */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:0916201085"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-[#0066cc] hover:underline"
          >
            <Icon name="phone" size={16} />
            <span>SĐT: 0916 201 085</span>
          </a>
          <Link
            href="/mua-bao-hiem"
            className="inline-flex items-center justify-center rounded-full bg-[#0066cc] px-6 py-2.5 text-[14px] font-semibold text-white transition-transform duration-150 hover:bg-[#0052b3] active:scale-95 shadow-sm"
          >
            Mua ngay
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="p-2 text-[#0b2341] lg:hidden focus:outline-none"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-b border-[#cce0f5] bg-white px-6 py-5 lg:hidden animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-1 text-[16px] font-medium text-[#0b2341] hover:text-[#0066cc]"
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-[#cce0f5] flex flex-col gap-3">
              <a
                href="tel:0916201085"
                className="inline-flex items-center justify-center gap-2 text-[15px] font-bold text-[#0066cc] py-2"
              >
                <Icon name="phone" size={18} />
                <span>SĐT: 0916 201 085</span>
              </a>
              <Link
                href="/bao-gia"
                onClick={() => setOpen(false)}
                className="w-full text-center rounded-full bg-[#0066cc] py-3 text-[15px] font-semibold text-white"
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





