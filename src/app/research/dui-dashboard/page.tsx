export const metadata = {
  title: "DUI × Innovation Efficiency — Research Dashboard",
  description:
    "Interactive panel regression diagnostics: decoupling uncertainty and innovation efficiency in Chinese A-share firms (2013–2024).",
};

export default function DUIDashboardPage() {
  return (
    <iframe
      src="/research/dui-dashboard/index.html"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
      title="DUI × Innovation Efficiency Dashboard"
    />
  );
}
