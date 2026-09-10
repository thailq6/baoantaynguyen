import { describe, expect, it } from "vitest";
import { brandConfig } from "../../config/brand";

describe("brand configuration", () => {
  it("exposes transparent brand contact placeholders and disclaimer", () => {
    expect(brandConfig.name).toBe("Bảo An Tây Nguyên");
    expect(brandConfig.contact.hotline).toBe("[HOTLINE]");
    expect(brandConfig.legalDisclaimer).toContain("ước tính minh họa");
  });
});
