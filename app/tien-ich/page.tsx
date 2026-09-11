"use client";

import { useState } from "react";
import {
  officialChannels,
  csgtLookupSteps,
  vneTrafficLinks,
} from "../../lib/phat-nguoi";
import {
  findCertificates,
  sampleCertificates,
  type InsuranceCertificate,
} from "../../lib/certificate";
import { ECertificateCard } from "../../components/certificate/e-certificate-card";
import { Icon } from "../../components/ui/icon";

export default function TienIchPage() {
  const [activeTab, setActiveTab] = useState<
    "phat-nguoi" | "dang-kiem" | "tra-cuu-don"
  >("phat-nguoi");

  // Tra cứu đơn state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<InsuranceCertificate[]>(
    sampleCertificates
  );
  const [searched, setSearched] = useState(false);
  const [selectedCert, setSelectedCert] = useState<InsuranceCertificate | null>(
    null
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) {
      setResults(sampleCertificates);
      setSearched(false);
      return;
    }
    const res = findCertificates(query);
    setResults(res);
    setSearched(true);
  }

  function handleReset() {
    setQuery("");
    setResults(sampleCertificates);
    setSearched(false);
  }

  return (
    <main className="min-h-screen bg-[#f4f8fd] py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0066cc]/30 bg-[#eef6ff] px-4 py-1 text-xs font-bold text-[#0066cc]">
            <Icon name="sparkles" size={14} /> CỔNG TIỆN ÍCH PHƯƠNG TIỆN &amp; BẢO HIỂM
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#07192f] sm:text-4xl">
            Tiện Ích Tra Cứu Trực Tuyến 24/7
          </h1>
          <p className="text-sm leading-relaxed text-[#4a6785]">
            Hệ thống hỗ trợ tài xế &amp; chủ xe tra cứu phạt nguội CSGT, hạn đăng kiểm và tra cứu hợp đồng bảo hiểm BIC.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex items-center justify-center gap-2 border-b border-[#cce0f5] pb-4 flex-wrap">
          <button
            onClick={() => setActiveTab("phat-nguoi")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
              activeTab === "phat-nguoi"
                ? "bg-[#0066cc] text-white shadow-md"
                : "bg-white text-[#4a6785] hover:bg-[#eef6ff] hover:text-[#0b2341] border border-[#cce0f5]"
            }`}
          >
            <Icon name="shield" size={15} />
            <span>Tra Cứu Phạt Nguội CSGT</span>
          </button>
          <button
            onClick={() => setActiveTab("dang-kiem")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
              activeTab === "dang-kiem"
                ? "bg-[#0066cc] text-white shadow-md"
                : "bg-white text-[#4a6785] hover:bg-[#eef6ff] hover:text-[#0b2341] border border-[#cce0f5]"
            }`}
          >
            <Icon name="car" size={15} />
            <span>Hạn Đăng Kiểm &amp; Phí Đường Bộ</span>
          </button>
          <button
            onClick={() => setActiveTab("tra-cuu-don")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
              activeTab === "tra-cuu-don"
                ? "bg-[#0066cc] text-white shadow-md"
                : "bg-white text-[#4a6785] hover:bg-[#eef6ff] hover:text-[#0b2341] border border-[#cce0f5]"
            }`}
          >
            <Icon name="search" size={15} />
            <span>Tra Cứu Đơn / Hợp Đồng BIC</span>
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════
            Tab 1: Phạt Nguội CSGT — Official Channels & Guide
            ═══════════════════════════════════════════════════ */}
        {activeTab === "phat-nguoi" && (
          <div className="mt-8 space-y-8">
            <div className="rounded-[20px] border border-[#f5ab19]/30 bg-gradient-to-r from-[#fffdf5] to-[#fff8e6] p-5 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5ab19]/15 text-[#d9940d]">
                  <Icon name="shield" size={16} />
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-[#0b2341]">
                    Tra cứu phạt nguội qua Cổng chính thức
                  </h3>
                  <p className="text-xs leading-relaxed text-[#4a6785]">
                    Hiện tại, Cục Cảnh sát Giao thông (Bộ Công an){" "}
                    <strong>không cung cấp API công khai</strong> cho bên thứ ba.
                    Để đảm bảo tính chính xác và bảo mật thông tin cá nhân, vui
                    lòng tra cứu trực tiếp qua các kênh chính thức dưới đây.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
              {officialChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex flex-col justify-between rounded-[20px] border border-[#cce0f5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0066cc] hover:shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-[#eef6ff] px-2.5 py-1 text-[11px] font-bold text-[#0066cc]">
                        Kênh chính thức
                      </span>
                      <Icon
                        name="arrow"
                        size={15}
                        className="text-[#4a6785] group-hover:text-[#0066cc] transition"
                      />
                    </div>
                    <h4 className="text-sm font-extrabold text-[#07192f] group-hover:text-[#0066cc] transition">
                      {channel.name}
                    </h4>
                    <p className="text-xs leading-relaxed text-[#4a6785]">
                      {channel.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#0066cc]">
                    <span>Truy cập tra cứu</span>
                    <Icon name="arrow" size={14} />
                  </div>
                </a>
              ))}
            </div>

            {/* Guide Steps */}
            <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 max-w-3xl mx-auto space-y-4">
              <div className="flex items-center gap-2">
                <Icon name="check" size={18} className="text-[#0066cc]" />
                <h3 className="text-sm font-bold text-[#07192f]">
                  Hướng dẫn tra cứu trên Cổng csgt.vn (4 bước đơn giản)
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {csgtLookupSteps.map((s) => (
                  <div
                    key={s.step}
                    className="flex items-start gap-3 rounded-2xl bg-[#f4f8fd] border border-[#cce0f5] p-3.5"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0066cc] text-xs font-bold text-white">
                      {s.step}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-[#0b2341]">
                        {s.title}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-[#4a6785]">
                        {s.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VNeTraffic links */}
            <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="rounded-full bg-[#0066cc]/10 px-3 py-0.5 text-[11px] font-bold text-[#0066cc]">
                  Ứng dụng di động Cảnh sát Giao thông
                </span>
                <h4 className="text-sm font-bold text-[#07192f]">
                  Tra cứu phạt nguội qua App VNeTraffic
                </h4>
                <p className="text-xs text-[#4a6785]">
                  Tải ứng dụng chính thức của Cục CSGT để nhận thông báo vi phạm tự động
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={vneTrafficLinks.ios}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-[#cce0f5] bg-[#f4f8fd] px-4 py-2 text-xs font-bold text-[#0b2341] hover:border-[#0066cc] transition"
                >
                  iOS App Store
                </a>
                <a
                  href={vneTrafficLinks.android}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-[#cce0f5] bg-[#f4f8fd] px-4 py-2 text-xs font-bold text-[#0b2341] hover:border-[#0066cc] transition"
                >
                  Google Play
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            Tab 2: Hạn Đăng Kiểm & Phí Đường Bộ
            ═══════════════════════════════════════════════════ */}
        {activeTab === "dang-kiem" && (
          <div className="mt-8 space-y-6 max-w-3xl mx-auto">
            <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 space-y-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#eef6ff] text-[#0066cc]">
                  <Icon name="car" size={20} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#07192f]">
                    Tra Cứu Hạn Đăng Kiểm &amp; Phí Bảo Trì Đường Bộ
                  </h3>
                  <p className="text-xs text-[#4a6785]">
                    Thông tin chính thức từ Cục Đăng kiểm Việt Nam (vr.org.vn)
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#f4f8fd] border border-[#cce0f5] p-4 space-y-3">
                <h4 className="text-xs font-bold text-[#0b2341]">
                  Chu kỳ đăng kiểm theo quy định hiện hành:
                </h4>
                <div className="grid gap-2 sm:grid-cols-2 text-xs text-[#4a6785]">
                  <div className="rounded-xl bg-white p-3 border border-[#cce0f5]">
                    <p className="font-bold text-[#0b2341]">Xe ô tô cá nhân (dưới 9 chỗ)</p>
                    <p className="mt-1">Xe mới: 30 tháng lần đầu, sau đó 24 tháng/lần</p>
                    <p>Xe trên 7 năm: 12 tháng/lần</p>
                    <p>Xe trên 12 năm (phương tiện kinh doanh): 6 tháng/lần</p>
                  </div>
                  <div className="rounded-xl bg-white p-3 border border-[#cce0f5]">
                    <p className="font-bold text-[#0b2341]">Xe tải &amp; xe khách</p>
                    <p className="mt-1">Xe mới: 24 tháng lần đầu</p>
                    <p>Xe từ 7-20 năm: 6 tháng/lần</p>
                    <p>Xe trên 20 năm: 3 tháng/lần</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 border-t border-[#eef6ff] pt-4">
                <a
                  href="https://www.vr.org.vn/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-[#0066cc] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#0052b3] transition"
                >
                  <Icon name="search" size={16} />
                  <span>Tra cứu trên vr.org.vn</span>
                </a>
                <span className="text-xs text-[#4a6785]">
                  Cục Đăng kiểm Việt Nam
                </span>
              </div>
            </div>

            <div className="rounded-[16px] bg-[#eef6ff] border border-[#cce0f5] p-4 flex items-center gap-3">
              <Icon name="phone" size={18} className="text-[#0066cc] shrink-0" />
              <p className="text-xs text-[#0b2341]">
                Hãy kiểm tra tem kiểm định dán trên kính xe hoặc liên hệ hotline{" "}
                <a
                  href="tel:0916201085"
                  className="font-bold text-[#0066cc] hover:underline"
                >
                  0916 201 085
                </a>{" "}
                để nhận nhắc lịch đăng kiểm &amp; mua bảo hiểm TNDS đồng bộ.
              </p>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            Tab 3: Tra Cứu Đơn / Hợp Đồng Bảo Hiểm BIC
            ═══════════════════════════════════════════════════ */}
        {activeTab === "tra-cuu-don" && (
          <div className="mt-8 space-y-6 max-w-3xl mx-auto">
            {/* Search Card */}
            <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 shadow-xl space-y-4">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nhập Biển số xe, SĐT hoặc Mã chứng nhận..."
                    className="w-full rounded-2xl border border-[#cce0f5] bg-[#f8fafc] px-4 py-3.5 pl-11 text-sm font-semibold text-[#0b2341] outline-none transition focus:border-[#0066cc] focus:bg-white"
                  />
                  <Icon name="search" size={18} className="absolute left-4 top-4 text-[#4a6785]" />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#0066cc] px-7 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#0052b3] transition shrink-0"
                >
                  <Icon name="search" size={16} />
                  <span>Tra cứu đơn</span>
                </button>
              </form>

              {/* Sample Suggestions */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4a6785]">
                <span className="font-semibold text-[#0b2341]">Gợi ý mẫu:</span>
                {["47A-888.99", "0916201085", "47B1-678.90"].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => {
                      setQuery(sample);
                      setResults(findCertificates(sample));
                      setSearched(true);
                    }}
                    className="rounded-lg border border-[#cce0f5] bg-[#f4f8fd] px-2.5 py-1 font-mono hover:border-[#0066cc] hover:text-[#0066cc] transition"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#07192f]">
                  {searched
                    ? `Kết quả tìm kiếm (${results.length})`
                    : "Giấy chứng nhận gần nhất của bạn"}
                </h2>
                {searched && (
                  <button
                    onClick={handleReset}
                    className="text-xs font-semibold text-[#0066cc] hover:underline"
                  >
                    Xem tất cả
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="rounded-[20px] border border-[#cce0f5] bg-white p-12 text-center space-y-3">
                  <Icon name="info" size={40} className="mx-auto text-[#4a6785]" />
                  <h3 className="text-base font-bold text-[#07192f]">
                    Không tìm thấy giấy chứng nhận
                  </h3>
                  <p className="text-xs text-[#4a6785]">
                    Không có đơn bảo hiểm nào khớp với từ khoá &quot;{query}&quot;. Vui
                    lòng kiểm tra lại biển số, SĐT hoặc liên hệ Hotline 0916 201 085.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {results.map((cert) => (
                    <div
                      key={cert.id}
                      onClick={() => setSelectedCert(cert)}
                      className="cursor-pointer rounded-[20px] border border-[#cce0f5] bg-white p-5 shadow-sm transition hover:border-[#0066cc] hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-lg bg-[#eef6ff] px-2.5 py-1 text-[11px] font-bold text-[#0066cc]">
                          {cert.licensePlate || cert.id}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            cert.status === "active"
                              ? "bg-[#e6f4ea] text-[#137333]"
                              : "bg-[#fce8e6] text-[#c5221f]"
                          }`}
                        >
                          {cert.status === "active" ? "ĐANG HIỆU LỰC" : "HẾT HẠN"}
                        </span>
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-[#07192f]">
                        {cert.productTitle}
                      </h4>
                      <p className="mt-1 text-xs text-[#4a6785]">
                        Chủ xe: <strong>{cert.ownerName}</strong>
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-[#4a6785]">
                        <span>Hạn: {cert.startDate} &rarr; {cert.endDate}</span>
                        <span className="font-bold text-[#0066cc]">Xem chi tiết &rarr;</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Certificate Detail */}
            {selectedCert && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[24px] bg-white p-6 shadow-2xl">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="absolute right-4 top-4 rounded-full bg-[#f4f8fd] p-2 text-[#4a6785] hover:bg-[#eef6ff] hover:text-[#0b2341]"
                  >
                    &times;
                  </button>
                  <ECertificateCard cert={selectedCert} onClose={() => setSelectedCert(null)} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
