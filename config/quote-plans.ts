import type { QuoteProductType } from "../types/quote";

export type QuotePlan = {
  name: string;
  summary: string;
  benefits: string[];
  bestFor: string;
};

export const quotePlans: Record<QuoteProductType, Record<"basic" | "advanced" | "comprehensive", QuotePlan>> = {
  auto: {
    basic: { name: "Cơ bản", summary: "Bảo vệ thiết yếu cho xe và trách nhiệm dân sự.", benefits: ["TNDS bắt buộc theo quy định", "Phạm vi vật chất cơ bản theo điều kiện chọn", "Mức phí tiết kiệm cho nhu cầu đi lại hằng ngày"], bestFor: "Xe gia đình sử dụng thường xuyên" },
    advanced: { name: "Nâng cao", summary: "Mở rộng bảo vệ cho các tình huống phát sinh phổ biến.", benefits: ["Bao gồm quyền lợi của gói Cơ bản", "Mở rộng một số rủi ro vật chất và chi phí cứu hộ", "Cân bằng giữa hạn mức bảo vệ và ngân sách"], bestFor: "Chủ xe muốn thêm an tâm khi di chuyển" },
    comprehensive: { name: "Toàn diện", summary: "Phạm vi bảo vệ rộng hơn cho xe có giá trị cao.", benefits: ["Bao gồm quyền lợi của gói Nâng cao", "Ưu tiên phạm vi rủi ro và dịch vụ hỗ trợ mở rộng", "Phù hợp xe mới hoặc sử dụng với tần suất cao"], bestFor: "Xe mới, xe giá trị cao hoặc đi đường dài" },
  },
  motorbike: {
    basic: { name: "Cơ bản", summary: "Bảo vệ trách nhiệm dân sự thiết yếu cho chủ xe.", benefits: ["TNDS bắt buộc của chủ xe", "Giấy chứng nhận điện tử theo sản phẩm", "Phù hợp nhu cầu tuân thủ khi tham gia giao thông"], bestFor: "Xe máy sử dụng cá nhân" },
    advanced: { name: "Nâng cao", summary: "Thêm lớp bảo vệ cho xe và người sử dụng.", benefits: ["Bao gồm quyền lợi của gói Cơ bản", "Mở rộng quyền lợi vật chất xe theo điều kiện", "Hỗ trợ hướng dẫn khi phát sinh tổn thất"], bestFor: "Người dùng xe hằng ngày" },
    comprehensive: { name: "Toàn diện", summary: "Phương án bảo vệ rộng hơn cho xe và hành trình.", benefits: ["Bao gồm quyền lợi của gói Nâng cao", "Ưu tiên thêm quyền lợi vật chất và hỗ trợ", "Phù hợp xe có giá trị hoặc tần suất sử dụng cao"], bestFor: "Chủ xe muốn bảo vệ nhiều lớp" },
  },
  health: {
    basic: { name: "Cơ bản", summary: "Các quyền lợi nền tảng cho tai nạn và chi phí y tế.", benefits: ["Tử vong hoặc thương tật do tai nạn", "Chi phí y tế theo hạn mức", "Có thể chọn thêm quyền lợi bổ sung"], bestFor: "Cá nhân muốn bắt đầu bảo vệ sức khỏe" },
    advanced: { name: "Nâng cao", summary: "Mở rộng chăm sóc cho điều trị nội trú và ngoại trú.", benefits: ["Bao gồm quyền lợi của gói Cơ bản", "Quyền lợi điều trị nội trú và ngoại trú cao hơn", "Có thể thêm nha khoa, thai sản và tai nạn"], bestFor: "Cá nhân hoặc gia đình cần chăm sóc thường xuyên" },
    comprehensive: { name: "Toàn diện", summary: "Phạm vi chăm sóc rộng hơn cho các nhu cầu y tế đa dạng.", benefits: ["Bao gồm quyền lợi của gói Nâng cao", "Hạn mức và quyền lợi mở rộng theo điều kiện sản phẩm", "Ưu tiên bảo vệ dài hạn cho gia đình"], bestFor: "Gia đình muốn một phương án bảo vệ rộng" },
  },
  travel: {
    basic: { name: "Cơ bản", summary: "Bảo vệ các rủi ro chính trong chuyến đi.", benefits: ["Tai nạn và chi phí y tế theo hạn mức", "Áp dụng theo khu vực và thời hạn chuyến đi", "Phù hợp chuyến đi ngắn"], bestFor: "Chuyến du lịch trong nước hoặc châu Á" },
    advanced: { name: "Nâng cao", summary: "Thêm hỗ trợ cho các sự cố thường gặp khi đi xa.", benefits: ["Bao gồm quyền lợi của gói Cơ bản", "Mở rộng hành lý và sự cố chuyến đi", "Hỗ trợ khẩn cấp theo điều kiện chương trình"], bestFor: "Chuyến đi quốc tế hoặc nhiều chặng" },
    comprehensive: { name: "Toàn diện", summary: "Phương án rộng hơn cho hành trình có nhiều rủi ro.", benefits: ["Bao gồm quyền lợi của gói Nâng cao", "Mở rộng thêm quyền lợi hủy/cắt ngắn chuyến đi", "Tăng cường hỗ trợ y tế và hồi hương theo điều kiện"], bestFor: "Gia đình hoặc chuyến đi dài ngày" },
  },
  home: {
    basic: { name: "Cơ bản", summary: "Bảo vệ tổ ấm trước cháy, sét đánh và nổ.", benefits: ["Cháy, sét đánh", "Nổ theo điều kiện sản phẩm", "Bảo vệ phần tài sản đã kê khai"], bestFor: "Căn hộ hoặc nhà ở cần bảo vệ thiết yếu" },
    advanced: { name: "Nâng cao", summary: "Mở rộng thêm các rủi ro thường gặp trong nhà ở.", benefits: ["Bao gồm quyền lợi của gói Cơ bản", "Giông bão, lũ lụt, vỡ hoặc tràn nước", "Va chạm và trộm cướp theo điều kiện"], bestFor: "Nhà phố ở khu vực có nhiều rủi ro thời tiết" },
    comprehensive: { name: "Toàn diện", summary: "Bảo vệ rộng hơn cho nhà, tài sản và chi phí sau tổn thất.", benefits: ["Bao gồm quyền lợi của gói Nâng cao", "Chi phí dọn dẹp và chữa cháy", "Chi phí thuê nhà sau tổn thất theo giới hạn"], bestFor: "Gia đình muốn bảo vệ cả ngôi nhà và tài sản bên trong" },
  },
  life: {
    basic: { name: "Cơ bản", summary: "Tập trung vào kế hoạch bảo vệ tài chính dài hạn.", benefits: ["Lựa chọn số tiền bảo vệ", "Lựa chọn thời hạn phù hợp", "Tư vấn khả năng duy trì phí"], bestFor: "Người trụ cột bắt đầu lập kế hoạch" },
    advanced: { name: "Nâng cao", summary: "Bổ sung lớp bảo vệ trước tai nạn và bệnh đặc biệt.", benefits: ["Bao gồm quyền lợi của gói Cơ bản", "Có thể thêm quyền lợi tai nạn", "Có thể thêm quyền lợi bệnh đặc biệt"], bestFor: "Gia đình muốn mở rộng kế hoạch bảo vệ" },
    comprehensive: { name: "Toàn diện", summary: "Phương án bảo vệ rộng hơn theo mục tiêu tài chính.", benefits: ["Bao gồm quyền lợi của gói Nâng cao", "Kết hợp nhiều quyền lợi bổ sung theo thẩm định", "Tư vấn theo nhu cầu người tham gia và gia đình"], bestFor: "Kế hoạch dài hạn cho người trụ cột" },
  },
  business: {
    basic: { name: "Cơ bản", summary: "Bảo vệ tài sản hoặc lô hàng trước nhóm rủi ro chính.", benefits: ["Tài sản, hàng hóa theo giá trị kê khai", "Phạm vi rủi ro cơ bản theo nghiệp vụ", "Phù hợp cơ sở có quy mô nhỏ"], bestFor: "Văn phòng, cửa hàng hoặc lô hàng nội địa" },
    advanced: { name: "Nâng cao", summary: "Mở rộng phạm vi theo ngành nghề và hành trình.", benefits: ["Bao gồm quyền lợi của gói Cơ bản", "Mở rộng rủi ro tài sản, kho hàng hoặc vận chuyển", "Tư vấn theo mức độ rủi ro thực tế"], bestFor: "Cửa hàng, kho hàng và doanh nghiệp đang vận hành" },
    comprehensive: { name: "Toàn diện", summary: "Phương án rộng hơn cho tài sản, hoạt động và trách nhiệm.", benefits: ["Bao gồm quyền lợi của gói Nâng cao", "Kết hợp nhiều nhóm tài sản hoặc rủi ro", "Có thể xem xét trách nhiệm với bên thứ ba theo nghiệp vụ"], bestFor: "Doanh nghiệp có nhiều tài sản hoặc hoạt động" },
  },
};
