"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TraCuuPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tien-ich");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f4f8fd] flex items-center justify-center p-6 text-center">
      <div className="space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0066cc] border-t-transparent mx-auto"></div>
        <p className="text-sm font-semibold text-[#0b2341]">
          Đang chuyển hướng sang Cổng Tiện Ích...
        </p>
      </div>
    </div>
  );
}
