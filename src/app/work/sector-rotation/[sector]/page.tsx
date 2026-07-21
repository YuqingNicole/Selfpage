import { notFound } from "next/navigation";
import { SectorRotation } from "@/views/SectorRotation";

const NAMES: Record<string, string> = {
  XLK: "科技", XLC: "通信服务", XLY: "非必需消费", XLF: "金融",
  XLI: "工业", XLB: "原材料", XLE: "能源", XLV: "医疗保健",
  XLP: "必需消费", XLU: "公用事业", XLRE: "房地产",
};

type Params = { params: Promise<{ sector: string }> };

export async function generateMetadata({ params }: Params) {
  const { sector } = await params;
  const tk = sector.toUpperCase();
  const name = NAMES[tk];
  return {
    title: `${name ?? tk}板块详情 — Nicole`,
    description: name
      ? `美股${name}板块 (${tk}) 详情: 分周期收益、近一年走势、相关 ETF 与代表个股行情。`
      : "美股板块详情",
  };
}

export default async function SectorDetailPage({ params }: Params) {
  const { sector } = await params;
  const tk = sector.toUpperCase();
  if (!(tk in NAMES)) notFound();
  return <SectorRotation sector={tk} />;
}
