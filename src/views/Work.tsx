"use client";

export function Work() {
  return (
    <iframe
      src="/careers.html"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
        zIndex: 10,
      }}
      title="ARTi Careers"
    />
  );
}
