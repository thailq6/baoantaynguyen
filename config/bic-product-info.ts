export type BicProductInfo = {
  officialName: string;
  audience: string;
  legalBasis?: string;
  limits: string[];
  coverage: string[];
  exclusions: string[];
  documents: string[];
  claimSteps: string[];
  sourceLabel: string;
  sourceUrl: string;
};

export const bicProductInfo: Record<string, BicProductInfo> = {
  "bao-hiem-o-to": {
    officialName: "Bảo hiểm Trách nhiệm dân sự & Vật chất xe ô tô BIC",
    audience: "Chủ sở hữu xe ô tô cá nhân, xe kinh doanh vận tải, xe taxi công nghệ, xe bán tải và xe tải chở hàng.",
    legalBasis: "Nghị định 67/2023/NĐ-CP của Chính phủ về bảo hiểm bắt buộc TNDS của chủ xe cơ giới.",
    limits: [
      "Về sức khỏe, tính mạng: Tối đa 150.000.000 VNĐ / 01 người / 01 vụ tai nạn",
      "Về tài sản bên thứ ba: Tối đa 100.000.000 VNĐ / 01 vụ tai nạn",
      "Vật chất xe: Theo giá trị thị trường thực tế (lên tới 100% giá trị xe)"
    ],
    coverage: [
      "Bồi thường thiệt hại về sức khỏe, tính mạng và tài sản cho bên thứ ba do xe ô tô gây ra",
      "Bảo vệ vật chất xe trước các sự cố đâm va, lật đổ, cháy nổ, thiên tai (giông lốc, sạt lở, ngập nước)",
      "Bồi thường mất toàn bộ xe do trộm cướp có dấu hiệu đột nhập hoặc cướp có vũ lực",
      "Chi phí cứu hộ khẩn cấp và di chuyển xe đến gara liên kết BIC gần nhất"
    ],
    exclusions: [
      "Lái xe trong tình trạng có nồng độ cồn trong máu/hơi thở hoặc sử dụng chất kích thích bị cấm",
      "Lái xe không có giấy phép lái xe hợp lệ hoặc GPLX không đúng hạng quy định",
      "Hư hỏng do hao mòn tự nhiên, nổ lốp trừ khi do cùng sự cố tai nạn gây ra",
      "Xe chở quá tải trọng hoặc quá số lượng người cho phép theo đăng kiểm"
    ],
    documents: [
      "Giấy chứng nhận đăng ký xe ô tô (Cà vẹt xe)",
      "Giấy chứng nhận kiểm định an toàn kỹ thuật & bảo vệ môi trường (Đăng kiểm)",
      "Căn cước công dân của chủ xe / Giấy phép kinh doanh nếu là DN",
      "Giấy phép lái xe của người điều khiển phương tiện"
    ],
    claimSteps: [
      "Bước 1: Giữ nguyên hiện trường, ưu tiên cứu chữa người bị thương và gọi Hotline BIC 0916 201 085 / 1900 9456 trong 24h.",
      "Bước 2: Chụp ảnh tổn thất hiện trường (toàn cảnh 4 góc xe, vị trí va quệt, biển số xe và giấy tờ liên quan).",
      "Bước 3: Đưa xe về Gara được BIC chỉ định/bảo lãnh để đại diện BIC phối hợp giám định tổn thất.",
      "Bước 4: Nộp hồ sơ bồi thường (biên bản công an nếu có, hóa đơn sửa chữa) để BIC chi trả trực tiếp cho Gara."
    ],
    sourceLabel: "BIC · Quy tắc Bảo hiểm xe ô tô chính thức",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-xe-o-to/bao-hiem-vat-chat-xe-o-to.html",
  },
  "bao-hiem-xe-may": {
    officialName: "Bảo hiểm Trách nhiệm dân sự & Vật chất xe máy BIC",
    audience: "Chủ xe mô tô 2 bánh, xe mô tô 3 bánh, xe gắn máy và xe máy điện lưu thông toàn quốc.",
    legalBasis: "Nghị định 67/2023/NĐ-CP & Thông tư hướng dẫn của Bộ Tài chính.",
    limits: [
      "Về sức khỏe, tính mạng: Tối đa 150.000.000 VNĐ / 01 người / 01 vụ tai nạn",
      "Về tài sản bên thứ ba: Tối đa 50.000.000 VNĐ / 01 vụ tai nạn",
      "Phí niêm yết: Xe dưới 50cc & xe máy điện 55.000đ/năm, Xe trên 50cc 60.000đ/năm (chưa VAT)"
    ],
    coverage: [
      "Chi trả trách nhiệm bồi thường thiệt hại về sức khỏe và tài sản cho bên thứ ba",
      "Cấp Giấy chứng nhận điện tử có mã QR chuẩn quy định, có giá trị trình CSGT tức thì",
      "Bảo vệ vật chất xe máy trước cháy nổ, trộm cắp/cướp toàn bộ xe (gói tự nguyện mở rộng)",
      "Hỗ trợ chi phí y tế tai nạn cho 02 người ngồi trên xe (người điều khiển và người ngồi sau)"
    ],
    exclusions: [
      "Người điều khiển xe không đủ tuổi hoặc không có giấy phép lái xe theo quy định",
      "Cố ý gây tai nạn của chủ xe hoặc người điều khiển phương tiện",
      "Thiệt hại đối với tài sản bị trộm hoặc bị mất trong tai nạn (trừ gói trộm cướp riêng)",
      "Thiệt hại gián tiếp như giảm giá trị thương mại, thất thu do dừng sử dụng xe"
    ],
    documents: [
      "Giấy chứng nhận đăng ký xe máy (Cà vẹt)",
      "Họ tên, SĐT và Email người nhận Giấy chứng nhận điện tử",
      "Giấy phép lái xe hạng A1/A2 của người điều khiển"
    ],
    claimSteps: [
      "Bước 1: Thông báo sự cố cho Hotline BIC 0916 201 085 ngay khi xảy ra va chạm.",
      "Bước 2: Thu thập thông tin bên thứ ba (họ tên, SĐT, biển số xe) và chụp ảnh hiện trường.",
      "Bước 3: Hoàn thiện hồ sơ yêu cầu bồi thường theo hướng dẫn của giám định viên BIC.",
      "Bước 4: Nhận tiền bồi thường chuyển khoản trực tiếp qua tài khoản ngân hàng."
    ],
    sourceLabel: "BIC · Quy tắc Bảo hiểm xe mô tô xe máy",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-xe-may/bao_hiem_vat_chat_mo_to_xe_may.html",
  },
  "bao-hiem-suc-khoe": {
    officialName: "Bảo hiểm chăm sóc sức khỏe toàn diện BIC Tâm An",
    audience: "Cá nhân và gia đình (từ 1 tuổi đến 65 tuổi), hộ gia đình và nhóm nhân viên doanh nghiệp.",
    legalBasis: "Quy tắc Bảo hiểm Chăm sóc Sức khỏe BIC Tâm An ban hành theo Quyết định của Tổng Giám đốc BIC.",
    limits: [
      "Hạn mức bảo vệ y tế: Từ 50.000.000 VNĐ đến 1.400.000.000 VNĐ / năm",
      "Mạng lưới bảo lãnh viện phí: Hơn 130 Bệnh viện/Phòng khám quốc tế (Vinmec, Thu Cúc, Hồng Ngọc, Hoàn Mỹ...)",
      "Chi phí nằm viện: Tối đa 5.000.000 VNĐ / ngày nằm viện"
    ],
    coverage: [
      "Tử vong hoặc thương tật vĩnh viễn do tai nạn hoặc ốm đau bệnh tật",
      "Chi phí điều trị nội trú: Phẫu thuật, nằm viện, tiền phòng, chi phí xe cấp cứu",
      "Chi phí điều trị ngoại trú: Khám bệnh, xét nghiệm, thuốc điều trị theo kê đơn bác sĩ",
      "Quyền lợi bổ sung: Quyền lợi thai sản (sinh thường/sinh mổ) và điều trị nha khoa cao cấp"
    ],
    exclusions: [
      "Bệnh có sẵn (Pre-existing conditions) trong 365 ngày đầu tiên tham gia",
      "Thời gian chờ: 30 ngày đối với bệnh thông thường, 280-365 ngày cho thai sản và bệnh đặc biệt",
      "Điều trị thẩm mỹ, phẫu thuật chỉnh hình, hỗ trợ sinh sản và khám sức khỏe định kỳ",
      "Các chi phí y tế không hợp lý hoặc không có hóa đơn chứng từ tài chính hợp lệ"
    ],
    documents: [
      "Căn cước công dân / Giấy khai sinh (đối với trẻ em)",
      "Giấy yêu cầu bảo hiểm BIC Tâm An kê khai tiền sử sức khỏe",
      "Giấy ra viện, sổ khám bệnh, đơn thuốc và Hóa đơn tài chính (VAT) khi yêu cầu bồi thường"
    ],
    claimSteps: [
      "Bước 1: Xuất trình thẻ bảo hiểm BIC Tâm An & CCCD tại Bệnh viện liên kết để bảo lãnh viện phí trực tiếp.",
      "Bước 2: Trường hợp khám ngoài mạng lưới, thanh toán trước và thu thập đầy đủ hóa đơn chứng từ y tế.",
      "Bước 3: Nộp hồ sơ thanh toán trực tuyến qua ứng dụng Zalo/Portal hỗ trợ 0916 201 085 trong 30 ngày.",
      "Bước 4: BIC thẩm định và chuyển tiền chi trả bồi thường trong 5-7 ngày làm việc."
    ],
    sourceLabel: "BIC · Bảo hiểm sức khỏe BIC Tâm An",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-suc-khoe/a13866.html",
  },
  "bao-hiem-nhan-tho": {
    officialName: "Giải pháp bảo vệ tài chính dài hạn BIC / BIDV Bancassurance",
    audience: "Người trụ cột gia đình, cá nhân có nhu cầu tích lũy tài chính và bảo vệ rủi ro tử kỳ dài hạn.",
    limits: [
      "Số tiền bảo vệ: Linh hoạt từ 200.000.000 VNĐ đến không giới hạn theo nhu cầu",
      "Thời hạn bảo vệ: 10 năm, 15 năm, 20 năm hoặc trọn đời",
      "Đóng phí: Hằng năm, nửa năm hoặc định kỳ linh hoạt"
    ],
    coverage: [
      "Bảo vệ tài chính trước rủi ro tử vong hoặc thương tật toàn bộ vĩnh viễn",
      "Kết hợp quyền lợi bảo vệ trước 42 bệnh hiểm nghèo giai đoạn đầu và giai đoạn sau",
      "Trợ cấp nằm viện và hỗ trợ chi phí y tế do tai nạn hoặc rủi ro sức khỏe",
      "Tích lũy tài sản an toàn cho kế hoạch học tập của con hoặc nghỉ hưu an nhàn"
    ],
    exclusions: [
      "Hành vi cố ý tự tử trong vòng 24 tháng kể từ ngày hợp đồng có hiệu lực",
      "Thiệt hại do hành vi vi phạm pháp luật hình sự của người được bảo hiểm/người thụ hưởng",
      "Các điểm loại trừ sinh học hoặc bệnh hiểm nghèo có sẵn trước khi ký kết hợp đồng"
    ],
    documents: [
      "Căn cước công dân của Người yêu cầu bảo hiểm & Người được bảo hiểm",
      "Giấy yêu cầu bảo hiểm nhân thọ & Giấy khám sức khỏe (nếu thuộc diện thẩm định y khoa)",
      "Thông tin tài khoản ngân hàng BIDV / Vietcombank để nhận quyền lợi"
    ],
    claimSteps: [
      "Bước 1: Liên hệ Chuyên viên tư vấn 0916 201 085 để nhận hướng dẫn chuẩn bị hồ sơ yêu cầu giải quyết quyền lợi.",
      "Bước 2: Hoàn thiện Giấy đề nghị giải quyết quyền lợi bảo hiểm và chứng từ y tế/pháp lý.",
      "Bước 3: Nộp hồ sơ tại Chi nhánh BIDV / Phòng giao dịch BIC gần nhất trên toàn quốc.",
      "Bước 4: Nhận chi trả quyền lợi trực tiếp qua tài khoản ngân hàng cá nhân."
    ],
    sourceLabel: "BIC · Giải pháp bảo vệ tài chính dài hạn BIDV",
    sourceUrl: "https://bic.vn/dmsp-bancassurance/bancassurance.html",
  },
  "bao-hiem-tai-nan": {
    officialName: "Bảo hiểm Tai nạn con người 24/24 BIC",
    audience: "Mọi công dân Việt Nam và người nước ngoài sinh sống, làm việc tại Việt Nam từ 1 đến 65 tuổi.",
    legalBasis: "Quy tắc Bảo hiểm Tai nạn Con người 24/24 ban hành theo Quyết định của BIC.",
    limits: [
      "Số tiền bảo hiểm: Linh hoạt từ 20.000.000 VNĐ đến 200.000.000 VNĐ / người / năm",
      "Trợ cấp nằm viện do tai nạn: Tối đa 200.000 VNĐ / ngày nằm viện",
      "Chi phí y tế thực tế: Theo hóa đơn tài chính thực tế phát sinh"
    ],
    coverage: [
      "Chi trả 100% Số tiền bảo hiểm trong trường hợp tử vong do tai nạn 24/24",
      "Chi trả theo Bảng tỷ lệ thương tật thân thể vĩnh viễn do tai nạn gây ra",
      "Thanh toán chi phí y tế cấp cứu, phẫu thuật, tiền phòng, thuốc men do tai nạn",
      "Bảo vệ 24/7 trên toàn lãnh thổ Việt Nam, bất kể tai nạn sinh hoạt, lao động hay giao thông"
    ],
    exclusions: [
      "Cố ý tự gây thương tích, tự tử hoặc hành vi đánh nhau không phải tự vệ",
      "Sử dụng rượu bia vượt nồng độ cồn cho phép, ma túy hoặc chất kích thích bị cấm",
      "Tham gia các hoạt động thể thao nguy hiểm chuyên nghiệp (leo núi, đua xe...)",
      "Chiến tranh, bạo động, khủng bố hoặc ngộ độc thực phẩm không thuộc phạm vi"
    ],
    documents: [
      "Giấy đề nghị tham gia bảo hiểm tai nạn con người BIC",
      "Căn cước công dân / Giấy khai sinh",
      "Biên bản tai nạn (nếu là tai nạn giao thông/lao động) & Chứng từ y tế bồi thường"
    ],
    claimSteps: [
      "Bước 1: Tiếp nhận sơ cứu tại cơ sở y tế gần nhất và giữ lại toàn bộ hóa đơn/chứng từ y tế.",
      "Bước 2: Thông báo sự cố cho hotline 0916 201 085 trong vòng 14 ngày kể từ khi xảy ra tai nạn.",
      "Bước 3: Gửi Giấy yêu cầu bồi thường kèm theo Giấy ra viện, Bảng kê chi phí y tế và Hóa đơn tài chính.",
      "Bước 4: BIC thẩm định và giải quyết chi trả tiền bảo hiểm trong 5-7 ngày làm việc."
    ],
    sourceLabel: "BIC · Bảo hiểm tai nạn con người 24/24",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-suc-khoe/bao-hiem-tai-nan-con-nguoi-24-24.html",
  },
  "bao-hiem-du-lich": {
    officialName: "Bảo hiểm Khách du lịch Quốc tế & Trong nước BIC Flexi",
    audience: "Cá nhân, gia đình, nhóm bạn hoặc đoàn khách đi du lịch, du học, công tác trong và ngoài nước.",
    legalBasis: "Quy tắc Bảo hiểm Khách Du lịch Quốc tế BIC đáp ứng chuẩn Schengen & Đại sứ quán toàn cầu.",
    limits: [
      "Hạn mức bảo vệ y tế quốc tế: Lên tới 2.500.000.000 VNĐ (~100.000 EUR/USD)",
      "Chi phí cứu trợ khẩn cấp SOS International: Không giới hạn",
      "Mất mát hành lý & giấy tờ: Tối đa 50.000.000 VNĐ / chuyến đi"
    ],
    coverage: [
      "Thanh toán chi phí y tế khẩn cấp, điều trị nội trú, ngoại trú do ốm đau hoặc tai nạn khi ở nước ngoài",
      "Dịch vụ bảo lãnh viện phí và Vận chuyển y tế cấp cứu SOS International 24/7",
      "Bồi thường mất mát, hư hỏng hành lý tư trang và mất HC/Giấy tờ thông hành",
      "Bồi thường hủy chuyến, hoãn chuyến bay (trên 4 tiếng) và chi phí mua sắm đồ dùng khẩn cấp"
    ],
    exclusions: [
      "Đi du lịch trái với khuyến cáo y tế của bác sĩ hoặc đến vùng chiến sự/bạo động",
      "Bệnh có sẵn hoặc bệnh mãn tính phát sinh đợt cấp (trừ điều trị cấp cứu giảm đau)",
      "Tổn thất do hành vi vi phạm pháp luật nước sở tại hoặc tham gia môn thể thao mạo hiểm"
    ],
    documents: [
      "Hộ chiếu (Passport) còn hiệu lực & Vé máy bay / Lịch trình chuyến đi",
      "Giấy xác nhận mua bảo hiểm du lịch quốc tế (bản song ngữ Anh - Việt)",
      "Báo cáo mất mát hành lý của hãng hàng không (PIR) hoặc chứng từ y tế nước sở tại khi đòi bồi thường"
    ],
    claimSteps: [
      "Bước 1: Gọi tổng đài SOS International (số in trên thẻ) hoặc Hotline BIC 0916 201 085 khi gặp sự cố ở nước ngoài.",
      "Bước 2: Tiếp nhận điều trị tại Bệnh viện chỉ định để được bảo lãnh chi phí y tế khẩn cấp.",
      "Bước 3: Lưu trữ toàn bộ cuống vé máy bay, biên bản thất lạc hành lý PIR và Hóa đơn y tế.",
      "Bước 4: Nộp hồ sơ bồi thường trực tuyến sau khi về nước để nhận tiền chi trả."
    ],
    sourceLabel: "BIC · Bảo hiểm khách du lịch quốc tế BIC Flexi",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-du-lich/bao-hiem-khach-du-lich-quoc-te.html",
  },
  "bao-hiem-nha-o": {
    officialName: "Bảo hiểm Toàn diện Nhà tư nhân BIC Home Care / Happy Home",
    audience: "Chủ sở hữu nhà chung cư, nhà phố liền kề, biệt thự hoặc người thuê nhà dài hạn.",
    legalBasis: "Quy tắc Bảo hiểm Toàn diện Nhà Tư nhân ban hành theo Quyết định của BIC.",
    limits: [
      "Hạn mức bảo vệ ngôi nhà: Từ 500.000.000 VNĐ đến 5.000.000.000 VNĐ",
      "Hạn mức bảo vệ tài sản bên trong: Lên tới 1.000.000.000 VNĐ",
      "Có thể chuẩn bị thông tin ban đầu nhanh, hồ sơ chính thức cần được tư vấn viên xác nhận trước khi phát hành"
    ],
    coverage: [
      "Bảo vệ phần khung vật chất ngôi nhà trước rủi ro Cháy, Sét đánh, Nổ gas/thiết bị",
      "Mở rộng rủi ro Giông lốc, Lũ lụt, Trộm cướp có dấu hiệu đột nhập có vũ lực",
      "Bồi thường thiệt hại vỡ/tràn nước từ bể chứa, đường ống nước hoặc thiết bị PCCC",
      "Chi trả chi phí dọn dẹp hiện trường, chi phí thuê nhà ở tạm sau sự cố tổn thất"
    ],
    exclusions: [
      "Tài sản tự lên men, tự tỏa nhiệt hoặc hư hỏng do hao mòn theo thời gian",
      "Mất trộm không có dấu hiệu cạy phá đột nhập hoặc do người trong gia đình thông đồng",
      "Thiệt hại đối với tiền mặt, vàng bạc, đá quý, đồ cổ hoặc chứng khoán lưu giữ tại nhà"
    ],
    documents: [
      "Địa chỉ chính xác ngôi nhà bảo hiểm & Giấy chứng nhận quyền sở hữu nhà (Sổ hồng/Sổ đỏ/Hợp đồng mua bán)",
      "Danh mục tài sản bên trong (đối với gói bảo hiểm tài sản mở rộng)",
      "Giấy yêu cầu bảo hiểm nhà tư nhân BIC"
    ],
    claimSteps: [
      "Bước 1: Thực hiện biện pháp chữa cháy/cứu hộ khẩn cấp và gọi PCCC 114.",
      "Bước 2: Thông báo sự cố cho Hotline BIC 0916 201 085 trong vòng 24 giờ.",
      "Bước 3: Chụp ảnh hiện trường tổn thất và phối hợp với Cán bộ giám định BIC kiểm tra thực tế.",
      "Bước 4: Nhận tiền bồi thường sửa chữa nhà và khôi phục tài sản theo hợp đồng."
    ],
    sourceLabel: "BIC · Bảo hiểm toàn diện nhà tư nhân BIC Home",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-nha-tu-nhan/bao_hiem_toan_dien_nha_tu_nhan.html",
  },
  "bao-hiem-tai-san-chay-no": {
    officialName: "Bảo hiểm Cháy nổ bắt buộc & Rủi ro tài sản BIC",
    audience: "Chủ cửa hàng, siêu thị, kho bãi, văn phòng công ty, nhà xưởng sản xuất và cơ sở kinh doanh.",
    legalBasis: "Nghị định 97/2021/NĐ-CP sửa đổi Nghị định 23/2018/NĐ-CP về bảo hiểm cháy nổ bắt buộc.",
    limits: [
      "Số tiền bảo hiểm: Theo giá trị thị trường của tài sản (Nhà xưởng, Máy móc, Hàng hóa)",
      "Mức khấu trừ: Theo quy định chuẩn của Bộ Tài chính đối với từng nhóm cơ sở nguy hiểm cháy nổ"
    ],
    coverage: [
      "Bồi thường thiệt hại vật chất tài sản do sự cố Cháy, Sét đánh hoặc Nổ gây ra",
      "Mở rộng rủi ro Cháy lan, Trộm cướp đi kèm cháy nổ và chi phí chữa cháy khẩn cấp",
      "Đáp ứng đầy đủ yêu cầu kiểm tra an toàn PCCC của Công an PCCC toàn quốc"
    ],
    exclusions: [
      "Cơ sở không tuân thủ nghiêm ngặt các khuyến nghị PCCC bị cơ quan chức năng đình chỉ",
      "Cố ý gây cháy nổ hoặc tổn thất do hiện tượng tự bốc cháy của hàng hóa đặc thù",
      "Các tài sản không được kê khai trong Danh mục tài sản tham gia bảo hiểm"
    ],
    documents: [
      "Biên bản kiểm tra an toàn PCCC gần nhất của Công an PCCC",
      "Bảng cân đối kế toán / Danh mục chi tiết nhà xưởng, máy móc thiết bị và hàng hóa tồn kho",
      "Giấy yêu cầu bảo hiểm cháy nổ BIC"
    ],
    claimSteps: [
      "Bước 1: Gọi ngay 114 PCCC và Hotline BIC 0916 201 085.",
      "Bước 2: Bảo vệ hiện trường để Công an PCCC và Đại diện giám định BIC lập biên bản sự cố.",
      "Bước 3: Thu thập hồ sơ tổn thất và bản kê khai chi tiết giá trị tài sản bị hư hỏng.",
      "Bước 4: BIC thực hiện giám định bồi thường và chi trả theo quy định pháp luật."
    ],
    sourceLabel: "BIC · Danh mục Bảo hiểm Cháy nổ tài sản",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-tai-san.html",
  },
  "bao-hiem-doanh-nghiep": {
    officialName: "Giải pháp Bảo hiểm Mọi rủi ro Tài sản & Kỹ thuật Doanh nghiệp BIC",
    audience: "Các doanh nghiệp vừa và lớn, nhà máy sản xuất, khu công nghiệp, chủ đầu tư dự án xây dựng.",
    limits: [
      "Số tiền bảo hiểm: Linh hoạt theo tổng giá trị tài sản doanh nghiệp (lên tới hàng nghìn tỷ đồng)",
      "Bảo vệ trọn gói: Tài sản + Gián đoạn kinh doanh + Trách nhiệm công cộng"
    ],
    coverage: [
      "Bảo hiểm mọi rủi ro tổn thất vật chất bất ngờ đối với nhà xưởng, máy móc thiết bị, hàng hóa",
      "Bồi thường tổn thất thất thu lợi nhuận do gián đoạn kinh doanh sau sự cố cháy nổ/tai nạn",
      "Bảo hiểm máy móc thiết bị chủ thầu, hư hỏng máy móc và thiết bị điện tử doanh nghiệp"
    ],
    exclusions: [
      "Thiệt hại do ngừng hoạt động không bắt nguồn từ tổn thất vật chất thuộc phạm vi bảo hiểm",
      "Hành vi gian lận thương mại, vi phạm quy trình kỹ thuật nghiêm trọng hoặc chiến tranh"
    ],
    documents: [
      "Giấy đăng ký doanh nghiệp & Báo cáo tài chính gần nhất",
      "Danh mục tài sản chi tiết & Sơ đồ mặt bằng nhà xưởng",
      "Biên bản khảo sát rủi ro của Cán bộ thẩm định BIC"
    ],
    claimSteps: [
      "Bước 1: Giữ nguyên hiện trường và liên hệ Cán bộ quản lý hợp đồng BIC / 0916 201 085.",
      "Bước 2: Phối hợp công ty giám định độc lập tiến hành giám định thiệt hại thực tế.",
      "Bước 3: Lập phương án khắc phục tổn thất và thanh toán chi phí bồi thường."
    ],
    sourceLabel: "BIC · Danh mục Sản phẩm Doanh nghiệp",
    sourceUrl: "https://bic.vn/dmsp-dn/bao-hiem-doanh-nghiep.html",
  },
  "bao-hiem-trach-nhiem": {
    officialName: "Bảo hiểm Trách nhiệm công cộng & Trách nhiệm sản phẩm BIC",
    audience: "Nhà hàng, khách sạn, trung tâm thương mại, công ty sản xuất hàng tiêu dùng, thực phẩm.",
    limits: [
      "Hạn mức trách nhiệm: Linh hoạt từ 1.000.000.000 VNĐ đến 50.000.000.000 VNĐ / vụ",
      "Bao gồm: Chi phí bồi thường + Chi phí tố tụng bào chữa pháp lý"
    ],
    coverage: [
      "Bồi thường trách nhiệm pháp lý đối với thương tật thân thể hoặc thiệt hại tài sản của bên thứ ba phát sinh tại địa điểm kinh doanh",
      "Bảo vệ trách nhiệm sản phẩm đối với thương tật/ngộ độc/tổn thất do hàng hóa doanh nghiệp cung cấp",
      "Chi trả chi phí luật sư bào chữa và phí tòa án phát sinh thuộc phạm vi"
    ],
    exclusions: [
      "Trách nhiệm đối với người lao động thuộc doanh nghiệp (được bảo vệ qua BH Tai nạn lao động)",
      "Thiệt hại cố ý hoặc sản phẩm bị thu hồi do lỗi thiết kế đã biết trước"
    ],
    documents: [
      "Giấy phép hoạt động kinh doanh & Khai báo doanh thu hằng năm",
      "Mô tả quy trình kiểm soát chất lượng sản phẩm / an toàn địa điểm",
      "Hồ sơ khiếu nại của bên thứ ba khi xảy ra sự cố"
    ],
    claimSteps: [
      "Bước 1: Thông báo cho BIC 0916 201 085 ngay khi nhận được khiếu nại của bên thứ ba.",
      "Bước 2: Không tự ý thừa nhận trách nhiệm hoặc cam kết bồi thường khi chưa có ý kiến văn bản từ BIC.",
      "Bước 3: Thu thập hồ sơ y tế/tài sản tổn thất của bên thứ ba và chứng từ bào chữa.",
      "Bước 4: BIC đại diện thương lượng hoặc chi trả tiền bồi thường theo phán quyết."
    ],
    sourceLabel: "BIC · Bảo hiểm Trách nhiệm công cộng",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-trach-nhiem/a13562.html",
  },
  "bao-hiem-hang-hoa": {
    officialName: "Bảo hiểm Hàng hóa Vận chuyển Nội địa & Xuất nhập khẩu BIC",
    audience: "Doanh nghiệp xuất nhập khẩu, chủ hàng, công ty logistics, đơn vị vận tải đường bộ/biển/hàng không.",
    legalBasis: "Quy tắc Bảo hiểm Hàng hóa vận chuyển theo chuẩn Hiệp hội Bảo vệ Hàng hải Quốc tế (ICC A/B/C).",
    limits: [
      "Số tiền bảo hiểm: Lên tới 110% Giá trị CIF/FOB của lô hàng",
      "Phạm vi: Vận chuyển nội địa toàn quốc hoặc vận chuyển quốc tế đường biển, hàng không"
    ],
    coverage: [
      "Bồi thường tổn thất hàng hóa do Cháy, Nổ, Phương tiện vận chuyển đắm, mắc cạn, lật đổ, đâm va",
      "Bảo vệ rủi ro thiên tai: Bão lốc, sóng thần, hàng hóa bị dội nước biển hoặc rơi khỏi tàu",
      "Bồi thường rủi ro trộm cướp, thiếu hụt nguyên kiện trong quá trình xếp dỡ, vận chuyển",
      "Chi trả chi phí đóng góp tổn thất chung (General Average) và chi phí ngăn ngừa tổn thất"
    ],
    exclusions: [
      "Hàng hóa đóng gói không đúng quy cách hoặc khuyết tật vốn có của hàng hóa",
      "Thiệt hại do giao hàng chậm trễ, rò rỉ thông thường hoặc biến chất tự nhiên",
      "Rủi ro đình công, chiến tranh (trừ khi có thỏa thuận mua thêm điều khoản riêng)"
    ],
    documents: [
      "Hóa đơn thương mại (Commercial Invoice) & Phụ lục đóng gói (Packing List)",
      "Vận đơn đường biển/đường hàng không/đường bộ (Bill of Lading / Airway Bill)",
      "Biên bản giám định tổn thất hàng hóa & Giấy mua bảo hiểm chuyến/mở"
    ],
    claimSteps: [
      "Bước 1: Khai báo ngay với Cảng/Đơn vị vận chuyển và bảo vệ lô hàng tổn thất.",
      "Bước 2: Gọi Hotline BIC 0916 201 085 để chỉ định công ty giám định độc lập đến cảng/kho giám định.",
      "Bước 3: Lập Biên bản bất thương (Roroc/COR) và bảo lưu quyền truy đòi người vận chuyển.",
      "Bước 4: BIC thực hiện bồi thường tổn thất lô hàng trong vòng 7-10 ngày làm việc."
    ],
    sourceLabel: "BIC · Bảo hiểm hàng hóa vận chuyển",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-hang-hoa-van-chuyen/a13884.html",
  },
  "bao-hiem-nong-nghiep": {
    officialName: "Bảo hiểm Nông nghiệp & Cây trồng BIC",
    audience: "Hộ nông dân, hợp tác xã nông nghiệp, trang trại cây trồng và doanh nghiệp chế biến nông sản.",
    limits: [
      "Bảo vệ tài sản nhà xưởng, máy nông nghiệp, vùng nguyên liệu cây cao su/cây công nghiệp",
      "Hạn mức bảo vệ theo diện tích và giá trị đầu tư thực tế"
    ],
    coverage: [
      "Bảo vệ tài sản nhà kho, máy kéo, thiết bị thu hoạch trước cháy nổ, giông lốc",
      "Hỗ trợ thiệt hại cây trồng công nghiệp (cây cao su, cà phê) do bão lớn, hỏa hoạn thuộc phạm vi",
      "Đồng hành cùng bà con nông dân và doanh nghiệp Tây Nguyên chủ động ứng phó thiên tai"
    ],
    exclusions: [
      "Thiệt hại do dịch bệnh cây trồng không thuộc danh mục rủi ro được bảo hiểm",
      "Canh tác sai kỹ thuật hoặc bỏ mặc không chăm sóc thu hoạch theo quy trình"
    ],
    documents: [
      "Giấy chứng nhận quyền sử dụng đất nông nghiệp / Hợp đồng thuê đất trang trại",
      "Bản kê khai diện tích, tuổi cây và danh mục máy móc thiết bị nông nghiệp",
      "Giấy yêu cầu bảo hiểm BIC"
    ],
    claimSteps: [
      "Bước 1: Thông báo cho Cán bộ BIC địa phương / 0916 201 085 ngay khi xảy ra thiên tai/hỏa hoạn.",
      "Bước 2: Phối hợp với Ban chỉ đạo PCLB địa phương và BIC lập biên bản xác nhận thiệt hại.",
      "Bước 3: Nộp hồ sơ đề nghị bồi thường kèm theo ảnh chụp vùng tổn thất.",
      "Bước 4: BIC giải ngân bồi thường giúp bà con sớm tái thiết sản xuất."
    ],
    sourceLabel: "BIC · Bảo hiểm tài sản nông nghiệp",
    sourceUrl: "https://bic.vn/ttsp/bao-hiem-tai-san.html",
  },
};
