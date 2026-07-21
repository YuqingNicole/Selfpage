"use client";

import { useEffect } from "react";

export function SectorRotation({ sector, topOffset = 65 }: { sector?: string; topOffset?: number }) {
  // 监听 iframe 内看板打开/关闭板块详情的消息，同步地址栏路由
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type !== "sector-nav") return;
      const tk = typeof e.data.sector === "string" ? e.data.sector : null;
      const url = tk ? `/work/sector-rotation/${tk}` : "/work/sector-rotation";
      if (window.location.pathname !== url) {
        window.history.replaceState(null, "", url);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <iframe
      src={`/work/sector-rotation/index.html${sector ? `?sector=${sector}` : ""}`}
      style={{
        position: "fixed",
        top: topOffset,
        left: 0,
        width: "100%",
        height: `calc(100% - ${topOffset}px)`,
        border: "none",
        zIndex: 10,
      }}
      title="美股板块轮动看板"
    />
  );
}
