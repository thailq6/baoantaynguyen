export type InsuranceCertificate = {
  id: string;
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
  licensePlate: string;
  chassisNumber: string;
  engineNumber: string;
  vehicleType: string;
  productTitle: string;
  startDate: string;
  endDate: string;
  coverageLimit: string;
  premiumAmount: number;
  status: "active" | "expired" | "pending";
  issueDate: string;
  qrCodeData: string;
  legalBase: string;
  provider: string;
  hotline: string;
};

export const sampleCertificates: InsuranceCertificate[] = [
  {
    id: "BIC-2026-BATN-349540",
    ownerName: "TRẦN TRỌNG ANH",
    ownerPhone: "0916201085",
    ownerAddress: "Thôn 3, Ea Tiêu, Cư Kuin, ĐL (Đắk Lắk)",
    licensePlate: "47A-349.54",
    chassisNumber: "3GS1L2466644",
    engineNumber: "2GD0816053",
    vehicleType: "Ô tô chở người 7 chỗ (TOYOTA FORTUNE)",
    productTitle: "Bảo hiểm TNDS Bắt buộc Xe Ô tô (Bản Điện tử BIC)",
    startDate: "12/08/2026",
    endDate: "12/08/2027",
    coverageLimit: "150.000.000đ/người/vụ (Sức khỏe) & 100.000.000đ/vụ (Tài sản)",
    premiumAmount: 873400,
    status: "active",
    issueDate: "12/08/2026 09:15",
    qrCodeData: "https://baoantaynguyen.com/xac-thuc/BIC-2026-BATN-349540",
    legalBase: "Nghị định 67/2023/NĐ-CP & Luật Kinh doanh Bảo hiểm 2022",
    provider: "Tổng Công ty Bảo hiểm BIDV (BIC) - Bảo An Tây Nguyên",
    hotline: "0916 201 085",
  },
  {
    id: "BIC-2026-BATN-984712",
    ownerName: "NGUYỄN VĂN AN",
    ownerPhone: "0916201085",
    ownerAddress: "128 Lê Duẩn, TP. Buôn Ma Thuột, Tỉnh Đắk Lắk",
    licensePlate: "47A-888.99",
    chassisNumber: "VF8X9812374901",
    engineNumber: "EV90084712",
    vehicleType: "Ô tô chở người dưới 6 chỗ",
    productTitle: "Bảo hiểm TNDS Bắt buộc Xe Ô tô (Phí Nghị định 67)",
    startDate: "15/01/2026",
    endDate: "15/01/2027",
    coverageLimit: "150.000.000đ/người/vụ (Sức khỏe) & 100.000.000đ/vụ (Tài sản)",
    premiumAmount: 480700,
    status: "active",
    issueDate: "15/01/2026 08:30",
    qrCodeData: "https://baoantaynguyen.com/xac-thuc/BIC-2026-BATN-984712",
    legalBase: "Nghị định 67/2023/NĐ-CP & Luật Kinh doanh Bảo hiểm 2022",
    provider: "Tổng Công ty Bảo hiểm BIDV (BIC) - Bảo An Tây Nguyên",
    hotline: "0916 201 085",
  },
  {
    id: "BIC-2026-BATN-612934",
    ownerName: "TRẦN THỊ MAI",
    ownerPhone: "0916201085",
    ownerAddress: "Phường Tân Lợi, TP. Buôn Ma Thuột, Đắk Lắk",
    licensePlate: "47B1-678.90",
    chassisNumber: "RLC47000981245",
    engineNumber: "JK10E094812",
    vehicleType: "Xe máy mô tô 2 bánh trên 50cc",
    productTitle: "Bảo hiểm TNDS Bắt buộc Xe Máy",
    startDate: "01/03/2026",
    endDate: "01/03/2027",
    coverageLimit: "150.000.000đ/người/vụ (Sức khỏe) & 50.000.000đ/vụ (Tài sản)",
    premiumAmount: 66000,
    status: "active",
    issueDate: "01/03/2026 14:15",
    qrCodeData: "https://baoantaynguyen.com/xac-thuc/BIC-2026-BATN-612934",
    legalBase: "Nghị định 67/2023/NĐ-CP",
    provider: "Tổng Công ty Bảo hiểm BIDV (BIC) - Bảo An Tây Nguyên",
    hotline: "0916 201 085",
  },
  {
    id: "BIC-2026-BATN-334112",
    ownerName: "CÔNG TY TNHH NÔNG SẢN TÂY NGUYÊN",
    ownerPhone: "0916201085",
    ownerAddress: "Thị trấn Quảng Phú, Huyện Cư M'gar, Đắk Lắk",
    licensePlate: "47C-234.56",
    chassisNumber: "MNBXX091823749",
    engineNumber: "FD45E981230",
    vehicleType: "Xe ô tô Tải dưới 3 tấn",
    productTitle: "Bảo hiểm TNDS Bắt buộc + Tai nạn Lái phụ xe",
    startDate: "10/02/2026",
    endDate: "10/02/2027",
    coverageLimit: "150.000.000đ/người/vụ",
    premiumAmount: 1026300,
    status: "active",
    issueDate: "10/02/2026 10:00",
    qrCodeData: "https://baoantaynguyen.com/xac-thuc/BIC-2026-BATN-334112",
    legalBase: "Nghị định 67/2023/NĐ-CP",
    provider: "Tổng Công ty Bảo hiểm BIDV (BIC) - Bảo An Tây Nguyên",
    hotline: "0916 201 085",
  },
];

export function findCertificates(query: string): InsuranceCertificate[] {
  const q = query.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!q) return [];
  return sampleCertificates.filter((cert) => {
    const plate = cert.licensePlate.toLowerCase().replace(/[^a-z0-9]/g, "");
    const phone = cert.ownerPhone.toLowerCase().replace(/[^a-z0-9]/g, "");
    const id = cert.id.toLowerCase().replace(/[^a-z0-9]/g, "");
    return plate.includes(q) || phone.includes(q) || id.includes(q);
  });
}

export function getCertificateById(id: string): InsuranceCertificate | undefined {
  return sampleCertificates.find(
    (c) => c.id.toLowerCase() === id.trim().toLowerCase()
  );
}

export function generateMockCertificate(
  plate: string,
  owner: string,
  type: string
): InsuranceCertificate {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const certId = `BIC-2026-BATN-${randomSuffix}`;
  return {
    id: certId,
    ownerName: owner || "NGUYỄN VĂN AN",
    ownerPhone: "0916201085",
    ownerAddress: "TP. Buôn Ma Thuột, Tỉnh Đắk Lắk",
    licensePlate: plate || "47A-888.99",
    chassisNumber: "VF8X9812374901",
    engineNumber: "EV90084712",
    vehicleType: type || "Ô tô dưới 6 chỗ",
    productTitle: "Bảo hiểm TNDS Bắt buộc phương tiện cơ giới",
    startDate: "11/09/2026",
    endDate: "11/09/2027",
    coverageLimit: "150.000.000đ/người/vụ",
    premiumAmount: 480700,
    status: "active",
    issueDate: "11/09/2026 19:30",
    qrCodeData: `https://baoantaynguyen.com/xac-thuc/${certId}`,
    legalBase: "Nghị định 67/2023/NĐ-CP & Luật Kinh doanh Bảo hiểm 2022",
    provider: "Tổng Công ty Bảo hiểm BIDV (BIC) - Bảo An Tây Nguyên",
    hotline: "0916 201 085",
  };
}
