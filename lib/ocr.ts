export type OcrResult = {
  vehicleType: "personal" | "commercial" | "pickup" | "motorbike";
  licensePlate: string;
  chassisNumber: string;
  engineNumber: string;
  ownerName: string;
  address: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  capacitySeats?: string;
  engineCapacity?: string;
  firstRegistrationDate?: string;
  confidenceScore: number;
  rawExtractedText: string;
  /** Number of fields successfully extracted (out of total parseable fields) */
  fieldsFound: number;
  fieldsTotal: number;
};

const TOTAL_PARSEABLE_FIELDS = 12;

/**
 * Client-side OCR Document Processor
 *
 * Uses Tesseract.js with Vietnamese + English language models (vie+eng)
 * to extract ALL raw text from uploaded images (Cà vẹt xe, CCCD, etc.),
 * then applies multi-column intelligent parsing on the raw text.
 *
 * NO fake data. If a field cannot be reliably found → returns "".
 */
export async function processOcrDocument(file: File): Promise<OcrResult> {
  let rawText = "";

  if (typeof window !== "undefined") {
    try {
      const Tesseract = await import("tesseract.js");
      const res = await Tesseract.recognize(file, "vie+eng");
      rawText = res?.data?.text || "";
    } catch (err) {
      console.warn("[OCR] Tesseract recognition failed:", err);
      try {
        const Tesseract = await import("tesseract.js");
        const res = await Tesseract.recognize(file, "eng");
        rawText = res?.data?.text || "";
      } catch (fallbackErr) {
        console.warn("[OCR] Fallback eng recognition also failed:", fallbackErr);
      }
    }
  }

  return parseRegistrationDocument(rawText);
}

/* ────────────────────────────────────────────────────────────
 * MULTI-COLUMN PARSER FOR VIETNAMESE VEHICLE REGISTRATION CARDS
 * ──────────────────────────────────────────────────────────── */

function parseRegistrationDocument(rawText: string): OcrResult {
  const lines = rawText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const fullText = lines.join("\n");

  const licensePlate = extractLicensePlate(fullText, lines);
  const ownerName = extractOwnerName(fullText, lines);
  const address = extractAddress(fullText, lines);
  const vehicleBrand = extractBrand(fullText, lines);
  const vehicleModel = extractModel(fullText, lines);
  const vehicleTypeRaw = extractVehicleTypeRaw(fullText, lines);
  const vehicleColor = extractColor(fullText, lines);
  const engineNumber = extractEngineNumber(fullText, lines);
  const chassisNumber = extractChassisNumber(fullText, lines);
  const engineCapacity = extractEngineCapacity(fullText, lines);
  const capacitySeats = extractCapacitySeats(fullText, lines);
  const firstRegistrationDate = extractRegistrationDate(fullText, lines);

  const fields = [
    licensePlate,
    ownerName,
    address,
    vehicleBrand,
    vehicleModel,
    vehicleTypeRaw,
    vehicleColor,
    engineNumber,
    chassisNumber,
    engineCapacity,
    capacitySeats,
    firstRegistrationDate,
  ];
  const fieldsFound = fields.filter((f) => f && f.length > 0).length;

  const vehicleType = classifyVehicleType(
    vehicleTypeRaw,
    vehicleBrand,
    vehicleModel,
    capacitySeats
  );

  const confidenceScore =
    rawText.length < 5
      ? 0
      : Math.round((fieldsFound / TOTAL_PARSEABLE_FIELDS) * 100) / 100;

  const formattedSeats = capacitySeats ? `${capacitySeats} chỗ` : "";

  return {
    vehicleType,
    licensePlate,
    chassisNumber,
    engineNumber,
    ownerName,
    address,
    vehicleBrand: vehicleBrand || undefined,
    vehicleModel: vehicleModel || undefined,
    vehicleColor: vehicleColor || undefined,
    capacitySeats: formattedSeats || undefined,
    engineCapacity: engineCapacity || undefined,
    firstRegistrationDate: firstRegistrationDate || undefined,
    confidenceScore,
    rawExtractedText: rawText,
    fieldsFound,
    fieldsTotal: TOTAL_PARSEABLE_FIELDS,
  };
}

/* ────────────────────────────────────────────────────────────
 * SMART FIELD EXTRACTORS
 * ──────────────────────────────────────────────────────────── */

/** 1. License Plate (Biển số đăng ký) */
function extractLicensePlate(fullText: string, lines: string[]): string {
  const platePatterns = [
    /\b([0-9]{2}[A-Z]{1,2}\d?[\s\-\.]*[0-9]{3}[\s\-\.]*[0-9]{2})\b/gi,
    /\b([0-9]{2}[A-Z]{1,2}\d?[\s\-\.]*[0-9]{4,5})\b/gi,
  ];

  for (const pat of platePatterns) {
    const matches = fullText.match(pat);
    if (matches) {
      for (const m of matches) {
        const cleaned = cleanPlate(m);
        // Exclude dates like 24/06/2026 or 12/08/2020
        if (cleaned && !cleaned.includes("/") && cleaned.length >= 7) {
          return cleaned;
        }
      }
    }
  }

  return "";
}

