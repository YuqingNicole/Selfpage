"use client";

export function SectorRotation() {
  return (
    <iframe
      src="/work/sector-rotation/index.html"
      style={{
        position: "fixed",
        top: 65, // 站点固定头部高度 (h-16 + 下边框)，避免遮挡看板内容
        left: 0,
        width: "100%",
        height: "calc(100% - 65px)",
        border: "none",
        zIndex: 10,
      }}
      title="美股板块轮动看板"
    />
  );
}
