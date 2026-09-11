/**
 * Tra Cứu Phạt Nguội — Deep Link Provider
 *
 * Cục CSGT Việt Nam KHÔNG có API công khai cho bên thứ ba.
 * Website csgt.vn sử dụng CAPTCHA chống bot/scraping.
 *
 * Module này cung cấp deep links tới các cổng tra cứu chính thức
 * và hướng dẫn chi tiết cho người dùng.
 */

export type OfficialChannel = {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: "shield" | "car" | "phone" | "search";
  recommended?: boolean;
};

/** Các kênh tra cứu phạt nguội chính thức được Bộ Công an khuyến nghị */
export const officialChannels: OfficialChannel[] = [
  {
    id: "csgt",
    name: "Cổng thông tin Cục CSGT (csgt.vn)",
    description:
      "Trang tra cứu chính thức của Cục Cảnh sát Giao thông — Bộ Công an. Nhập biển số xe và mã CAPTCHA để kiểm tra vi phạm phạt nguội chính xác nhất.",
    url: "https://www.csgt.vn/tra-cuu-phuong-tien-vi-pham.html",
    icon: "shield",
    recommended: true,
  },
  {
    id: "dichvucong",
    name: "Cổng Dịch vụ công Quốc gia",
    description:
      "Hỗ trợ tra cứu và thanh toán trực tuyến tiền phạt vi phạm giao thông. Yêu cầu đăng nhập tài khoản công dân.",
    url: "https://dichvucong.gov.vn/",
    icon: "search",
  },
  {
    id: "dangkiem",
    name: "Cục Đăng kiểm Việt Nam (vr.org.vn)",
    description:
      "Tra cứu tình trạng phạt nguội của xe ô tô trước khi đi đăng kiểm. Kiểm tra hạn đăng kiểm và phí đường bộ.",
    url: "https://www.vr.org.vn/",
    icon: "car",
  },
  {
    id: "vnetraffic",
    name: "Ứng dụng VNeTraffic (Cục CSGT)",
    description:
      "Ứng dụng chính thức do Cục CSGT quản lý. Có thông báo đẩy khi phát hiện vi phạm mới. Hỗ trợ cập nhật 24/7.",
    url: "https://vnetraffic.vn/",
    icon: "phone",
  },
];

export type LookupStep = {
  step: number;
  title: string;
  description: string;
};

/** Hướng dẫn chi tiết tra cứu trên csgt.vn */
export const csgtLookupSteps: LookupStep[] = [
  {
    step: 1,
    title: "Truy cập trang tra cứu",
    description: "Mở trình duyệt và truy cập csgt.vn → Mục \"Tra cứu phương tiện vi phạm\"",
  },
  {
    step: 2,
    title: "Nhập thông tin phương tiện",
    description: "Nhập biển số kiểm soát xe (VD: 47A-349.54) và chọn loại phương tiện (Ô tô / Xe máy)",
  },
  {
    step: 3,
    title: "Nhập mã CAPTCHA",
    description: "Nhập mã xác thực bảo mật hiển thị trên màn hình để xác nhận bạn là người thật",
  },
  {
    step: 4,
    title: "Xem kết quả",
    description: "Hệ thống hiển thị danh sách vi phạm (nếu có) hoặc thông báo xe không có lỗi phạt nguội",
  },
];

/** Tạo URL deep link CSGT cho biển số cụ thể */
export function getCsgtDeepLink(): string {
  return "https://www.csgt.vn/tra-cuu-phuong-tien-vi-pham.html";
}

/**
 * App store links cho VNeTraffic
 */
export const vneTrafficLinks = {
  ios: "https://apps.apple.com/vn/app/vnetraffic/id1624658388",
  android: "https://play.google.com/store/apps/details?id=vn.gov.bocongan.csgt.vnetraffic",
};
