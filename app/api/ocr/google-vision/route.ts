import { NextResponse } from "next/server";

/**
 * Google Cloud Vision API Route for Document OCR
 *
 * Checks for GOOGLE_VISION_API_KEY environment variable.
 * If provided, sends image buffer to Google Vision DOCUMENT_TEXT_DETECTION.
 * Returns structured OCR text or error for client fallback to Tesseract.
 */
export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_VISION_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_VISION_API_KEY not configured" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const visionUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const res = await fetch(visionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64Image },
            features: [
              { type: "DOCUMENT_TEXT_DETECTION" },
              { type: "TEXT_DETECTION" },
            ],
            imageContext: {
              languageHints: ["vi", "en"],
            },
          },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("[Google Vision API] Request failed:", errText);
      return NextResponse.json({ error: "Google Vision API error", details: errText }, { status: 502 });
    }

    const data = await res.json();
    const fullTextAnnotation = data?.responses?.[0]?.fullTextAnnotation?.text;
    const textAnnotation = data?.responses?.[0]?.textAnnotations?.[0]?.description;

    const rawText = fullTextAnnotation || textAnnotation || "";

    return NextResponse.json({
      success: true,
      provider: "google-vision",
      rawText,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Google Vision API Exception]:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
