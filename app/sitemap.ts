import type { MetadataRoute } from "next";
import { insuranceProducts } from "../config/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://baoantaynguyen.example";
  const pages = [
    "/",
    "/san-pham",
    "/bao-gia",
    "/gioi-thieu",
    "/lien-he",
    "/boi-thuong",
    "/cau-hoi",
    "/cam-nang",
    "/chinh-sach-bao-mat",
    "/dieu-khoan-su-dung",
    ...insuranceProducts.map(([slug]) => `/san-pham/${slug}`),
  ];
  return pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
