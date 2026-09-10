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
    <header className="sticky top-0 z-50 border-b border-[#d5e5e2] bg-[#f7fbfa]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/image/bic-logo.png" alt="BIC" className="h-12 w-auto object-contain" />
          <span className="hidden text-[17px] font-bold tracking-tight text-[#103b3b] sm:inline">Bảo hiểm BIC</span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-[14px] text-[#456464] transition-colors hover:text-[#006b66]"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:0949013668"
            className="inline-flex items-center gap-1.5 rounded-[9999px] border border-[#d5e5e2] bg-[#ffffff] px-3.5 py-1.5 text-[13px] font-medium text-[#103b3b] transition-colors hover:border-[#006b66] hover:text-[#006b66]"
          >
            <span>☎</span> 0949 013 668
          </a>
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[9999px] border border-[#d5e5e2] bg-[#ffffff] px-3.5 py-1.5 text-[13px] font-medium text-[#103b3b] transition-colors hover:border-[#006b66] hover:text-[#006b66]"
          >
            💬 Zalo
          </a>
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-1.5 rounded-[9999px] border border-[#d5e5e2] bg-[#ffffff] px-3.5 py-1.5 text-[13px] font-medium text-[#103b3b] transition-colors hover:border-[#006b66] hover:text-[#006b66]"
          >
            🔑 Đăng nhập
          </Link>
          <Link
            href="/bao-gia"
            className="inline-flex items-center justify-center rounded-[6px] bg-[#006b66] px-4 py-2 text-[14px] font-semibold text-[#f7fbfa] transition-colors hover:bg-[#0b8f86]"
          >
            Mua ngay
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="rounded-[6px] border border-[#d5e5e2] p-2 text-[#103b3b] lg:hidden"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {open && (
        <div className="border-b border-[#d5e5e2] bg-[#ffffff] px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-[14px] text-[#456464] hover:text-[#006b66]"
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-[#d5e5e2]">
              <a
                href="tel:0949013668"
                className="inline-flex items-center gap-1.5 rounded-[9999px] border border-[#d5e5e2] bg-[#f7fbfa] px-3 py-1.5 text-xs text-[#103b3b]"
              >
                ☎ 0949 013 668
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[9999px] border border-[#d5e5e2] bg-[#f7fbfa] px-3 py-1.5 text-xs text-[#103b3b]"
              >
                💬 Zalo
              </a>
              <Link
                href="/bao-gia"
                onClick={() => setOpen(false)}
                className="w-full text-center rounded-[6px] bg-[#006b66] py-2.5 text-sm font-semibold text-[#f7fbfa]"
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



