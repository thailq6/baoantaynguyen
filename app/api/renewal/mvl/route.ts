import { NextResponse } from "next/server";
import { mapMvlPremiumItem, type MvlPremiumResponse, type MvlPremiumItem } from "../../../../lib/renewal";
import { getBicEbizToken } from "../../../../lib/bic-auth";

function getBICEndpointAndPayload(productType: string, cert: string) {
  switch (productType) {
    case "MC":
      return {
        url: "https://apigw.bic.vn/ebizapi/api/v1/mc/getpremium",
        body: { CertificateNo: cert, Product_Type: "MC", Insured: "", PlateNumber: "", IsPartner: false },
      };
    case "PHA":
      return {
        url: "https://apigw.bic.vn/ebizapi/api/v1/pha/getpremiumnew",
        body: { CertificateNo: cert },
      };
    case "CI":
      return {
        url: "https://apigw.bic.vn/ebizapi/api/v1/ci/getpremium",
        body: { CertificateNo: cert },
      };
    case "GPA":
      return {
        url: "https://apigw.bic.vn/ebizapi/api/v1/gpa/getpremium",
        body: { CertificateNo: cert },
      };
    case "EUA":
      return {
        url: "https://apigw.bic.vn/ebizapi/api/v1/eua/getpremium",
        body: { CertificateNo: cert },
      };
    case "CPI":
      return {
        url: "https://apigw.bic.vn/ebizapi/api/v1/cpi/getpremium",
        body: { CertificateNo: cert },
      };
    case "MVL":
    default:
      return {
        url: "https://apigw.bic.vn/ebizapi/api/v1/mvl/getpremium",
        body: { CertificateNo: cert, Product_Type: "MVL", IsPartner: false },
      };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const certificateNo = String(body?.certificateNo || "").trim();
    const productType = String(body?.productType || "MVL").trim().toUpperCase();

    if (!certificateNo) {
      return NextResponse.json(
        { error: "Vui lòng nhập số GCN, số đơn BH hoặc biển số xe." },
        { status: 400 },
      );
    }

    let ebizToken: string;
    try {
      ebizToken = await getBicEbizToken();
    } catch (tokenErr) {
      const message = tokenErr instanceof Error ? tokenErr.message : "Không thể xác thực với hệ thống BIC.";
      return NextResponse.json({ error: message }, { status: 502 });
    }

    const { url: targetUrl, body: payload } = getBICEndpointAndPayload(productType, certificateNo);

    const upstream = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ebizToken}`,
        "Origin": "https://mybic.vn",
        "Referer": "https://mybic.vn/",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await upstream.text();
    let data: MvlPremiumResponse | null = null;

    try {
      data = JSON.parse(text) as MvlPremiumResponse;
    } catch {
      return NextResponse.json(
        { error: "API BIC trả về dữ liệu không hợp lệ.", details: text },
        { status: 502 },
      );
    }

    if (!upstream.ok) {
      return NextResponse.json(
        { error: data?.message || "Không thể tra cứu dữ liệu tái tục từ BIC." },
        { status: upstream.status },
      );
    }

    const rawItems: MvlPremiumItem[] =
      data.MVLPremium ||
      data.MCPremium ||
      data.data?.dataResults ||
      [];

    const policies = rawItems.map((item) => mapMvlPremiumItem(item, productType));

    return NextResponse.json({
      succeeded: Boolean(data.succeeded),
      policies,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Không thể kết nối API tái tục.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
