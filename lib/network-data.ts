export type NetworkType =
  | "NETWORK_GARA"
  | "NETWORK_MEDICAL"
  | "NETWORK_BIC"
  | "RESCUE_CENTER"
  | "SEARCH_REGISTRY";

export type NetworkItem = {
  id: string;
  type: NetworkType;
  name: string;
  address: string;
  phone: string;
  province: string;
  district: string;
  badge?: string;
  services?: string[];
  note?: string;
  mapsUrl?: string;
};

export function stripUnicode(str: string): string {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export const provincesList = [
  "Tất cả Tỉnh/Thành",
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Đắk Lắk",
  "Gia Lai",
  "Đắk Nông",
  "Lâm Đồng",
  "Kon Tum",
  "Cần Thơ",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Đồng Nai",
  "Đồng Tháp",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Lào Cai",
  "Lạng Sơn",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

export const networkCategories: { type: NetworkType; title: string; icon: string; description: string }[] = [
  {
    type: "NETWORK_GARA",
    title: "Gara Liên Kết BIC",
    icon: "car",
    description: "Xưởng sửa chữa ô tô chính hãng & liên kết chỉ định bảo lãnh của BIC",
  },
  {
    type: "NETWORK_MEDICAL",
    title: "Cơ Sở Y Tế Bảo Lãnh",
    icon: "shield",
    description: "Bệnh viện & phòng khám hỗ trợ bảo lãnh viện phí trực tiếp",
  },
  {
    type: "NETWORK_BIC",
    title: "Đơn Vị & Giám Định BIC",
    icon: "info",
    description: "Chi nhánh, phòng kinh doanh & trạm giám định bồi thường BIC",
  },
  {
    type: "RESCUE_CENTER",
    title: "Trung Tâm Cứu Hộ 24/7",
    icon: "phone",
    description: "Đội xe cứu hộ giao thông khẩn cấp 24/7 toàn quốc",
  },
  {
    type: "SEARCH_REGISTRY",
    title: "Trạm Đăng Kiểm Xe",
    icon: "check",
    description: "Trung tâm kiểm định xe cơ giới theo quy định Cục Đăng Kiểm",
  },
];

export function transformBicGara(raw: any): NetworkItem {
  return {
    id: `gara-${raw.id || raw.code || Math.random()}`,
    type: "NETWORK_GARA",
    name: raw.name || "Gara liên kết BIC",
    address: raw.address || "Chưa có thông tin địa chỉ",
    phone: raw.phone || raw.contact_tel || "1900 9456",
    province: extractProvinceFromAddress(raw.address) || "Khác",
    district: "",
    badge: raw.code ? `Mã: ${raw.code}` : "Gara Liên Kết BIC",
    services: ["Sửa chữa chính hãng", "Bảo lãnh bồi thường xe ô tô BIC", "Sơn hấp vi tính"],
    note: raw.masothue ? `Mã số thuế: ${raw.masothue}` : undefined,
  };
}

export function transformBicHospital(raw: any): NetworkItem {
  const services: string[] = [];
  if (raw.noi_tru && raw.noi_tru !== "0") services.push("Bảo lãnh nội trú");
  if (raw.ngoai_tru && raw.ngoai_tru !== "0") services.push("Khám ngoại trú");
  if (raw.nha_khoa && raw.nha_khoa !== "0") services.push("Nha khoa");

  return {
    id: `med-${raw.id || raw.code || Math.random()}`,
    type: "NETWORK_MEDICAL",
    name: raw.name || "Cơ sở y tế bảo lãnh",
    address: raw.address || "Chưa có thông tin địa chỉ",
    phone: raw.phone || raw.tel || "1900 9456",
    province: extractProvinceFromAddress(raw.address) || "Khác",
    district: "",
    badge: raw.is_csyt_lk === "True" ? "Bảo Lãnh Trực Tiếp" : "Cơ Sở Y Tế BIC Care",
    services: services.length > 0 ? services : ["Bảo lãnh viện phí BIC Care 24/7"],
    note: raw.bank_name ? `Ngân hàng: ${raw.bank_name}` : undefined,
  };
}

export function transformBicBranch(raw: any): NetworkItem {
  return {
    id: `bic-${raw.id || raw.code || Math.random()}`,
    type: "NETWORK_BIC",
    name: raw.name || "Đơn vị BIC",
    address: raw.address || "Chưa có thông tin địa chỉ",
    phone: raw.phone || raw.tel || "1900 9456",
    province: extractProvinceFromAddress(raw.address) || "Khác",
    district: "",
    badge: raw.code_ref === "HOI_SO_CHINH" ? "Hội Sở Chính" : "Chi Nhánh Thành Viên",
    services: ["Cấp đơn bảo hiểm", "Giám định bồi thường", "Tiếp nhận hồ sơ tổn thất"],
    note: raw.email ? `Email: ${raw.email}` : undefined,
  };
}

export function transformBicRescue(raw: any): NetworkItem {
  return {
    id: `rescue-${raw.Id || raw.id || Math.random()}`,
    type: "RESCUE_CENTER",
    name: raw.name || "Trung tâm cứu hộ 24/7",
    address: raw.address || "Toàn quốc",
    phone: raw.tel || raw.phone || "1900 9456",
    province: raw.city || extractProvinceFromAddress(raw.address) || "Khác",
    district: "",
    badge: "Cứu Hộ Khẩn Cấp 24/7",
    services: ["Kéo xe tai nạn", "Kích bình ắc quy", "Thay lốp dự phòng", "Cứu hộ đường dài"],
  };
}

export function extractProvinceFromAddress(address: string): string {
  if (!address) return "";
  const norm = stripUnicode(address).toLowerCase();
  
  for (const prov of provincesList) {
    if (prov === "Tất cả Tỉnh/Thành") continue;
    const cleanProv = stripUnicode(prov).toLowerCase().replace("tp. ", "").replace("thanh pho ", "");
    if (norm.includes(cleanProv)) {
      return prov;
    }
  }
  return "";
}

export const sampleRegistryItems: NetworkItem[] = [
  {
    id: "reg-01",
    type: "SEARCH_REGISTRY",
    name: "Trung Tâm Đăng Kiểm Xe Cơ Giới 47-01D Đắk Lắk",
    address: "137 Nguyễn Chí Thanh, P. Tân An, TP. Buôn Ma Thuột, Đắk Lắk",
    phone: "0262 3853 888",
    province: "Đắk Lắk",
    district: "TP. Buôn Ma Thuột",
    badge: "Mã Số: 47-01D",
    services: ["Kiểm định ô tô", "Thu phí bảo trì đường bộ", "Cấp tem kiểm định"],
  },
  {
    id: "reg-02",
    type: "SEARCH_REGISTRY",
    name: "Trung Tâm Đăng Kiểm Xe Cơ Giới 47-02D Cư M'gar",
    address: "Km 15 Quốc Lộ 14, Huyện Cư M'gar, Đắk Lắk",
    phone: "0262 3512 333",
    province: "Đắk Lắk",
    district: "Huyện Cư M'gar",
    badge: "Mã Số: 47-02D",
    services: ["Kiểm định xe tải", "Kiểm định ô tô con", "Cấp sổ kiểm định"],
  },
  {
    id: "reg-03",
    type: "SEARCH_REGISTRY",
    name: "Trung Tâm Đăng Kiểm Xe Cơ Giới 81-01D Gia Lai",
    address: "155 Trường Chinh, TP. Pleiku, Gia Lai",
    phone: "0269 3824 112",
    province: "Gia Lai",
    district: "TP. Pleiku",
    badge: "Mã Số: 81-01D",
    services: ["Kiểm định xe cơ giới", "Bảo trì đường bộ"],
  },
  {
    id: "reg-04",
    type: "SEARCH_REGISTRY",
    name: "Trung Tâm Đăng Kiểm Xe Cơ Giới 29-03V Hà Nội",
    address: "Láng Trung, Đống Đa, Hà Nội",
    phone: "024 3768 0244",
    province: "Hà Nội",
    district: "Quận Đống Đa",
    badge: "Mã Số: 29-03V",
    services: ["Kiểm định ô tô con", "Cấp giấy chứng nhận kiểm định"],
  },
  {
    id: "reg-05",
    type: "SEARCH_REGISTRY",
    name: "Trung Tâm Đăng Kiểm Xe Cơ Giới 50-03V TP.HCM",
    address: "107 Quốc Lộ 13, Hiệp Bình Phước, Thủ Đức, TP. Hồ Chí Minh",
    phone: "028 3727 1860",
    province: "TP. Hồ Chí Minh",
    district: "Thủ Đức",
    badge: "Mã Số: 50-03V",
    services: ["Kiểm định xe cơ giới", "Phí bảo trì đường bộ"],
  },
];

export function filterNetworkItems(
  items: NetworkItem[],
  type: NetworkType,
  province: string,
  query: string
): NetworkItem[] {
  const normProvince = province && province !== "Tất cả Tỉnh/Thành" ? stripUnicode(province).toLowerCase().replace("tp. ", "").replace("thanh pho ", "") : "";
  const normQuery = query.trim() ? stripUnicode(query.trim()).toLowerCase() : "";

  return items.filter((item) => {
    if (item.type !== type) return false;
    
    if (normProvince) {
      const normAddr = stripUnicode(item.address).toLowerCase();
      const normProv = stripUnicode(item.province).toLowerCase();
      if (!normAddr.includes(normProvince) && !normProv.includes(normProvince)) {
        return false;
      }
    }
    
    if (normQuery) {
      const normName = stripUnicode(item.name).toLowerCase();
      const normAddr = stripUnicode(item.address).toLowerCase();
      const normPhone = item.phone ? item.phone.toLowerCase() : "";
      
      if (!normName.includes(normQuery) && !normAddr.includes(normQuery) && !normPhone.includes(normQuery)) {
        return false;
      }
    }
    
    return true;
  });
}

