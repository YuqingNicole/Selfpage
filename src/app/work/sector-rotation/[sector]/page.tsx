import Link from "next/link";

import { SectorRotation } from "@/views/SectorRotation";
import { symbolToChains, chainDefs } from "@/app/ai-supply-chain-us/shared";

const GICS_NAMES: Record<string, string> = {
  XLK: "科技", XLC: "通信服务", XLY: "非必需消费", XLF: "金融",
  XLI: "工业", XLB: "原材料", XLE: "能源", XLV: "医疗保健",
  XLP: "必需消费", XLU: "公用事业", XLRE: "房地产",
};

const CHAIN_BAR_HEIGHT = 44;
const HEADER_HEIGHT = 65;

type Params = { params: Promise<{ sector: string }> };

export async function generateMetadata({ params }: Params) {
  const { sector } = await params;
  const tk = sector.toUpperCase();
  const name = GICS_NAMES[tk];
  return {
    title: `${name ?? tk}${name ? "板块" : ""}详情 — Nicole`,
    description: name
      ? `美股${name}板块 (${tk}) 详情: 分周期收益、近一年走势、相关 ETF 与代表个股行情。`
      : `${tk} 个股行情`,
  };
}

export default async function SectorDetailPage({ params }: Params) {
  const { sector } = await params;
  const tk = sector.toUpperCase();

  const isGicsSector = tk in GICS_NAMES;

  if (isGicsSector) {
    // ETF 板块页：直接渲染，不加 AI 链条
    return <SectorRotation sector={tk} topOffset={HEADER_HEIGHT} />;
  }

  // 个股 quote 页：查该股票属于哪些 AI 链
  const chainSlugs = symbolToChains[tk] ?? [];
  const chains = chainSlugs
    .map((slug) => chainDefs.find((c) => c.slug === slug))
    .filter(Boolean) as typeof chainDefs;
  const hasChains = chains.length > 0;
  const topOffset = HEADER_HEIGHT + (hasChains ? CHAIN_BAR_HEIGHT : 0);

  return (
    <>
      {hasChains && (
        <div
          style={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            right: 0,
            height: CHAIN_BAR_HEIGHT,
            zIndex: 20,
            background: "#FFFFFF",
            borderBottom: "1px solid #EAECF0",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 16px",
            overflowX: "auto",
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: '#98A2B3', whiteSpace: 'nowrap', flexShrink: 0 }}>
            AI 产业链
          </span>
          {chains.map((chain) => (
            <Link
              key={chain.slug}
              href={`/ai-supply-chain-us/${chain.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                color: "#475467",
                background: "#F9FAFB",
                border: "1px solid #EAECF0",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {chain.shortTitle} ↗
            </Link>
          ))}
          <span style={{ fontSize: 10, color: '#C0C7D4', marginLeft: 4, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {tk} 所属 AI 供应链
          </span>
        </div>
      )}
      <iframe
        src={`/work/sector-rotation/quote.html?t=${tk}`}
        style={{
          position: "fixed",
          top: topOffset,
          left: 0,
          width: "100%",
          height: `calc(100% - ${topOffset}px)`,
          border: "none",
          zIndex: 10,
        }}
        title={`${tk} 个股详情`}
      />
    </>
  );
}
