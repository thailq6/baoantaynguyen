"use client";

import { Icon } from "../ui/icon";

export function MobileActionBar() {
  function scrollToQuote() {
    if (typeof window !== "undefined") {
      const el = document.getElementById("tinh-phi") || document.getElementById("quick-quote-box");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.href = "/bao-gia#tinh-phi";
      }
    }
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#cce0f5] px-4 py-2.5 shadow-[0_-4px_20px_rgba(7,25,47,0.12)]">
      <div className="mx-auto flex items-center justify-between gap-2 max-w-[500px]">
        {/* Hotline Call */}
        <a
          href="tel:0916201085"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#eef6ff] text-[#0066cc] font-semibold text-[11px] transition active:scale-95 border border-[#cce0f5]"
        >
          <Icon name="phone" size={18} className="text-[#0066cc] mb-0.5" />
          <span>0916 201 085</span>
        </a>

        {/* Zalo Chat */}
        <a
          href="https://zalo.me/0916201085"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#0066cc]/10 text-[#0066cc] font-semibold text-[11px] transition active:scale-95 border border-[#0066cc]/20"
        >
          <Icon name="message" size={18} className="text-[#0066cc] mb-0.5" />
          <span>Zalo Chat</span>
        </a>

        {/* Quick Quote */}
        <button
          type="button"
          onClick={scrollToQuote}
          className="flex-[1.2] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#0066cc] text-white font-bold text-[13px] shadow-sm transition active:scale-95 hover:bg-[#0052b3]"
        >
          <Icon name="calculator" size={16} />
          <span>Tính phí ngay</span>
        </button>
      </div>
    </div>
  );
}
