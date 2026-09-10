import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://baoantaynguyen.example"; return ["/","/san-pham","/bao-gia","/gioi-thieu","/lien-he","/boi-thuong","/cau-hoi","/cam-nang","/chinh-sach-bao-mat","/dieu-khoan-su-dung"].map(path=>({url:`${base}${path}`,lastModified:new Date()})); }