/** 2. Chassis Number (Số khung) */
function extractChassisNumber(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/S[oố]\s*khung|Chassis|VIN/i.test(line)) {
      const textToSearch = `${line} ${lines[i + 1] || ""}`;
      const matches = textToSearch.match(/\b([A-Z0-9]{8,17})\b/gi);
      if (matches) {
        for (const m of matches) {
          const upper = m.toUpperCase();
          if (
            /\d/.test(upper) &&
            /[A-Z]/.test(upper) &&
            !/CHASSIS|ADDRESS|OWNER|ENGINE|MODEL/i.test(upper)
          ) {
            return upper;
          }
        }
      }
    }
  }

  const matches = fullText.match(/\b([A-Z0-9]{9,17})\b/gi);
  if (matches) {
    for (const m of matches) {
      const upper = m.toUpperCase();
      if (
        /\d/.test(upper) &&
        /[A-Z]/.test(upper) &&
        !/CHASSIS|ADDRESS|OWNER|ENGINE|MODEL/i.test(upper)
      ) {
        return upper;
      }
    }
  }

  return "";
}

/** 3. Engine Number (Số máy) */
function extractEngineNumber(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/S[oố]\s*m[aá]y|Engine/i.test(line)) {
      const textToSearch = `${line} ${lines[i + 1] || ""}`;
      const matches = textToSearch.match(/\b([A-Z0-9]{6,16})\b/gi);
      if (matches) {
        for (const m of matches) {
          const upper = m.toUpperCase();
          if (
            /\d/.test(upper) &&
            !/ENGINE|NUMBER|SOMAY|SMAY|OWNER|FULL|NAME|ADDRESS/i.test(upper)
          ) {
            return upper;
          }
        }
      }
    }
  }

  return "";
}

/** 4. Owner Name (Tên chủ xe) */
function extractOwnerName(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (
      /T[eê]n\s*ch[uủ]\s*xe|Ch[uủ]\s*xe|H[oọ]\s*v[aà]\s*t[eê]n|Owner/i.test(line)
    ) {
      const candidateLines = [line, lines[i + 1] || "", lines[i + 2] || ""];
      for (const cand of candidateLines) {
        let clean = cand
          .replace(/T[eê]n\s*ch[uủ]\s*xe|Ch[uủ]\s*xe|H[oọ]\s*v[aà]\s*t[eê]n/gi, "")
          .replace(/\([^)]*\)/g, "")
          .replace(
            /Owner'?s?\s*full\s*name|Owner'?s?\s*name|Owner|Full\s*name/gi,
            ""
          )
          .replace(/[:\-]/g, "")
          .trim();

        clean = clean.replace(/\b[A-Z0-9]{6,17}\b/g, "").trim();
        clean = clean.replace(/S[oố]\s*m[aá]y.*$/i, "").trim();

        clean = clean
          .replace(
            /[^A-ZÂĂĐÊÔƠƯÀÁẢÃẠẦẤẨẪẬẦẮẲẴẶÈÉẺẼẸỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌỒỐỔỖỘỜỚỞỠỢÙÚỦŨỤỪỨỬỮỰỲÝỶỸỴ\s]/gi,
            ""
          )
          .trim();
        clean = clean.replace(/\s+/g, " ").toUpperCase().trim();

        clean = clean
          .replace(/\b(?:TEN|CHU|XE|HO|VA|TEN|OWNER|FULL|NAME)\b/g, "")
          .trim();

        if (clean.length >= 4 && /[A-Z]/.test(clean)) {
          return clean;
        }
      }
    }
  }

  return "";
}

/** 5. Address (Địa chỉ) */
function extractAddress(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/[ĐD][iị]a\s*ch[iỉ]|Address/i.test(line)) {
      const candidateLines = [line, lines[i + 1] || ""];
      for (const cand of candidateLines) {
        let clean = cand
          .replace(/[ĐD][iị]a\s*ch[iỉ]/gi, "")
          .replace(/\([^)]*\)/g, "")
          .replace(/Address/gi, "")
          .replace(/[:\-]/g, "")
          .trim();

        clean = clean.replace(/S[oố]\s*khung.*$/i, "").trim();
        clean = clean.replace(/\b[A-Z0-9]{8,17}\b/g, "").trim();
        clean = clean.replace(/\s+/g, " ").trim();

        if (clean.length >= 5 && !/ADDRESS/i.test(clean)) {
          return clean;
        }
      }
    }
  }

  return "";
}

