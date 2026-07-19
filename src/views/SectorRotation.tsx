"use client";

export function SectorRotation() {
  return (
    <iframe
      src="/work/sector-rotation/index.html"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
        zIndex: 10,
      }}
      title="美股板块轮动看板"
    />
  );
}
