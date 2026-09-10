export type ProductDetail = {
  price: number;
  pricePrefix?: string;
  priceSuffix: string;
  priceNote: string;
  highlights: string[];
  exclusions: string[];
  quoteType?: "auto" | "motorbike" | "health" | "travel" | "home" | "life" | "business";
};

export const productDetails: Record<string, ProductDetail> = {
  "bao-hiem-o-to": {
    price: 480700,
    priceSuffix: "/ năm",
    priceNote: "Gói minh họa cho xe gia đình 5 chỗ",
    highlights: ["TNDS bắt buộc theo quy định", "Hỗ trợ tổn thất vật chất và cứu hộ cơ bản"],
    exclusions: ["Không bao gồm hao mòn tự nhiên", "Phí chính thức phụ thuộc thông tin xe"],
    quoteType: "auto",
  },
  "bao-hiem-xe-may": {
    price: 55000,
    priceSuffix: "/ năm",
    priceNote: "Mức tham khảo cho xe máy điện",
    highlights: ["TNDS bắt buộc cho chủ xe", "Giấy chứng nhận điện tử thuận tiện tra cứu"],
    exclusions: ["Không thay thế bảo hiểm vật chất xe", "Mức phí thay đổi theo loại xe"],
    quoteType: "motorbike",
  },
  "bao-hiem-suc-khoe": {
    price: 1800000,
    pricePrefix: "Từ ",
    priceSuffix: "/ người / năm",
    priceNote: "Gói cơ bản cho người từ 18 đến 30 tuổi",
    highlights: ["Chi phí khám chữa bệnh theo hạn mức", "Có thể thêm nha khoa, thai sản và tai nạn"],
    exclusions: ["Bệnh có sẵn cần khai báo và thẩm định", "Quyền lợi phụ có thời gian chờ riêng"],
    quoteType: "health",
  },
  "bao-hiem-nhan-tho": {
    price: 6000000,
    pricePrefix: "Từ ",
    priceSuffix: "/ năm",
    priceNote: "Minh họa theo số tiền bảo vệ 1 tỷ đồng",
    highlights: ["Bảo vệ dài hạn cho người trụ cột", "Lựa chọn thời hạn 10, 15 hoặc 20 năm"],
    exclusions: ["Quyền lợi tùy điều khoản hợp đồng", "Cần thẩm định trước khi phát hành"],
    quoteType: "life",
  },
  "bao-hiem-tai-nan": {
    price: 120000,
    pricePrefix: "Từ ",
    priceSuffix: "/ người / năm",
    priceNote: "Gói cơ bản cho sinh hoạt và di chuyển hằng ngày",
    highlights: ["Trợ cấp khi tai nạn gây thương tật", "Có thể mở rộng quyền lợi chi phí y tế"],
    exclusions: ["Không áp dụng cho hành vi cố ý", "Phạm vi nghề nghiệp cần được xác nhận"],
    quoteType: "health",
  },
  "bao-hiem-du-lich": {
    price: 90000,
    pricePrefix: "Từ ",
    priceSuffix: "/ chuyến",
    priceNote: "Minh họa chuyến đi 5 ngày trong khu vực châu Á",
    highlights: ["Hỗ trợ y tế và sự cố chuyến đi", "Tư vấn hỗ trợ trong thời gian ở nước ngoài"],
    exclusions: ["Không bao gồm thay đổi kế hoạch tự nguyện", "Mức phí phụ thuộc điểm đến và số ngày"],
    quoteType: "travel",
  },
  "bao-hiem-nha-o": {
    price: 1200000,
    pricePrefix: "Từ ",
    priceSuffix: "/ năm",
    priceNote: "Minh họa cho căn hộ có giá trị tài sản 1 tỷ đồng",
    highlights: ["Bảo vệ nhà và tài sản bên trong", "Có thể chọn gói cơ bản, nâng cao hoặc toàn diện"],
    exclusions: ["Không bao gồm hao mòn và bảo trì", "Cần kê khai đúng giá trị tài sản"],
    quoteType: "home",
  },
  "bao-hiem-tai-san-chay-no": {
    price: 1800000,
    pricePrefix: "Từ ",
    priceSuffix: "/ năm",
    priceNote: "Minh họa cho mặt bằng kinh doanh quy mô nhỏ",
    highlights: ["Bảo vệ trước cháy, nổ và rủi ro tài sản", "Tư vấn phương án theo giá trị tài sản"],
    exclusions: ["Điều kiện an toàn phòng cháy cần được xác nhận", "Không bao gồm tài sản kê khai thiếu"],
    quoteType: "business",
  },
  "bao-hiem-doanh-nghiep": {
    price: 3000000,
    pricePrefix: "Từ ",
    priceSuffix: "/ năm",
    priceNote: "Gói minh họa cho văn phòng hoặc cửa hàng",
    highlights: ["Bảo vệ tài sản và hoạt động vận hành", "Có thể mở rộng theo nhóm rủi ro"],
    exclusions: ["Mức phí phụ thuộc ngành nghề", "Cần khảo sát tài sản khi cần thiết"],
    quoteType: "business",
  },
  "bao-hiem-trach-nhiem": {
    price: 1500000,
    pricePrefix: "Từ ",
    priceSuffix: "/ năm",
    priceNote: "Minh họa cho hộ kinh doanh dịch vụ",
    highlights: ["Hỗ trợ trách nhiệm với bên thứ ba", "Tư vấn hạn mức theo hoạt động kinh doanh"],
    exclusions: ["Không bao gồm trách nhiệm do cố ý", "Phạm vi phụ thuộc hợp đồng cụ thể"],
    quoteType: "business",
  },
  "bao-hiem-hang-hoa": {
    price: 1000000,
    pricePrefix: "Từ ",
    priceSuffix: "/ chuyến",
    priceNote: "Minh họa cho lô hàng nội địa giá trị vừa",
    highlights: ["Bảo vệ hàng hóa trên hành trình", "Hỗ trợ hướng dẫn hồ sơ khi có tổn thất"],
    exclusions: ["Đóng gói không phù hợp có thể bị loại trừ", "Cần chứng từ lô hàng hợp lệ"],
    quoteType: "business",
  },
  "bao-hiem-nong-nghiep": {
    price: 900000,
    pricePrefix: "Từ ",
    priceSuffix: "/ vụ",
    priceNote: "Minh họa cho hộ sản xuất quy mô nhỏ",
    highlights: ["Bảo vệ trước một số rủi ro mùa vụ", "Tư vấn theo cây trồng và khu vực"],
    exclusions: ["Rủi ro thiên tai cần theo điều kiện sản phẩm", "Cần kê khai diện tích và mùa vụ"],
    quoteType: "business",
  },
};
