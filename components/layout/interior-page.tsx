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
    <div className="min-h-screen bg-[#f4f8fd] text-[#0b2341]">
      <SiteHeader />
      <main>
        <section className="border-b border-[#cce0f5] bg-[#f4f8fd]">
          <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24">
            <Link href="/" className="inline-flex items-center text-[14px] text-[#0066cc] transition-colors hover:text-[#0052b3]">
              ← Quay lại trang chủ
            </Link>
            <p className="mt-8 font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-[#0066cc]">
              {eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-[42px] font-bold leading-[1.08] tracking-[-0.025em] text-[#0b2341] sm:text-[54px] lg:text-[62px]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-[1.5] text-[#4a6785]">
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
