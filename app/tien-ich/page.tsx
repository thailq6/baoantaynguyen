"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon, type IconName } from "../../components/ui/icon";
import {
  officialChannels,
  csgtLookupSteps,
  vneTrafficLinks,
} from "../../lib/phat-nguoi";
import {
  formatRenewalDate,
  formatRenewalMoney,
  RENEWAL_PRODUCTS,
  type RenewalPolicy,
  type RenewalProductType,
} from "../../lib/renewal";
import {
  provincesList,
  sampleRegistryItems,
  transformBicGara,
  transformBicHospital,
  transformBicBranch,
  transformBicRescue,
  filterNetworkItems,
  type NetworkType,
  type NetworkItem,
} from "../../lib/network-data";

export type TabGroup = "mang-luoi" | "tra-cuu";
export type ActiveTab =
  | "NETWORK_GARA"
  | "NETWORK_MEDICAL"
  | "NETWORK_BIC"
  | "RESCUE_CENTER"
  | "SEARCH_REGISTRY"
  | "tai-tuc"
  | "phat-nguoi"
  | "dang-kiem";

function TienIchContent() {
  const searchParams = useSearchParams();

  const [activeGroup, setActiveGroup] = useState<TabGroup>("mang-luoi");
  const [activeTab, setActiveTab] = useState<ActiveTab>("NETWORK_GARA");

  // Network filter state
  const [selectedProvince, setSelectedProvince] = useState("Tất cả Tỉnh/Thành");
  const [networkQuery, setNetworkQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(60);

  // Network dataset state
  const [allNetworkItems, setAllNetworkItems] = useState<NetworkItem[]>([]);
  const [networkLoading, setNetworkLoading] = useState(true);
  const [dynamicProvinces, setDynamicProvinces] = useState<string[]>(provincesList);

  // Tái tục state
  const [renewalProductType, setRenewalProductType] = useState<RenewalProductType>("MVL");
  const [renewalQuery, setRenewalQuery] = useState("47H12345");
  const [renewalResults, setRenewalResults] = useState<RenewalPolicy[]>([]);
  const [renewalSearched, setRenewalSearched] = useState(false);
  const [renewalLoading, setRenewalLoading] = useState(false);
  const [renewalError, setRenewalError] = useState("");

  // Get selected product configuration info
  const selectedProductInfo = RENEWAL_PRODUCTS.find((p) => p.code === renewalProductType) || RENEWAL_PRODUCTS[0];

  // Fetch full real datasets directly from BIC API
  useEffect(() => {
    let isMounted = true;

    async function fetchNetworkData() {
      setNetworkLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
        };

        const [garaRes, medRes, bicRes, rescueRes, provRes] = await Promise.allSettled([
          fetch("https://apigw.bic.vn/bicws/GetListGara", { headers }).then((r) => r.json()),
          fetch("https://apigw.bic.vn/bicws/GetListHospital", { headers }).then((r) => r.json()),
          fetch("https://apigw.bic.vn/bicws/GetListBranch", { headers }).then((r) => r.json()),
          fetch("https://apigw.bic.vn/bicws/GetRescueUnits", { headers }).then((r) => r.json()),
          fetch("https://apigw.bic.vn/bicws/GetProvinces", { headers }).then((r) => r.json()),
        ]);

        const garas: NetworkItem[] =
          garaRes.status === "fulfilled" && Array.isArray(garaRes.value)
            ? garaRes.value.map(transformBicGara)
            : [];

        const hospitals: NetworkItem[] =
          medRes.status === "fulfilled" && Array.isArray(medRes.value)
            ? medRes.value.map(transformBicHospital)
            : [];

        const branches: NetworkItem[] =
          bicRes.status === "fulfilled" && Array.isArray(bicRes.value)
            ? bicRes.value.map(transformBicBranch)
            : [];

        const rescue: NetworkItem[] =
          rescueRes.status === "fulfilled" && Array.isArray(rescueRes.value)
            ? rescueRes.value.map(transformBicRescue)
            : [];

        const combined: NetworkItem[] = [
          ...garas,
          ...hospitals,
          ...branches,
          ...rescue,
          ...sampleRegistryItems,
        ];

        if (isMounted) {
          setAllNetworkItems(combined);

          if (provRes.status === "fulfilled" && Array.isArray(provRes.value) && provRes.value.length > 0) {
            const fetchedProvinces = [
              "Tất cả Tỉnh/Thành",
              ...provRes.value.map((p: any) => p.name || p.full_name).filter(Boolean),
            ];
            setDynamicProvinces(Array.from(new Set(fetchedProvinces)));
          }
        }
      } catch (err) {
        console.error("Failed to load network data:", err);
      } finally {
        if (isMounted) setNetworkLoading(false);
      }
    }

    fetchNetworkData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync tab with URL search params
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const subtabParam = searchParams.get("subtab") || searchParams.get("type");

    if (tabParam === "tai-tuc") {
      setActiveGroup("tra-cuu");
      setActiveTab("tai-tuc");
    } else if (tabParam === "phat-nguoi") {
      setActiveGroup("tra-cuu");
      setActiveTab("phat-nguoi");
    } else if (tabParam === "dang-kiem") {
      setActiveGroup("tra-cuu");
      setActiveTab("dang-kiem");
    } else if (tabParam === "mang-luoi" || subtabParam) {
      setActiveGroup("mang-luoi");
      if (
        subtabParam === "NETWORK_GARA" ||
        subtabParam === "NETWORK_MEDICAL" ||
        subtabParam === "NETWORK_BIC" ||
        subtabParam === "RESCUE_CENTER" ||
        subtabParam === "SEARCH_REGISTRY"
      ) {
        setActiveTab(subtabParam as ActiveTab);
      }
    }
  }, [searchParams]);

  // Reset pagination on tab / filter change
  useEffect(() => {
    setVisibleCount(60);
  }, [activeTab, selectedProvince, networkQuery]);

  async function handleRenewalSearch(e: React.FormEvent) {
    e.preventDefault();
    const certificateNo = renewalQuery.trim();

    if (!certificateNo) {
      setRenewalError("Vui lòng nhập số GCN, số đơn BH hoặc biển số xe.");
      setRenewalResults([]);
      setRenewalSearched(false);
      return;
    }

    setRenewalLoading(true);
    setRenewalError("");
    setRenewalSearched(true);

    try {
      const res = await fetch("/api/renewal/mvl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certificateNo,
          productType: renewalProductType,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Không thể tra cứu dữ liệu tái tục.");
      }

      setRenewalResults(Array.isArray(data?.policies) ? data.policies : []);
    } catch (err: unknown) {
      setRenewalResults([]);
      setRenewalError(err instanceof Error ? err.message : "Không thể tra cứu dữ liệu tái tục.");
    } finally {
      setRenewalLoading(false);
    }
  }

  // Filtered network list
  const isNetworkTab =
    activeTab === "NETWORK_GARA" ||
    activeTab === "NETWORK_MEDICAL" ||
    activeTab === "NETWORK_BIC" ||
    activeTab === "RESCUE_CENTER" ||
    activeTab === "SEARCH_REGISTRY";

  const fullFilteredNetworkList = isNetworkTab
    ? filterNetworkItems(
        allNetworkItems,
        activeTab as NetworkType,
        selectedProvince,
        networkQuery
      )
    : [];

  const paginatedNetworkList = fullFilteredNetworkList.slice(0, visibleCount);

  // Category counts
  const countGara = allNetworkItems.filter((i) => i.type === "NETWORK_GARA").length;
  const countMedical = allNetworkItems.filter((i) => i.type === "NETWORK_MEDICAL").length;
  const countBic = allNetworkItems.filter((i) => i.type === "NETWORK_BIC").length;
  const countRescue = allNetworkItems.filter((i) => i.type === "RESCUE_CENTER").length;
  const countRegistry = allNetworkItems.filter((i) => i.type === "SEARCH_REGISTRY").length;

  return (
    <main className="min-h-screen bg-[#f4f8fd] py-8 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Header Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#cce0f5] pb-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#0066cc] border border-[#cce0f5] shadow-sm hover:bg-[#eef6ff] transition"
          >
            <Icon name="arrow" size={14} className="rotate-180" />
            <span>Quay lại Trang chủ</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#4a6785]">
            <Link href="/" className="hover:text-[#0066cc]">
              Trang chủ
            </Link>
            <span>&rsaquo;</span>
            <span className="text-[#0066cc]">Cổng Tiện Ích &amp; Mạng Lưới</span>
          </div>
        </div>

        {/* Page Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0066cc]/30 bg-[#eef6ff] px-4 py-1.5 text-xs font-bold text-[#0066cc]">
            <Icon name="sparkles" size={14} className="text-[#f5ab19]" />
            CỔNG TIỆN ÍCH, MẠNG LƯỚI &amp; TÁI TỤC BẢO HIỂM BIC
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#07192f] sm:text-4xl">
            Mạng Lưới &amp; Tái Tục Bảo Hiểm Trực Tuyến
          </h1>
          <p className="text-sm leading-relaxed text-[#4a6785]">
            Tra cứu Gara liên kết, Bệnh viện bảo lãnh viện phí, Chi nhánh BIC, Cứu hộ 24/7 và tái tục hợp đồng bảo hiểm nhanh chóng.
          </p>
        </div>

        {/* Top Level Category Mode Switcher */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-[#cce0f5] bg-white p-1.5 shadow-sm">
            <button
              onClick={() => {
                setActiveGroup("mang-luoi");
                setActiveTab("NETWORK_GARA");
              }}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold transition ${
                activeGroup === "mang-luoi"
                  ? "bg-[#0066cc] text-white shadow-md"
                  : "text-[#4a6785] hover:text-[#0b2341]"
              }`}
            >
              <Icon name="shield" size={16} />
              <span>1. MẠNG LƯỚI BẢO HIỂM</span>
            </button>
            <button
              onClick={() => {
                setActiveGroup("tra-cuu");
                setActiveTab("tai-tuc");
              }}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold transition ${
                activeGroup === "tra-cuu"
                  ? "bg-[#0066cc] text-white shadow-md"
                  : "text-[#4a6785] hover:text-[#0b2341]"
              }`}
            >
              <Icon name="clock" size={16} />
              <span>2. TÁI TỤC &amp; TIỆN ÍCH</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            GROUP 1: MẠNG LƯỚI BẢO HIỂM (NETWORK LOOKUP)
            ═══════════════════════════════════════════════════ */}
        {activeGroup === "mang-luoi" && (
          <div className="mt-8 space-y-8">
            {/* Sub Tabs for Network */}
            <div className="flex items-center justify-center gap-2 border-b border-[#cce0f5] pb-4 flex-wrap">
              {[
                ["NETWORK_GARA", `Gara Liên Kết BIC (${countGara > 0 ? countGara.toLocaleString() : "..."})`, "car"],
                ["NETWORK_MEDICAL", `Bệnh Viện Bảo Lãnh (${countMedical > 0 ? countMedical.toLocaleString() : "..."})`, "shield"],
                ["NETWORK_BIC", `Đơn Vị & Giám Định (${countBic > 0 ? countBic.toLocaleString() : "..."})`, "info"],
                ["RESCUE_CENTER", `Cứu Hộ 24/7 (${countRescue > 0 ? countRescue.toLocaleString() : "..."})`, "phone"],
                ["SEARCH_REGISTRY", `Trạm Đăng Kiểm Xe (${countRegistry > 0 ? countRegistry.toLocaleString() : "..."})`, "check"],
              ].map(([t, label, iconName]) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t as ActiveTab)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                    activeTab === t
                      ? "bg-[#0066cc] text-white shadow-md"
                      : "bg-white text-[#4a6785] hover:bg-[#eef6ff] hover:text-[#0b2341] border border-[#cce0f5]"
                  }`}
                >
                  <Icon name={iconName as IconName} size={15} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Network Filter Bar */}
            <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 shadow-md space-y-4">
              <div className="grid gap-4 sm:grid-cols-[240px_1fr]">
                <div>
                  <label className="block text-xs font-bold text-[#07192f] mb-1.5">
                    Tỉnh / Thành phố:
                  </label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-4 py-3 text-xs font-bold text-[#0b2341] outline-none transition focus:border-[#0066cc] focus:bg-white"
                  >
                    {dynamicProvinces.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#07192f] mb-1.5">
                    Từ khóa tìm kiếm:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={networkQuery}
                      onChange={(e) => setNetworkQuery(e.target.value)}
                      placeholder="Nhập tên gara, bệnh viện, số điện thoại hoặc địa chỉ..."
                      className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-4 py-3 pl-10 text-xs font-semibold text-[#0b2341] outline-none transition focus:border-[#0066cc] focus:bg-white"
                    />
                    <Icon name="search" size={16} className="absolute left-3.5 top-3.5 text-[#4a6785]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Network Results List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#07192f]">
                  Danh sách kết quả:{" "}
                  <span className="text-[#0066cc] font-mono">
                    {fullFilteredNetworkList.length.toLocaleString()} địa điểm
                  </span>
                  {networkLoading && <span className="ml-2 text-xs font-normal text-[#4a6785] animate-pulse">(Đang tải dữ liệu BIC API...)</span>}
                </h2>
                {(selectedProvince !== "Tất cả Tỉnh/Thành" || networkQuery) && (
                  <button
                    onClick={() => {
                      setSelectedProvince("Tất cả Tỉnh/Thành");
                      setNetworkQuery("");
                    }}
                    className="text-xs font-semibold text-[#0066cc] hover:underline"
                  >
                    Đặt lại bộ lọc
                  </button>
                )}
              </div>

              {networkLoading ? (
                <div className="rounded-[20px] border border-[#cce0f5] bg-white p-12 text-center space-y-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0066cc] border-t-transparent mx-auto"></div>
                  <p className="text-sm font-semibold text-[#0b2341]">Đang tải toàn bộ dữ liệu từ BIC API Server...</p>
                </div>
              ) : paginatedNetworkList.length === 0 ? (
                <div className="rounded-[20px] border border-[#cce0f5] bg-white p-12 text-center space-y-3">
                  <Icon name="info" size={40} className="mx-auto text-[#4a6785]" />
                  <h3 className="text-base font-bold text-[#07192f]">Không tìm thấy địa điểm phù hợp</h3>
                  <p className="text-xs text-[#4a6785]">
                    Vui lòng thử chọn lại Tỉnh/Thành phố khác hoặc thay đổi từ khóa tìm kiếm.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    {paginatedNetworkList.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col justify-between rounded-[20px] border border-[#cce0f5] bg-white p-5 shadow-sm transition hover:border-[#0066cc] hover:shadow-md"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-sm font-extrabold text-[#07192f] leading-snug">
                              {item.name}
                            </h3>
                            {item.badge && (
                              <span className="shrink-0 rounded-full bg-[#eef6ff] border border-[#cce0f5] px-3 py-1 text-[11px] font-bold text-[#0066cc]">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          <p className="flex items-start gap-2 text-xs text-[#4a6785]">
                            <Icon name="check" size={15} className="shrink-0 text-[#0066cc] mt-0.5" />
                            <span><strong>Địa chỉ:</strong> {item.address}</span>
                          </p>

                          <p className="flex items-center gap-2 text-xs text-[#4a6785]">
                            <Icon name="phone" size={15} className="shrink-0 text-[#0066cc]" />
                            <span>
                              <strong>Hotline:</strong>{" "}
                              <a href={`tel:${item.phone.replace(/\s+/g, "")}`} className="font-mono font-bold text-[#0066cc] hover:underline">
                                {item.phone}
                              </a>
                            </span>
                          </p>

                          {item.services && item.services.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.services.map((srv) => (
                                <span key={srv} className="rounded-md bg-[#f4f8fd] px-2 py-0.5 text-[11px] font-semibold text-[#0b2341]">
                                  • {srv}
                                </span>
                              ))}
                            </div>
                          )}

                          {item.note && (
                            <p className="rounded-xl bg-[#fffdf5] border border-[#f5ab19]/30 p-2.5 text-[11px] text-[#4a6785] leading-relaxed">
                              💡 {item.note}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-[#f4f8fd] pt-3 text-xs">
                          <span className="font-semibold text-[#6b84a5]">{item.province || "Việt Nam"}</span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + " " + item.address)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-[#0066cc] hover:underline"
                          >
                            <span>Chỉ đường Maps</span>
                            <Icon name="arrow" size={12} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More Button for Large Datasets */}
                  {visibleCount < fullFilteredNetworkList.length && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + 60)}
                        className="inline-flex items-center gap-2 rounded-full border border-[#0066cc] bg-white px-8 py-3 text-xs font-bold text-[#0066cc] shadow-sm hover:bg-[#eef6ff] transition"
                      >
                        <span>Xem thêm kết quả ({fullFilteredNetworkList.length - visibleCount} còn lại)</span>
                        <Icon name="arrow" size={14} className="rotate-90" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            GROUP 2: TÁI TỤC & TIỆN ÍCH (RENEWAL & UTILITIES)
            ═══════════════════════════════════════════════════ */}
        {activeGroup === "tra-cuu" && (
          <div className="mt-8 space-y-8">
            {/* Sub Tabs for Group 2 */}
            <div className="flex items-center justify-center gap-2 border-b border-[#cce0f5] pb-4 flex-wrap">
              {[
                ["tai-tuc", "Tái Tục Bảo Hiểm BIC", "clock"],
                ["phat-nguoi", "Phạt Nguội CSGT", "shield"],
                ["dang-kiem", "Hạn Đăng Kiểm & Phí Road", "car"],
              ].map(([t, label, iconName]) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t as ActiveTab)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                    activeTab === t
                      ? "bg-[#0066cc] text-white shadow-md"
                      : "bg-white text-[#4a6785] hover:bg-[#eef6ff] hover:text-[#0b2341] border border-[#cce0f5]"
                  }`}
                >
                  <Icon name={iconName as IconName} size={15} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* SubTab: Tái tục */}
            {activeTab === "tai-tuc" && (
              <div className="space-y-8 max-w-4xl mx-auto">
                <section className="rounded-[24px] border border-[#cce0f5] bg-white p-6 shadow-xl md:p-8">
                  <div className="mb-6 border-b border-[#f4f8fd] pb-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0066cc] mb-2">
                      <Icon name="clock" size={14} /> CỔNG TÁI TỤC TRỰC TUYẾN CHÍNH HÃNG BIC
                    </span>
                    <h2 className="text-2xl font-extrabold tracking-tight text-[#0066cc]">
                      Tra Cứu &amp; Tái Tục Hợp Đồng Bảo Hiểm
                    </h2>
                    <p className="mt-1 text-xs text-[#4a6785]">
                      Chọn sản phẩm và nhập Số Giấy chứng nhận (GCN) hoặc Biển số xe để lấy dữ liệu tái tục tức thì.
                    </p>
                  </div>

                  <form onSubmit={handleRenewalSearch} className="grid gap-5 lg:grid-cols-[1.1fr_1.1fr_auto] lg:items-end">
                    <div>
                      <label className="block text-xs font-bold text-[#07192f] mb-1.5">
                        Sản phẩm bảo hiểm cần tái tục <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={renewalProductType}
                        onChange={(e) => setRenewalProductType(e.target.value as RenewalProductType)}
                        className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-4 py-3 text-xs font-bold text-[#0b2341] outline-none transition focus:border-[#0066cc] focus:bg-white"
                      >
                        {RENEWAL_PRODUCTS.map((prod) => (
                          <option key={prod.code} value={prod.code}>
                            {prod.name} ({prod.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#07192f] mb-1.5">
                        Thông tin tra cứu <span className="text-rose-500">*</span>
                      </label>
                      <input
                        value={renewalQuery}
                        onChange={(e) => setRenewalQuery(e.target.value)}
                        placeholder={selectedProductInfo.placeholder}
                        className="w-full rounded-xl border border-[#cce0f5] bg-[#f8fafc] px-4 py-3 text-xs font-semibold text-[#0b2341] outline-none transition focus:border-[#0066cc] focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={renewalLoading}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#0066cc] px-7 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#0052b3] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Icon name="search" size={16} />
                      <span>{renewalLoading ? "Đang tra cứu..." : "Tra cứu tái tục"}</span>
                    </button>
                  </form>
                </section>

                {renewalError && (
                  <div className="rounded-[18px] border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
                    {renewalError}
                  </div>
                )}

                {renewalSearched && !renewalLoading && !renewalError && (
                  <section className="space-y-5">
                    <h2 className="text-sm font-bold text-[#07192f]">
                      Kết quả tìm kiếm cho <span className="text-[#0066cc] font-bold">{selectedProductInfo.name}</span>:{" "}
                      <span className="font-normal text-[#4a6785]">{renewalResults.length} kết quả</span>
                    </h2>

                    {renewalResults.length === 0 ? (
                      <div className="rounded-[20px] border border-[#cce0f5] bg-white p-10 text-center space-y-3">
                        <Icon name="info" size={38} className="mx-auto text-[#4a6785]" />
                        <h3 className="text-base font-bold text-[#07192f]">Không tìm thấy hợp đồng tái tục</h3>
                        <p className="text-xs leading-5 text-[#4a6785]">
                          Không có dữ liệu tái tục khớp với từ khóa &quot;{renewalQuery}&quot;. Vui lòng kiểm tra lại số GCN hoặc liên hệ Hotline 0916 201 085 để được hỗ trợ.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {renewalResults.map((policy) => (
                          <RenewalResultCard key={`${policy.certificateNo}-${policy.numberPlate || policy.insuredName}`} policy={policy} />
                        ))}
                      </div>
                    )}
                  </section>
                )}
              </div>
            )}

            {/* SubTab: Phạt nguội */}
            {activeTab === "phat-nguoi" && (
              <div className="space-y-8">
                <div className="rounded-[20px] border border-[#f5ab19]/30 bg-gradient-to-r from-[#fffdf5] to-[#fff8e6] p-5 max-w-3xl mx-auto">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5ab19]/15 text-[#d9940d]">
                      <Icon name="shield" size={16} />
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-bold text-[#0b2341]">Tra cứu phạt nguội qua Cổng chính thức</h3>
                      <p className="text-xs leading-relaxed text-[#4a6785]">
                        Hiện tại, Cục Cảnh sát Giao thông (Bộ Công an) <strong>không cung cấp API công khai</strong> cho bên thứ ba. Để đảm bảo tính chính xác và bảo mật thông tin cá nhân, vui lòng tra cứu trực tiếp qua các kênh chính thức dưới đây.
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
                          <span className="rounded-lg bg-[#eef6ff] px-2.5 py-1 text-[11px] font-bold text-[#0066cc]">Kênh chính thức</span>
                          <Icon name="arrow" size={15} className="text-[#4a6785] group-hover:text-[#0066cc] transition" />
                        </div>
                        <h4 className="text-sm font-extrabold text-[#07192f] group-hover:text-[#0066cc] transition">{channel.name}</h4>
                        <p className="text-xs leading-relaxed text-[#4a6785]">{channel.description}</p>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#0066cc]">
                        <span>Truy cập tra cứu</span>
                        <Icon name="arrow" size={14} />
                      </div>
                    </a>
                  ))}
                </div>

                <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 max-w-3xl mx-auto space-y-4">
                  <div className="flex items-center gap-2">
                    <Icon name="check" size={18} className="text-[#0066cc]" />
                    <h3 className="text-sm font-bold text-[#07192f]">Hướng dẫn tra cứu trên Cổng csgt.vn (4 bước đơn giản)</h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {csgtLookupSteps.map((s) => (
                      <div key={s.step} className="flex items-start gap-3 rounded-2xl bg-[#f4f8fd] border border-[#cce0f5] p-3.5">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0066cc] text-xs font-bold text-white">{s.step}</span>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-[#0b2341]">{s.title}</h4>
                          <p className="text-[11px] leading-relaxed text-[#4a6785]">{s.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="rounded-full bg-[#0066cc]/10 px-3 py-0.5 text-[11px] font-bold text-[#0066cc]">Ứng dụng di động Cảnh sát Giao thông</span>
                    <h4 className="text-sm font-bold text-[#07192f]">Tra cứu phạt nguội qua App VNeTraffic</h4>
                    <p className="text-xs text-[#4a6785]">Tải ứng dụng chính thức của Cục CSGT để nhận thông báo vi phạm tự động</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a href={vneTrafficLinks.ios} target="_blank" rel="noreferrer" className="rounded-xl border border-[#cce0f5] bg-[#f4f8fd] px-4 py-2 text-xs font-bold text-[#0b2341] hover:border-[#0066cc] transition">iOS App Store</a>
                    <a href={vneTrafficLinks.android} target="_blank" rel="noreferrer" className="rounded-xl border border-[#cce0f5] bg-[#f4f8fd] px-4 py-2 text-xs font-bold text-[#0b2341] hover:border-[#0066cc] transition">Google Play</a>
                  </div>
                </div>
              </div>
            )}

            {/* SubTab: Đăng kiểm */}
            {activeTab === "dang-kiem" && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="rounded-[24px] border border-[#cce0f5] bg-white p-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#eef6ff] text-[#0066cc]">
                      <Icon name="car" size={20} />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#07192f]">Tra Cứu Hạn Đăng Kiểm &amp; Phí Bảo Trì Đường Bộ</h3>
                      <p className="text-xs text-[#4a6785]">Thông tin chính thức từ Cục Đăng kiểm Việt Nam (vr.org.vn)</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#f4f8fd] border border-[#cce0f5] p-4 space-y-3">
                    <h4 className="text-xs font-bold text-[#0b2341]">Chu kỳ đăng kiểm theo quy định hiện hành:</h4>
                    <div className="grid gap-2 sm:grid-cols-2 text-xs text-[#4a6785]">
                      <div className="rounded-xl bg-white p-3 border border-[#cce0f5]">
                        <p className="font-bold text-[#0b2341]">Xe ô tô cá nhân (dưới 9 chỗ)</p>
                        <p className="mt-1">Xe mới: 30 tháng lần đầu, sau đó 24 tháng/lần</p>
                        <p>Xe trên 7 năm: 12 tháng/lần</p>
                        <p>Xe trên 12 năm: 6 tháng/lần</p>
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
                    <a href="https://www.vr.org.vn/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-2xl bg-[#0066cc] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#0052b3] transition">
                      <Icon name="search" size={16} />
                      <span>Tra cứu trên vr.org.vn</span>
                    </a>
                    <span className="text-xs text-[#4a6785]">Cục Đăng kiểm Việt Nam</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function TienIchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f8fd] flex items-center justify-center p-6 text-center">
          <div className="space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0066cc] border-t-transparent mx-auto"></div>
            <p className="text-sm font-semibold text-[#0b2341]">Đang tải Cổng Tiện Ích &amp; Mạng Lưới...</p>
          </div>
        </div>
      }
    >
      <TienIchContent />
    </Suspense>
  );
}

function RenewalResultCard({ policy }: { policy: RenewalPolicy }) {
  const statusLabel =
    policy.status === "expired"
      ? "Hết hiệu lực"
      : policy.status === "active"
        ? "Đang hiệu lực"
        : "Chưa xác định";

  const rows = [
    ["Số GCN:", policy.certificateNo],
    ["Biển số đăng ký:", policy.numberPlate],
    ["Ngày bắt đầu:", formatRenewalDate(policy.fromDate)],
    ["Ngày kết thúc:", formatRenewalDate(policy.toDate)],
    ["Ngày mua:", formatRenewalDate(policy.issueDate)],
    ["Phí bảo hiểm:", formatRenewalMoney(policy.premium)],
  ];

  return (
    <article className="overflow-hidden rounded-[16px] border border-[#cce0f5] bg-white shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between bg-[#eef6ff] px-5 py-4 text-sm border-b border-[#cce0f5]">
        <h3 className="font-bold text-[#07192f]">{policy.productName || "Bảo hiểm BIC"}</h3>
        <button className="inline-flex items-center gap-1 text-xs font-semibold text-[#0066cc] hover:underline" type="button">
          <span>Chi tiết</span>
          <Icon name="arrow" size={13} />
        </button>
      </div>

      <div className="px-4 py-4 sm:px-5">
        <h4 className="mb-3 text-sm font-extrabold uppercase text-[#0066cc]">
          {policy.insuredName || "Chưa có tên người được bảo hiểm"}
        </h4>

        <dl className="text-sm">
          {rows.map(([label, value], index) => (
            <div
              key={label}
              className={`grid grid-cols-[minmax(130px,0.7fr)_1fr] gap-4 px-4 py-3 ${
                index % 2 === 0 ? "bg-[#f4f8fd]" : "bg-white"
              }`}
            >
              <dt className="text-[#4a6785]">{label}</dt>
              <dd className="text-right font-semibold text-[#07192f]">{value || "--"}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[minmax(130px,0.7fr)_1fr] gap-4 bg-[#f4f8fd] px-4 py-3">
            <dt className="text-[#4a6785]">Trạng thái đơn:</dt>
            <dd className="text-right">
              <span
                className={`inline-flex rounded-lg px-3 py-1 text-xs font-bold ${
                  policy.status === "expired"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-[#eef6ff] text-[#0066cc] border border-[#cce0f5]"
                }`}
              >
                {statusLabel}
              </span>
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex justify-end">
          <Link
            href={`/mua-bao-hiem?product=bao-hiem-o-to&renewal=${encodeURIComponent(
              policy.certificateNo || policy.numberPlate
            )}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0066cc] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#0052b3] active:scale-95 shadow-sm"
          >
            <Icon name="clock" size={15} />
            <span>Tái tục bảo hiểm ngay</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
