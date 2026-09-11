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

const KNOWN_BRANDS = [
  "TOYOTA",
  "HONDA",
  "HYUNDAI",
  "FORD",
  "MAZDA",
  "KIA",
  "MITSUBISHI",
  "CHEVROLET",
  "NISSAN",
  "SUZUKI",
  "MERCEDES",
  "BMW",
  "AUDI",
  "LEXUS",
  "ISUZU",
  "VINFAST",
  "YAMAHA",
  "SYM",
  "PEUGEOT",
  "VOLKSWAGEN",
  "SUBARU",
];

const KNOWN_MODELS = [
  "FORTUNER",
  "FORTUNE",
  "HILUX",
  "COROLLA",
  "CAMRY",
  "VIOS",
  "INNOVA",
  "RANGER",
  "EVEREST",
  "SANTAFE",
  "TUCSON",
  "ACCENT",
  "CERATO",
  "MORNING",
  "CX5",
  "CX8",
  "CRV",
  "CITY",
  "XPENDER",
  "TRITON",
  "FADIL",
  "VF8",
  "VF9",
  "SH150I",
  "EXCITER",
  "WAVE",
  "AIR BLADE",
  "VISION",
  "LEAD",
  "JANUS",
];

const KNOWN_COLORS = [
  "Bạc",
  "Bac",
  "Đỏ",
  "Do",
  "Trắng",
  "Trang",
  "Đen",
  "Den",
  "Xanh",
  "Xám",
  "Xam",
  "Vàng",
  "Vang",
  "Nâu",
  "Nau",
  "Cam",
  "Ghi",
];

/**
 * Image Pre-processor & Auto-Cropper
 * 1. Automatically crops the central region (removes outer table margins)
 * 2. Applies Grayscale & Contrast Binarization
 */
async function preprocessImageForOcr(file: File): Promise<string | File> {
  if (typeof window === "undefined") return file;

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        // Crop central 85% to remove table background edges
        const cropX = img.width * 0.05;
        const cropY = img.height * 0.05;
        const cropWidth = img.width * 0.9;
        const cropHeight = img.height * 0.9;

        const targetWidth = Math.min(1600, cropWidth);
        const scale = targetWidth / cropWidth;

        canvas.width = targetWidth;
        canvas.height = cropHeight * scale;

        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Apply contrast binarization
        const contrast = 1.4;
        const factor =
          (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));

        for (let i = 0; i < data.length; i += 4) {
          const avg =
            0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          const c = factor * (avg - 128) + 128;
          const clamped = Math.max(0, Math.min(255, c));

          data[i] = clamped;
          data[i + 1] = clamped;
          data[i + 2] = clamped;
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(file);
      }
    };

    img.onerror = () => resolve(file);
    img.src = url;
  });
}

/**
 * Client-side OCR Document Processor
 */
export async function processOcrDocument(file: File): Promise<OcrResult> {
  let rawText = "";

  if (typeof window !== "undefined") {
    try {
      const processedImage = await preprocessImageForOcr(file);
      const Tesseract = await import("tesseract.js");
      const res = await Tesseract.recognize(processedImage, "vie+eng");
      rawText = res?.data?.text || "";
    } catch (err) {
      console.warn("[OCR] Preprocessing failed, trying original:", err);
      try {
        const Tesseract = await import("tesseract.js");
        const res = await Tesseract.recognize(file, "vie+eng");
        rawText = res?.data?.text || "";
      } catch (fallbackErr) {
        console.warn("[OCR] Fallback recognition failed:", fallbackErr);
      }
    }
  }

  return parseRegistrationDocument(rawText);
}

/* ────────────────────────────────────────────────────────────
 * COMPREHENSIVE RECOVERY PARSER
 * ──────────────────────────────────────────────────────────── */

