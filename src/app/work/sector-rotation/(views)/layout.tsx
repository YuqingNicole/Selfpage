"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/work/sector-rotation",          label: "板块看板" },
  { href: "/work/sector-rotation/screener", label: "个股筛选" },
];

export default function SectorRotationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      style={{
        position: "fixed",
        top: 64,        // below site header (h-16)
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        background: "#f7f8f4",
        zIndex: 10,
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          flexShrink: 0,
          borderBottom: "2px solid #080a0f",
        }}
      >
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "0.6875rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "9px 22px",
                borderRight: "1px solid #d9ded4",
                background: active ? "#080a0f" : "transparent",
                color: active ? "#f7f8f4" : "#7b8491",
                fontWeight: active ? 600 : 400,
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Content area */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}
