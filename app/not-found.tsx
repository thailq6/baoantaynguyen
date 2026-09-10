import Link from "next/link";
export default function NotFound(){return <main className="grid min-h-screen place-items-center bg-[var(--cream)] px-6 text-center"><div><p className="eyebrow">404 · KHÔNG TÌM THẤY</p><h1 className="mt-4 font-display text-6xl text-[var(--forest)]">Trang này chưa có.</h1><p className="mx-auto mt-5 max-w-md text-sm text-[var(--muted)]">Quay về trang chủ để tiếp tục tìm hiểu sản phẩm phù hợp.</p><Link className="mt-8 inline-flex rounded bg-[var(--terracotta)] px-5 py-3 text-xs font-bold text-white" href="/">Về trang chủ ↗</Link></div></main>}