function parseRegistrationDocument(rawText: string): OcrResult {
  // Normalize dash variants and whitespace
  const normalizedText = rawText
    .replace(/[—–_~]/g, "-")
    .replace(/[ \t]+/g, " ")
    .trim();

  const lines = normalizedText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const fullText = lines.join("\n");

  const licensePlate = extractLicensePlate(fullText);
  const chassisNumber = extractChassisNumber(fullText, lines);
  const engineNumber = extractEngineNumber(fullText, lines);
  const ownerName = extractOwnerName(fullText, lines);
  const address = extractAddress(fullText, lines);
  const vehicleBrand = extractBrand(fullText);
  const vehicleModel = extractModel(fullText);
  const vehicleTypeRaw = extractVehicleTypeRaw(fullText);
  const vehicleColor = extractColor(fullText);
  const engineCapacity = extractEngineCapacity(fullText);
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
 * RECOVERY FIELD EXTRACTORS
 * ──────────────────────────────────────────────────────────── */

/** 1. License Plate (Biển số đăng ký) */
function extractLicensePlate(fullText: string): string {
  // Method 1: Scan normal text with punctuation
  const normalPatterns = [
    /\b([0-9]{2}[A-Z]{1,2}\d?[\s\-\.]*[0-9]{3}[\s\-\.][0-9]{2})\b/gi,
    /\b([0-9]{2}[A-Z]{1,2}\d?[\s\-\.]*[0-9]{4,5})\b/gi,
  ];

  for (const pat of normalPatterns) {
    const matches = fullText.match(pat);
    if (matches) {
      for (const m of matches) {
        if (!m.includes("/")) {
          const cleaned = cleanPlate(m);
          if (cleaned.length >= 7) return cleaned;
        }
      }
    }
  }

  // Method 2: Stripped text search (remove all spaces, dashes, dots to match e.g. 47A34954)
  const stripped = fullText.replace(/[\s\-\.\:\(\)]/g, "").toUpperCase();
  const strippedMatch = stripped.match(/\b([0-9]{2}[A-Z]{1,2}\d{5})\b/i);
  if (strippedMatch) {
    return cleanPlate(strippedMatch[1]);
  }

  const strippedMatch4 = stripped.match(/\b([0-9]{2}[A-Z]{1,2}\d{4})\b/i);
  if (strippedMatch4) {
    return cleanPlate(strippedMatch4[1]);
  }

  return "";
}

/** 2. Owner Name (Tên chủ xe) */
function extractOwnerName(fullText: string, lines: string[]): string {
  // Look near "Tên chủ xe" or "Owner"
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    if (
      /T[eê]n\s*ch[uủ]|Ch[uủ]\s*xe|H[oọ]\s*v[aà]\s*t[eê]n|Owner/i.test(lines[i])
    ) {
      const candidates = [lines[i], lines[i + 1] || "", lines[i + 2] || ""];
      for (const cand of candidates) {
        let text = cand
          .replace(
            /T[eê]n\s*ch[uủ]\s*xe|Ch[uủ]\s*xe|H[oọ]\s*v[aà]\s*t[eê]n/gi,
            ""
          )
          .replace(/\([^)]*\)/g, "")
          .replace(
            /Owner'?s?\s*full\s*name|Owner'?s?\s*name|Owner|Full\s*name/gi,
            ""
          )
          .replace(/[:\-]/g, "")
          .trim();

        // Strip right-side column
        text = text.split(/S[oố]\s*m[aá]y|Engine|S[oố]\s*khung|Chassis/i)[0];
        text = text.replace(/\b[A-Z0-9]{6,18}\b/g, "").trim();

        const nameMatch = text.match(
          /([A-ZÂĂĐÊÔƠƯÀÁẢÃẠẦẤẨẪẬẦẮẲẴẶÈÉẺẼẸỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌỒỐỔỖỘỜỚỞỠỢÙÚỦŨỤỪỨỬỮỰỲÝỶỸỴ]{2,}(?:\s+[A-ZÂĂĐÊÔƠƯÀÁẢÃẠẦẤẨẪẬẦẮẲẴẶÈÉẺẼẸỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌỒỐỔỖỘỜỚỞỠỢÙÚỦŨỤỪỨỬỮỰỲÝỶỸỴ]{2,})+)/i
        );

        if (nameMatch) {
          const name = nameMatch[1].toUpperCase().trim();
          if (
            !/OWNER|FULL|NAME|SOMAY|SOKHUNG|ENGINE|CHASSIS|DIA|CHI|TRONG/i.test(
              name
            ) &&
            name.length >= 4
          ) {
            return name;
          }
        }
      }
    }
  }

  // Fallback: search for top-most 2-4 uppercase Vietnamese words in first 6 lines
  for (let i = 0; i < Math.min(lines.length, 6); i++) {
    const line = lines[i];
    if (
      !/GI[AẤ]Y|CH[UỨ]NG|NH[AẬ]N|[DĐ][AĂ]NG|K[YÝ]|C[AÀ]\s*V[EẸ]T|C[UỤ]C|B[OỘ]/i.test(
        line
      )
    ) {
      const match = line.match(
        /\b([A-ZÂĂĐÊÔƠƯÀÁẢÃẠẦẤẨẪẬẦẮẲẴẶÈÉẺẼẸỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌỒỐỔỖỘỜỚỞỠỢÙÚỦŨỤỪỨỬỮỰỲÝỶỸỴ]{2,}(?:\s+[A-ZÂĂĐÊÔƠƯÀÁẢÃẠẦẤẨẪẬẦẮẲẴẶÈÉẺẼẸỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌỒỐỔỖỘỜỚỞỠỢÙÚỦŨỤỪỨỬỮỰỲÝỶỸỴ]{2,})+)\b/i
      );
      if (match) {
        const candidate = match[1].toUpperCase().trim();
        if (
          !/OWNER|FULL|NAME|SOMAY|SOKHUNG|ENGINE|CHASSIS|DIA|CHI|TRONG/i.test(
            candidate
          ) &&
          candidate.length >= 5
        ) {
          return candidate;
        }
      }
    }
  }

  return "";
}

