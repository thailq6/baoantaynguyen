import type { OcrResult } from "./ocr";

const STORAGE_KEY = "batn_saved_ocr_result";
const EVENT_NAME = "batn_ocr_updated";

/** Save OCR result to localStorage and notify all active forms */
export function saveOcrResult(data: OcrResult) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }));
  } catch (err) {
    console.warn("[OCR Store] Failed to save OCR result:", err);
  }
}

/** Retrieve current saved OCR result from localStorage */
export function getSavedOcrResult(): OcrResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OcrResult;
  } catch (err) {
    console.warn("[OCR Store] Failed to read saved OCR result:", err);
    return null;
  }
}

/** Clear saved OCR state */
export function clearSavedOcrResult() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }));
  } catch (err) {
    console.warn("[OCR Store] Failed to clear saved OCR result:", err);
  }
}

/** Subscribe to OCR updates in real-time */
export function subscribeOcrResult(callback: (data: OcrResult | null) => void) {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    callback(detail || null);
  };

  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
