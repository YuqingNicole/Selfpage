import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  return {
    title: `${ticker.toUpperCase()} — 美股板块轮动看板 · Nicole`,
  };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  return (
    <iframe
      src={`/work/sector-rotation/quote.html?t=${ticker.toUpperCase()}`}
      style={{
        position: "fixed",
        top: 65,
        left: 0,
        width: "100%",
        height: "calc(100% - 65px)",
        border: "none",
        zIndex: 10,
      }}
      title={`${ticker.toUpperCase()} 个股详情`}
    />
  );
}