/** 3. Seat Count (Số chỗ ngồi) */
function extractCapacitySeats(fullText: string, lines: string[]): string {
  // Pattern 1: Digits near seat keywords e.g. "7 chỗ", "7 đứng", "5 chỗ", "Sitting: 7"
  const patterns = [
    /(?:S[oố]\s*ch[oỗ]|Sitting|Seats?|Ch[oỗ]\s*ng[oồ]i|Ng[oồ]i)[^\d]*(\d{1,2})/i,
    /\b(\d{1,2})\s*(?:ch[oỗ]|đ[ứu]ng|ng[oồ]i|gh[eế]|seats?|stand|dung)\b/i,
  ];

  for (const pat of patterns) {
    const m = fullText.match(pat);
    if (m && m[1]) {
      const seatNum = parseInt(m[1], 10);
      if (seatNum >= 1 && seatNum <= 80) {
        return m[1];
      }
    }
  }

  for (const line of lines) {
    if (/ch[oỗ]|Sitting|Seats|đứng/i.test(line)) {
      const match = line.match(/\b([1-9]|1[0-9]|2[0-9]|4[5-9])\b/);
      if (match) return match[1];
    }
  }

  return "";
}

/** 4. Chassis Number (Số khung) */
function extractChassisNumber(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    if (/S[oố]\s*khung|Chassis|VIN/i.test(lines[i])) {
      const chunk = `${lines[i]} ${lines[i + 1] || ""}`;
      const matches = chunk.match(/\b([A-Z0-9]{8,18})\b/gi);
      if (matches) {
        for (const m of matches) {
          const u = m.toUpperCase();
          if (
            /\d/.test(u) &&
            /[A-Z]/.test(u) &&
            !/CHASSIS|ADDRESS|OWNER|ENGINE|MODEL/i.test(u)
          ) {
            return u;
          }
        }
      }
    }
  }

  const matches = fullText.match(/\b([A-Z0-9]{9,18})\b/gi);
  if (matches) {
    for (const m of matches) {
      const u = m.toUpperCase();
      if (
        /\d/.test(u) &&
        /[A-Z]/.test(u) &&
        !/CHASSIS|ADDRESS|OWNER|ENGINE|MODEL/i.test(u)
      ) {
        return u;
      }
    }
  }
  return "";
}

/** 5. Engine Number (Số máy) */
function extractEngineNumber(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    if (/S[oố]\s*m[aá]y|Engine/i.test(lines[i])) {
      const chunk = `${lines[i]} ${lines[i + 1] || ""} ${lines[i + 2] || ""}`;
      const matches = chunk.match(/\b([A-Z0-9]{6,16})\b/gi);
      if (matches) {
        for (const m of matches) {
          const u = m.toUpperCase();
          if (
            /\d/.test(u) &&
            !/ENGINE|NUMBER|SOMAY|SMAY|OWNER|FULL|NAME|ADDRESS/i.test(u)
          ) {
            return u;
          }
        }
      }
    }
  }

  return "";
}

