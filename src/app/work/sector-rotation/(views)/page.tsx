export const metadata = {
  title: "美股板块轮动看板 — Nicole",
  description: "US sector rotation dashboard: GICS 板块收益热力图、RRG 相对强弱轮转、超额收益曲线。",
};

export default function SectorRotationPage() {
  return (
    <iframe
      src="/work/sector-rotation/index.html"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
      title="美股板块轮动看板"
    />
  );
}
