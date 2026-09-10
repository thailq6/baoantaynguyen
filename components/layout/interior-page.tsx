import Link from "next/link";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  children: React.ReactNode;
};

export function InteriorPage({ eyebrow, title, intro, children }: Props) {
  return (
    <div className="min-h-screen bg-[#f7fbfa] text-[#103b3b]">
      <SiteHeader />
      <main>
        <section className="border-b border-[#d5e5e2] bg-[#f7fbfa]">
          <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-20">
            <Link href="/" className="inline-flex items-center text-xs text-[#006b66] transition-colors hover:text-[#0b8f86]">
              ← Quay lại trang chủ
            </Link>
            <p className="mt-8 font-mono text-[13px] font-semibold uppercase tracking-[2.52px] text-[#006b66]">
              {eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-[36px] font-normal leading-[1.1] tracking-[-0.9px] text-[#103b3b] lg:text-[48px]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#456464]">
              {intro}
            </p>
          </div>
        </section>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}


