import { getCertificateById, sampleCertificates } from "../../../lib/certificate";
import { Icon } from "../../../components/ui/icon";
import Link from "next/link";

export function generateStaticParams() {
  return sampleCertificates.map((cert) => ({
    id: cert.id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};


export default async function XacThucPage({ params }: Props) {
  const { id } = await params;
  const cert = getCertificateById(id);

  if (!cert) {
    return (
      <main className="min-h-screen bg-[#f4f8fd] py-16 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-[24px] bg-white p-8 text-center shadow-xl border border-[#cce0f5] space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <Icon name="close" size={32} />
          </div>
          <h1 className="text-xl font-bold text-[#07192f]">Không tìm thấy dữ liệu xác thực</h1>
          <p className="text-xs text-[#4a6785]">
            Mã chứng nhận <strong>{id}</strong> không tồn tại trên hệ thống niêm phong điện tử. Vui lòng kiểm tra lại hoặc liên hệ Hotline <strong>0916 201 085</strong>.
          </p>
          <Link href="/tra-cuu" className="inline-block rounded-full bg-[#0066cc] px-6 py-2.5 text-xs font-bold text-white shadow-md">
            Quay lại Cổng tra cứu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07192f] py-8 md:py-16 text-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-6">
        {/* Authority Legal Header Banner */}
        <div className="rounded-[24px] border border-emerald-500/40 bg-gradient-to-br from-emerald-950/80 via-emerald-900/60 to-[#07192f] p-6 shadow-2xl backdrop-blur-md text-center space-y-3">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-8 ring-emerald-500/20">
            <Icon name="check" size={28} />
          </div>
          <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-extrabold text-emerald-300 border border-emerald-500/40 uppercase tracking-widest">
            HỆ THỐNG NIÊM PHONG ĐIỆN TỬ BIC - BIDV
          </span>
          <h1 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
            ✓ GIẤY CHỨNG NHẬN HỢP LỆ
          </h1>
          <p className="text-xs text-emerald-200/90 max-w-xl mx-auto leading-relaxed">
            Chứng nhận bảo hiểm TNDS bắt buộc này có đầy đủ hiệu lực pháp lý tra cứu công khai trực tiếp cho Cảnh sát giao thông (CSGT) và các Cơ quan Chức năng theo <strong>Nghị định 67/2023/NĐ-CP</strong>.
          </p>
        </div>

        {/* Certificate Master Details Card */}
        <div className="rounded-[24px] border border-[#cce0f5]/20 bg-white text-[#07192f] shadow-2xl overflow-hidden">
          {/* Header branding */}
          <div className="bg-[#eef6ff] px-6 py-4 border-b border-[#cce0f5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/image/baoan.jpg" alt="Bảo An Tây Nguyên Avatar" className="h-10 w-10 rounded-full border border-[#0066cc] object-cover" />
              <div>
                <h3 className="text-sm font-bold text-[#0066cc]">TỔNG CÔNG TY BẢO HIỂM BIDV (BIC)</h3>
                <p className="text-[11px] text-[#4a6785]">Đơn vị ủy quyền: Bảo An Tây Nguyên</p>
              </div>
            </div>
            <span className="rounded-lg bg-[#0066cc] px-3 py-1 font-mono text-xs font-bold text-white shadow-sm">
              {cert.id}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Owner & Vehicle section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-[#eef6ff] pb-6">
              <div>
                <span className="text-[11px] font-bold text-[#4a6785] uppercase tracking-wider">THÔNG TIN CHỦ XE</span>
                <p className="mt-1 text-lg font-bold text-[#07192f]">{cert.ownerName}</p>
                <p className="mt-1 text-xs text-[#4a6785]">SĐT: <span className="font-mono font-bold text-[#0b2341]">{cert.ownerPhone}</span></p>
                <p className="mt-1 text-xs text-[#4a6785]">Địa chỉ: {cert.ownerAddress}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#4a6785] uppercase tracking-wider">THÔNG TIN PHƯƠNG TIỆN</span>
                <p className="mt-1 font-mono text-2xl font-black text-[#0066cc] tracking-tight">{cert.licensePlate}</p>
                <p className="mt-1 text-xs text-[#4a6785]">Loại xe: <strong className="text-[#0b2341]">{cert.vehicleType}</strong></p>
                <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-[#4a6785]">
                  <div>Số khung: <span className="font-mono text-[#0b2341]">{cert.chassisNumber}</span></div>
                  <div>Số máy: <span className="font-mono text-[#0b2341]">{cert.engineNumber}</span></div>
                </div>
              </div>
            </div>

            {/* Coverage & Period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#cce0f5] bg-[#f8fafc] p-4 text-xs space-y-1">
                <span className="font-bold text-[#0066cc]">THỜI HẠN BẢO HIỂM</span>
                <p className="text-sm font-bold text-[#07192f]">Từ {cert.startDate} đến {cert.endDate}</p>
                <p className="text-[11px] text-emerald-700 font-semibold">🟢 Đang trong thời hạn bảo vệ hợp pháp</p>
              </div>

              <div className="rounded-2xl border border-[#cce0f5] bg-[#f8fafc] p-4 text-xs space-y-1">
                <span className="font-bold text-[#0066cc]">HẠN MỨC MẮC TRÁCH NHIỆM (TNDS)</span>
                <p className="text-xs font-bold text-[#07192f]">{cert.coverageLimit}</p>
                <p className="text-[11px] text-[#4a6785]">Theo đúng biểu phí Nghị định 67/2023/NĐ-CP</p>
              </div>
            </div>

            {/* Digital Stamp / Verification Lock */}
            <div className="flex items-center justify-between rounded-2xl bg-slate-900 p-4 text-white text-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold">
                  BIC
                </div>
                <div>
                  <div className="font-bold text-white">Xác thực Chữ ký số BIC</div>
                  <div className="text-[11px] text-slate-400">Thời điểm cấp đơn: {cert.issueDate}</div>
                </div>
              </div>
              <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-[11px] font-mono text-emerald-300 border border-emerald-500/30">
                VERIFIED SEAL
              </span>
            </div>
          </div>
        </div>

        {/* Claim & Contact Action */}
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-center space-y-3 backdrop-blur-sm">
          <h3 className="text-sm font-bold text-white">Bạn gặp sự cố sự vụ cần bảo lãnh bồi thường gấp?</h3>
          <p className="text-xs text-white/70 max-w-md mx-auto">
            Gọi ngay Tổng đài hỗ trợ sự cố giao thông 24/7 của đại lý Bảo An Tây Nguyên để được đại diện hướng dẫn hồ sơ pháp lý.
          </p>
          <a
            href="tel:0916201085"
            className="inline-flex items-center gap-2 rounded-full bg-[#f5ab19] px-7 py-3 text-xs font-extrabold text-[#07192f] shadow-lg hover:bg-amber-400 transition"
          >
            <Icon name="phone" size={16} />
            <span>Gọi Hotline Bảo An Tây Nguyên: 0916 201 085</span>
          </a>
        </div>
      </div>
    </main>
  );
}
