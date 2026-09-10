"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="grid min-h-screen place-items-center bg-[var(--cream)] px-6 text-center"><div><p className="eyebrow">CÓ LỖI XẢY RA</p><h1 className="mt-4 font-display text-5xl text-[var(--forest)]">Thử lại sau ít phút.</h1><button className="mt-8 rounded bg-[var(--terracotta)] px-5 py-3 text-xs font-bold text-white" onClick={reset}>Tải lại ↻</button></div></main>}

