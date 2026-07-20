import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "个股全景筛选 — 美股板块轮动看板 · Nicole",
  description: "按板块纵向筛选，按时间跨度横向对比 88 只个股与 41 只主题 ETF 的收益热力矩阵。",
};

export default function ScreenerPage() {
  return (
    <iframe
      src="/work/sector-rotation/screener.html"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
      title="个股全景筛选"
    />
  );
}