/** 6. Brand (Nhãn hiệu) */
function extractBrand(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/Nh[aã]n\s*hi[eệ]u|Brand|Mark/i.test(line)) {
      let val = line
        .replace(/Nh[aã]n\s*hi[eệ]u/gi, "")
        .replace(/\([^)]*\)/g, "")
        .replace(/Brand|Mark/gi, "")
        .replace(/[:\-]/g, "")
        .trim();

      val = val.replace(/S[oố]\s*lo[aạ]i.*$/i, "").trim();
      val = val.replace(/Model.*$/i, "").trim();
      val = val.replace(/[^A-Za-z0-9\s]/g, "").trim();

      if (val.length >= 2) return val.toUpperCase();
    }
  }
  return "";
}

/** 7. Model (Số loại) */
function extractModel(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/S[oố]\s*lo[aạ]i|Model/i.test(line)) {
      let val = line
        .replace(/S[oố]\s*lo[aạ]i/gi, "")
        .replace(/\([^)]*\)/g, "")
        .replace(/Model\s*code|Model/gi, "")
        .replace(/[:\-]/g, "")
        .trim();

      val = val.replace(/Dung\s*t[ií]ch.*$/i, "").trim();
      val = val.replace(/Capacity.*$/i, "").trim();

      if (val.length >= 2) return val.toUpperCase();
    }
  }
  return "";
}

/** 8. Vehicle Type Raw (Loại xe) */
function extractVehicleTypeRaw(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/Lo[aạ]i\s*xe|Vehicle\s*type|Type/i.test(line)) {
      let val = line
        .replace(/Lo[aạ]i\s*xe/gi, "")
        .replace(/\([^)]*\)/g, "")
        .replace(/Vehicle\s*type|Type/gi, "")
        .replace(/[:\-]/g, "")
        .trim();

      val = val.replace(/Dung\s*t[ií]ch.*$/i, "").trim();
      val = val.replace(/Capacity.*$/i, "").trim();

      if (val.length >= 2) return val;
    }
  }
  return "";
}

/** 9. Color (Màu sơn) */
function extractColor(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/M[aà]u\s*s[oơ]n|Color|Paint/i.test(line)) {
      let val = line
        .replace(/M[aà]u\s*s[oơ]n/gi, "")
        .replace(/\([^)]*\)/g, "")
        .replace(/Color|Paint/gi, "")
        .replace(/[:\-]/g, "")
        .trim();

      val = val.replace(/S[oố]\s*ch[oỗ].*$/i, "").trim();
      val = val.replace(/Seats.*$/i, "").trim();
      val = val.replace(
        /[^A-Za-zÂĂĐÊÔƠƯàáảãạầấẩẫậnằắẳẵặnèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ\s]/gi,
        ""
      ).trim();

      if (val.length >= 2) return val;
    }
  }
  return "";
}

/** 10. Capacity (Dung tích) */
function extractEngineCapacity(fullText: string, lines: string[]): string {
  const match = fullText.match(
    /(?:Dung\s*t[ií]ch|Capacity|cc|cm3)\s*[:\-]?\s*(\d{2,5})/i
  );
  return match ? match[1] : "";
}

/** 11. Seats (Số chỗ) */
function extractCapacitySeats(fullText: string, lines: string[]): string {
  const match = fullText.match(
    /(?:S[oố]\s*ch[oỗ]\s*ng[oồ]i|Seats?|Ch[oỗ]|Ng[oồ]i)\s*[:\-]?\s*(\d{1,3})/i
  );
  return match ? match[1] : "";
}

/** 12. Registration Date (Ngày đăng ký) */
function extractRegistrationDate(fullText: string, lines: string[]): string {
  const dateMatch = fullText.match(/(\d{2}[\/\-]\d{2}[\/\-]\d{4})/);
  return dateMatch ? dateMatch[1] : "";
}

/* ────────────────────────────────────────────────────────────
 * SANITIZATION UTILITIES
 * ──────────────────────────────────────────────────────────── */

function cleanPlate(value: string): string {
  if (!value) return "";
  const cleaned = value.toUpperCase().replace(/[^A-Z0-9\-\.]/g, "");
  if (/^\d{2}[A-Z]{1,2}\d{5}$/.test(cleaned)) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  }
  return cleaned;
}

function classifyVehicleType(
  typeRaw: string,
  brand: string,
  model: string,
  seats: string
): OcrResult["vehicleType"] {
  const combined = `${typeRaw} ${brand} ${model}`.toLowerCase();

  if (
    combined.includes("mô tô") ||
    combined.includes("xe máy") ||
    combined.includes("motorcycle") ||
    combined.includes("xe gắn máy") ||
    combined.includes("scooter")
  ) {
    return "motorbike";
  }

  if (
    combined.includes("bán tải") ||
    combined.includes("pickup") ||
    combined.includes("tải") ||
    combined.includes("truck") ||
    combined.includes("van")
  ) {
    return "pickup";
  }

  const seatNum = parseInt(seats, 10);
  if (
    combined.includes("kinh doanh") ||
    combined.includes("taxi") ||
    combined.includes("bus") ||
    combined.includes("khách") ||
    (seatNum > 9 && !isNaN(seatNum))
  ) {
    return "commercial";
  }

  return "personal";
}
