export const metadata = {
  title: "DUI × Innovation Efficiency — Research Dashboard",
  description:
    "Interactive panel regression diagnostics: decoupling uncertainty and innovation efficiency in Chinese A-share firms (2013–2024).",
};

export default function DUIDashboardPage() {
  return (
    <div
      style={{
        position: "fixed",
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
      }}
    >
      <iframe
        src="/research/dui-dashboard/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        title="DUI × Innovation Efficiency Dashboard"
      />
    </div>
  );
}
