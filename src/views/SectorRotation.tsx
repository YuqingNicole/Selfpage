"use client";

import { useEffect } from "react";

export function SectorRotation({ sector }: { sector?: string }) {
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
