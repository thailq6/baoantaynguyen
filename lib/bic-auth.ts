import crypto from "crypto";

const BIC_KEY_FOR_MYBIC_URL = "https://apigw.bic.vn/MyBicAPI/Account/GetKeyForMyBic";

type CachedToken = {
  token: string;
  expiresAt: number;
};

let cachedEbizToken: CachedToken | null = null;

function generateHmacSignature(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const message = `${dateStr}MyBIC`;
  const secret = "MyBIC";

  return crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("base64");
}

export async function getBicEbizToken(): Promise<string> {
  const now = Date.now();
  // Return cached token if valid for at least 5 more minutes
  if (cachedEbizToken && cachedEbizToken.expiresAt - now > 5 * 60 * 1000) {
    return cachedEbizToken.token;
  }

  const signature = generateHmacSignature();

  const response = await fetch(BIC_KEY_FOR_MYBIC_URL, {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Origin": "https://mybic.vn",
      "Referer": "https://mybic.vn/",
    },
    body: JSON.stringify({ Key: signature }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Không thể lấy token xác thực từ BIC (HTTP ${response.status})`);
  }

  const result = await response.json();
  const ebizToken = result?.Data?.EbizToken;

  if (!ebizToken || typeof ebizToken !== "string") {
    throw new Error("Dữ liệu token từ BIC không hợp lệ.");
  }

  // Token is typically valid for 24h, cache for 12h locally
  cachedEbizToken = {
    token: ebizToken,
    expiresAt: now + 12 * 60 * 60 * 1000,
  };

  return ebizToken;
}
