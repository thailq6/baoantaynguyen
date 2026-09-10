export type BicProductInfo = {
  officialName: string;
  audience: string;
  coverage: string[];
  exclusions: string[];
  documents: string[];
  sourceLabel: string;
  sourceUrl: string;
};

export const bicProductInfo: Record<string, BicProductInfo> = {
  "bao-hiem-o-to": {
    officialName: "Bảo hiểm xe ô tô",
    audience: "Chủ xe ô tô có đăng ký hợp lệ và nhu cầu bảo vệ trách nhiệm hoặc vật chất xe.",
    coverage: ["TNDS bắt buộc của chủ xe theo quy định", "Vật chất xe trước đâm va, lật đổ, cháy nổ, thiên tai và mất toàn bộ do trộm cướp", "Chi phí ngăn ngừa tổn thất và cứu hộ theo giới hạn hợp đồng"],
    exclusions: ["Hao mòn, khấu hao hoặc hư hỏng do sử dụng thông thường", "Thiệt hại ngoài số tiền bảo hiểm hoặc ngoài điều kiện đã chọn"],
    documents: ["Giấy đăng ký xe", "Thông tin chủ xe và người sử dụng", "Giấy yêu cầu bảo hiểm theo sản phẩm"],
    sourceLabel: "BIC · Bảo hiểm vật chất xe ô tô",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-xe-o-to/bao-hiem-vat-chat-xe-o-to.html",
  },
  "bao-hiem-xe-may": {
    officialName: "Bảo hiểm xe mô tô, xe gắn máy",
    audience: "Chủ xe mô tô, xe gắn máy có đăng ký hợp lệ, thời gian sử dụng đáp ứng điều kiện của sản phẩm.",
    coverage: ["TNDS bắt buộc và các lựa chọn tự nguyện theo nhu cầu", "Vật chất xe do cháy nổ, mất trộm cắp/cướp toàn bộ hoặc tai nạn thuộc phạm vi", "Chi phí bảo vệ và đưa xe đến nơi sửa chữa gần nhất theo giới hạn"],
    exclusions: ["Xe không đáp ứng điều kiện đăng ký hoặc thời gian sử dụng", "Vi phạm nghiêm trọng quy định an toàn và điều kiện bảo hiểm"],
    documents: ["Giấy đăng ký xe", "Thông tin chủ xe", "Giấy yêu cầu bảo hiểm"],
    sourceLabel: "BIC · Bảo hiểm vật chất xe mô tô, xe gắn máy",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-xe-may/bao_hiem_vat_chat_mo_to_xe_may.html",
  },
  "bao-hiem-suc-khoe": {
    officialName: "Bảo hiểm chăm sóc sức khỏe toàn diện",
    audience: "Cá nhân, gia đình hoặc nhóm người có nhu cầu kết hợp quyền lợi tai nạn, điều trị nội trú và ngoại trú.",
    coverage: ["Tử vong, thương tật vĩnh viễn do tai nạn", "Chi phí y tế, cấp cứu và trợ cấp nằm viện theo hạn mức", "Điều trị nội trú, ngoại trú, phẫu thuật và một số quyền lợi thai sản/nha khoa nếu lựa chọn"],
    exclusions: ["Bệnh có sẵn và thời gian chờ theo quy tắc", "Chi phí không hợp lý, không cần thiết hoặc không có chứng từ hợp lệ"],
    documents: ["Thông tin người được bảo hiểm", "Giấy yêu cầu bảo hiểm", "Hồ sơ y tế và hóa đơn khi yêu cầu bồi thường"],
    sourceLabel: "BIC · Bảo hiểm chăm sóc sức khỏe toàn diện",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-suc-khoe/a13866.html",
  },
  "bao-hiem-nhan-tho": {
    officialName: "Nhóm giải pháp bảo vệ dài hạn qua BIC/BIDV",
    audience: "Người trụ cột hoặc gia đình muốn lập kế hoạch bảo vệ tài chính trong thời hạn dài.",
    coverage: ["Lựa chọn số tiền bảo vệ và thời hạn phù hợp mục tiêu gia đình", "Có thể kết hợp quyền lợi tai nạn, sức khỏe hoặc bệnh đặc biệt tùy sản phẩm", "Tư vấn nhu cầu và khả năng duy trì phí trước khi tham gia"],
    exclusions: ["Không mặc định là sản phẩm nhân thọ độc lập của BIC", "Quyền lợi, thời gian chờ và điều kiện phát hành phụ thuộc sản phẩm cụ thể"],
    documents: ["Thông tin người tham gia và người được bảo hiểm", "Giấy yêu cầu bảo hiểm", "Hồ sơ thẩm định theo yêu cầu của sản phẩm"],
    sourceLabel: "BIC · Danh mục Bancassurance",
    sourceUrl: "https://bic.vn/dmsp-bancassurance/bancassurance.html",
  },
  "bao-hiem-tai-nan": {
    officialName: "Bảo hiểm tai nạn con người 24/24",
    audience: "Công dân Việt Nam và người nước ngoài đang cư trú, học tập hoặc làm việc tại Việt Nam trong độ tuổi phù hợp.",
    coverage: ["Tử vong do tai nạn", "Thương tật thân thể vĩnh viễn theo bảng tỷ lệ", "Thương tật tạm thời hoặc chi phí thực tế theo quy tắc sản phẩm"],
    exclusions: ["Cố ý tự gây tai nạn, đánh nhau không phải tự vệ", "Sử dụng rượu bia, ma túy hoặc vi phạm nghiêm trọng pháp luật"],
    documents: ["Thông tin người được bảo hiểm", "Giấy yêu cầu bảo hiểm", "Chứng từ y tế và biên bản sự cố khi yêu cầu bồi thường"],
    sourceLabel: "BIC · Bảo hiểm tai nạn con người",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-suc-khoe/bao-hiem-tai-nan-con-nguoi-24-24.html",
  },
  "bao-hiem-du-lich": {
    officialName: "Bảo hiểm khách du lịch trong nước và quốc tế",
    audience: "Cá nhân hoặc nhóm người đi du lịch, công tác trong nước hoặc ra nước ngoài.",
    coverage: ["Tai nạn và chi phí y tế trong chuyến đi", "Cứu trợ y tế, hồi hương và hỗ trợ khẩn cấp với chương trình quốc tế", "Hành lý, giấy tờ, trì hoãn, cắt ngắn hoặc hủy chuyến theo điều kiện chọn"],
    exclusions: ["Sự kiện ngoài thời hạn hoặc ngoài lãnh thổ bảo hiểm", "Các khoản không thuộc chương trình và điều khoản đã mua"],
    documents: ["Lịch trình và thông tin chuyến đi", "Thông tin người được bảo hiểm", "Chứng từ chuyến đi, y tế hoặc tổn thất khi yêu cầu bồi thường"],
    sourceLabel: "BIC · Bảo hiểm khách du lịch quốc tế",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-du-lich/bao-hiem-khach-du-lich-quoc-te.html",
  },
  "bao-hiem-nha-o": {
    officialName: "Bảo hiểm toàn diện nhà tư nhân",
    audience: "Chủ nhà có nhu cầu bảo vệ phần vật chất ngôi nhà và tài sản bên trong.",
    coverage: ["Cháy, sét đánh và nổ", "Có thể mở rộng cho giông bão, lũ lụt, vỡ/tràn nước, va chạm và trộm cướp có dấu hiệu đột nhập", "Chi phí dọn dẹp, chữa cháy và thuê nhà sau tổn thất theo giới hạn"],
    exclusions: ["Tài sản tự lên men, tự cháy hoặc hao mòn", "Trộm cướp không có dấu hiệu đột nhập hoặc tổn thất do chiến tranh, khủng bố"],
    documents: ["Thông tin địa chỉ và kết cấu nhà", "Danh mục tài sản muốn bảo hiểm", "Giấy yêu cầu bảo hiểm"],
    sourceLabel: "BIC · Bảo hiểm toàn diện nhà tư nhân",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-nha-tu-nhan/bao_hiem_toan_dien_nha_tu_nhan.html",
  },
  "bao-hiem-tai-san-chay-no": {
    officialName: "Bảo hiểm cháy, nổ và các rủi ro đặc biệt",
    audience: "Hộ kinh doanh, cửa hàng, văn phòng và doanh nghiệp có nhà cửa, máy móc, thiết bị hoặc hàng hóa.",
    coverage: ["Cháy, nổ theo chương trình tham gia", "Có thể mở rộng theo quy tắc cháy và các rủi ro đặc biệt", "Bảo vệ tài sản, thiết bị, hàng hóa và một số chi phí liên quan theo hợp đồng"],
    exclusions: ["Ngành nghề, công trình hoặc vật liệu không đáp ứng điều kiện nhận bảo hiểm", "Tổn thất do kê khai thiếu, bảo trì kém hoặc ngoài phạm vi đã chọn"],
    documents: ["Danh mục và giá trị tài sản", "Thông tin địa điểm, ngành nghề và biện pháp phòng cháy", "Giấy yêu cầu bảo hiểm"],
    sourceLabel: "BIC · Danh mục bảo hiểm tài sản",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-tai-san.html",
  },
  "bao-hiem-doanh-nghiep": {
    officialName: "Nhóm bảo hiểm doanh nghiệp",
    audience: "Doanh nghiệp, cơ sở sản xuất, thương mại, khách sạn, dịch vụ và hộ kinh doanh.",
    coverage: ["Tài sản, máy móc, thiết bị, kho hàng và văn phòng", "Có thể lựa chọn bảo hiểm mọi rủi ro tài sản hoặc các sản phẩm kỹ thuật chuyên biệt", "Tư vấn theo ngành nghề, giá trị tài sản và mức độ rủi ro"],
    exclusions: ["Rủi ro ngoài điều khoản hoặc không được khai báo", "Thiệt hại do bảo trì, vận hành hoặc điều kiện an toàn không phù hợp"],
    documents: ["Hồ sơ pháp lý và ngành nghề", "Danh mục tài sản, doanh thu hoặc giá trị cần bảo vệ", "Biên bản khảo sát nếu sản phẩm yêu cầu"],
    sourceLabel: "BIC · Danh mục sản phẩm doanh nghiệp",
    sourceUrl: "https://bic.vn/dmsp-dn/bao-hiem-doanh-nghiep.html",
  },
  "bao-hiem-trach-nhiem": {
    officialName: "Bảo hiểm trách nhiệm công cộng và trách nhiệm sản phẩm",
    audience: "Doanh nghiệp, hộ kinh doanh và đơn vị cung cấp hàng hóa, dịch vụ có trách nhiệm với bên thứ ba.",
    coverage: ["Trách nhiệm pháp lý với thương tật hoặc thiệt hại tài sản của bên thứ ba", "Sự cố phát sinh từ hoạt động kinh doanh, hàng hóa hoặc dịch vụ", "Chi phí bào chữa và tố tụng theo hạn mức trách nhiệm"],
    exclusions: ["Hành vi cố ý hoặc trách nhiệm ngoài hạn mức", "Tổn thất không bắt nguồn từ hoạt động đã khai báo"],
    documents: ["Thông tin ngành nghề và hoạt động kinh doanh", "Doanh thu, sản phẩm hoặc dịch vụ cung cấp", "Hợp đồng, biên bản và chứng từ sự cố nếu có"],
    sourceLabel: "BIC · Bảo hiểm trách nhiệm công cộng và trách nhiệm sản phẩm",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-trach-nhiem/a13562.html",
  },
  "bao-hiem-hang-hoa": {
    officialName: "Bảo hiểm hàng hóa vận chuyển nội địa và xuất nhập khẩu",
    audience: "Chủ hàng, doanh nghiệp xuất nhập khẩu, đơn vị logistics hoặc bên có quyền lợi trong lô hàng.",
    coverage: ["Hàng hóa vận chuyển trong lãnh thổ Việt Nam bằng đường bộ, đường sắt, đường sông hoặc ven biển", "Hàng hóa xuất nhập khẩu vận chuyển quốc tế theo điều kiện ICC A/B/C", "Cháy nổ, lật đổ, đắm, đâm va, thiên tai, mất tích và tổn thất chung tùy điều kiện"],
    exclusions: ["Hao hụt, hao mòn tự nhiên, khuyết tật vốn có hoặc đóng gói không phù hợp", "Chậm trễ, phóng xạ, chiến tranh và đình công nếu chưa mua mở rộng"],
    documents: ["Hóa đơn và phiếu đóng gói", "Vận đơn hoặc hợp đồng chuyên chở", "Chứng từ giao nhận, giám định và thông báo tổn thất"],
    sourceLabel: "BIC · Bảo hiểm hàng hóa vận chuyển nội địa",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-hang-hoa-van-chuyen/a13884.html",
  },
  "bao-hiem-nong-nghiep": {
    officialName: "Nhóm bảo hiểm nông nghiệp và cây trồng",
    audience: "Hộ sản xuất, trang trại, doanh nghiệp nông nghiệp và chủ sở hữu vùng nguyên liệu.",
    coverage: ["Tư vấn theo cây trồng, vật nuôi, mùa vụ và khu vực", "Có thể xem xét rủi ro tài sản hoặc cây trồng theo sản phẩm BIC phù hợp", "Mức bảo vệ và điều kiện phụ thuộc hồ sơ khảo sát thực tế"],
    exclusions: ["Rủi ro, diện tích hoặc mùa vụ không được kê khai", "Thiệt hại do canh tác không đúng hướng dẫn hoặc ngoài quy tắc sản phẩm"],
    documents: ["Thông tin diện tích, cây trồng hoặc tài sản", "Lịch mùa vụ và phương án sản xuất", "Hồ sơ chứng minh tổn thất khi yêu cầu bồi thường"],
    sourceLabel: "BIC · Danh mục bảo hiểm tài sản và cây cao su",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-tai-san.html",
  },
};