/** 6. Address (Địa chỉ) */
function extractAddress(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    if (/[ĐD][iị]a\s*ch[iỉ]|Address/i.test(lines[i])) {
      const cand = `${lines[i]} ${lines[i + 1] || ""}`;
      let text = cand
        .replace(/[ĐD][iị]a\s*ch[iỉ]/gi, "")
        .replace(/\([^)]*\)/g, "")
        .replace(/Address/gi, "")
        .replace(/[:\-]/g, "")
        .trim();

      // Clean leading OCR noise
      text = text.replace(/^[i¥\d\sTRONGSoerÑIilhh1aTT|]+/i, "").trim();

      text = text.replace(/S[oố]\s*khung.*$/i, "").trim();
      text = text.replace(/\b[A-Z0-9]{8,18}\b/g, "").trim();
      text = text.replace(/PL\s*".*$/i, "").trim();
      text = text.replace(/\s+/g, " ").trim();

      if (text.length >= 6 && !/ADDRESS/i.test(text)) {
        return text;
      }
    }
  }

  // Fallback scan line containing "Thôn" / "Xã" / "Phường" / "Quận" / "Huyện"
  for (const line of lines) {
    if (
      /Thôn|Xã|Phường|Quận|Huyện|Tỉnh|Thành|Ea\s*Tiêu|Cư\s*Kuin/i.test(line)
    ) {
      let cleaned = line.replace(/^[i¥\d\sTRONGSoerÑIilhh1aTT|]+/i, "").trim();
      cleaned = cleaned.replace(/PL\s*".*$/i, "").trim();
      if (cleaned.length >= 6) return cleaned;
    }
  }

  return "";
}

/** 7. Brand (Nhãn hiệu) */
function extractBrand(fullText: string): string {
  const upper = fullText.toUpperCase();
  for (const b of KNOWN_BRANDS) {
    if (upper.includes(b)) return b;
  }
  return "";
}

/** 8. Model (Số loại) */
function extractModel(fullText: string): string {
  const upper = fullText.toUpperCase();
  for (const m of KNOWN_MODELS) {
    if (upper.includes(m)) {
      if (m === "FORTUNE") return "FORTUNER";
      return m;
    }
  }
  return "";
}

/** 9. Vehicle Type Raw (Loại xe) */
function extractVehicleTypeRaw(fullText: string): string {
  const lower = fullText.toLowerCase();
  if (lower.includes("bán tải") || lower.includes("pickup"))
    return "Ô tô bán tải";
  if (lower.includes("ô tô con") || lower.includes("chở người"))
    return "Ô tô con";
  if (lower.includes("mô tô") || lower.includes("xe máy"))
    return "Mô tô 2 bánh";
  if (lower.includes("tải")) return "Xe ô tô tải";
  return "";
}

/** 10. Color (Màu sơn) */
function extractColor(fullText: string): string {
  for (const c of KNOWN_COLORS) {
    const reg = new RegExp(`\\b${c}\\b`, "i");
    if (reg.test(fullText)) {
      if (c.toLowerCase().includes("bac")) return "Bạc";
      if (c.toLowerCase().includes("do")) return "Đỏ";
      if (c.toLowerCase().includes("trang")) return "Trắng";
      if (c.toLowerCase().includes("den")) return "Đen";
      if (c.toLowerCase().includes("xam")) return "Xám";
      if (c.toLowerCase().includes("vang")) return "Vàng";
      if (c.toLowerCase().includes("nau")) return "Nâu";
      return c;
    }
  }
  return "";
}

/** 11. Capacity (Dung tích) */
function extractEngineCapacity(fullText: string): string {
  const m = fullText.match(
    /(?:Dung\s*t[ií]ch|Capacity|cc|cm3)\s*[:\-]?\s*(\d{2,5})/i
  );
  return m ? m[1] : "";
}

/** 12. Registration Date (Ngày đăng ký) */
function extractRegistrationDate(fullText: string, lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    if (/Đ[aă]ng\s*k[yý]|First\s*regist/i.test(lines[i])) {
      const chunk = `${lines[i]} ${lines[i + 1] || ""} ${lines[i + 2] || ""}`;
      const match = chunk.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/);
      if (match) return match[1];
    }
  }

  const allDates = [...fullText.matchAll(/\b(\d{2}\/\d{2}\/\d{4})\b/g)];
  if (allDates.length > 0) {
    return allDates[0][1];
  }

  return "";
}

/* ────────────────────────────────────────────────────────────
 * SANITIZATION UTILITIES
 * ──────────────────────────────────────────────────────────── */

function cleanPlate(value: string): string {
  if (!value) return "";
  const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  }
  if (cleaned.length === 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
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
