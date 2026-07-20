# RFC: 美股板块轮动看板 · 全面设计文档

**状态**: Draft  
**日期**: 2026-07-20  
**路由**: `/work/sector-rotation` · `/work/sector-rotation/[ticker]`  
**数据脚本**: `scripts/sector-rotation/fetch_data.py` → `public/work/sector-rotation/data.js`

---

## 目录

1. [背景与目标](#1-背景与目标)
2. [现有架构](#2-现有架构)
3. [数据模型](#3-数据模型)
4. [页面结构与组件](#4-页面结构与组件)
5. [待更新事项](#5-待更新事项)
6. [技术决策记录](#6-技术决策记录)
7. [文件索引](#7-文件索引)

---

## 1. 背景与目标

### 1.1 用途

该看板用于追踪美股 11 个 GICS 板块（SPDR ETF：XLK / XLC / XLY / XLF / XLI / XLB / XLE / XLV / XLP / XLU / XLRE）相对 SPY 的轮动状态，辅助中长线配置决策。

### 1.2 核心问题

| 问题 | 对应视图 |
|------|----------|
| 哪个板块近期表现最强/最弱？ | 热力图 + KPI 行 |
| 各板块当前处于轮动周期的哪个阶段？ | RRG 散点图 |
| 周期股 vs 防御股情绪如何？ | KPI — 风险敞口 |
| 具体到个股/ETF 层面细节？ | 板块 modal → 标的 quote 页 |

### 1.3 设计约束

- 数据由 Python 脚本每日生成静态 JSON，无运行时后端
- 嵌入方式为 Next.js iframe 壳层 + 纯 HTML/JS 内容页，保持数据脚本与前端独立
- 字体: Bricolage Grotesque / Hanken Grotesk / IBM Plex Mono；图表: Apache ECharts (本地 vendor)

---

## 2. 现有架构

### 2.1 路由层（Next.js App Router）

```
src/app/work/sector-rotation/
├── page.tsx               # 渲染 <SectorRotation /> 视图组件
└── [ticker]/
    └── page.tsx           # 动态路由，渲染 iframe → quote.html?t={TICKER}
```

**`page.tsx`** — 静态元数据 + 单组件渲染：

```tsx
// src/app/work/sector-rotation/page.tsx
export const metadata = {
  title: "美股板块轮动看板 · Nicole",
  description: "11 GICS 板块相对强弱、RRG 轮动周期与个股深度看板",
};
export default function Page() {
  return <SectorRotation />;
}
```

**`[ticker]/page.tsx`** — 异步 params (Next.js 15)，动态标题，固定 iframe：

```tsx
// src/app/work/sector-rotation/[ticker]/page.tsx
export async function generateMetadata({ params }) {
  const { ticker } = await params;
  return { title: `${ticker.toUpperCase()} — 美股板块轮动看板 · Nicole` };
}
export default async function Page({ params }) {
  const { ticker } = await params;
  return (
    <iframe
      src={`/work/sector-rotation/quote.html?t=${ticker.toUpperCase()}`}
      style={{ position: "fixed", top: 65, width: "100%",
               height: "calc(100% - 65px)", border: "none", zIndex: 10 }}
    />
  );
}
```

### 2.2 视图组件

```tsx
// src/views/SectorRotation.tsx
"use client";
export default function SectorRotation() {
  return (
    <iframe
      src="/work/sector-rotation/index.html"
      style={{ position: "fixed", top: 65, width: "100%",
               height: "calc(100% - 65px)", border: "none", zIndex: 10 }}
    />
  );
}
```

> 所有实际渲染逻辑在 `/public/work/sector-rotation/` 内的纯 HTML 文件中。

### 2.3 静态资产

```
public/work/sector-rotation/
├── data.js              # window.SECTOR_DATA = {...}，由 Python 脚本生成
├── index.html           # 主看板（712 行）
├── quote.html           # 标的详情页（429 行）
└── vendor/
    └── echarts.min.js   # Apache ECharts 本地副本
```

### 2.4 数据流

```
fetch_data.py
    ↓ yfinance / 其他数据源
data.js  (window.SECTOR_DATA)
    ↓ <script src="data.js">
index.html          → 板块热力图 / RRG / 超额收益 / 横向对比
    ↓ window.top.location.href = /work/sector-rotation/AAPL
[ticker]/page.tsx   → quote.html?t=AAPL
    ↓ QMAP = { ...stocks, ...etfs }
quote.html          → 标的详情（走势图 / 技术面 / 基本面 / 同板块对比）
```

---

## 3. 数据模型

### 3.1 顶层结构 (`window.SECTOR_DATA`)

```js
{
  asof:      "2026-07-17",       // 数据截止日期 (YYYY-MM-DD)
  generated: "2026-07-20 06:56", // 生成时间戳

  spy:     SPYSnapshot,
  horizons: Horizon[],           // ["1周","1月","3月","6月","YTD","1年"]
  sectors:  SectorEntry[],       // 11 个板块 ETF
  kpi:      KPI,
  rrg:      RRGData,
  excess:   ExcessData,
  px:       PxData,
  hist_dates: string[],          // ~252 个交易日 "MM-DD"
  stocks:   { [sectorTicker]: StockEntry[] },
  etfs:     { [sectorTicker]: StockEntry[] },
}
```

### 3.2 类型定义

```ts
type Horizon = "1周" | "1月" | "3月" | "6月" | "YTD" | "1年";

interface Returns {
  "1周": number; "1月": number; "3月": number;
  "6月": number; "YTD": number; "1年": number;
}

interface SPYSnapshot {
  price:   number;
  day_chg: number;   // %
  returns: Returns;
}

interface SectorEntry {
  ticker:  string;           // "XLK"
  name:    string;           // "科技"
  group:   "cyc" | "def";   // 周期 / 防御
  price:   number;
  day_chg: number;
  returns: Returns;
}

interface KPI {
  best:        { ticker: string; name: string; ret: number };
  worst:       { ticker: string; name: string; ret: number };
  risk_spread: number;   // 周期股 − 防御股 1月收益差
  dispersion:  number;   // 板块间 std dev（轮动强度）
  beat_spy:    number;   // 1月跑赢 SPY 的板块数
  total:       number;   // 11
}

interface RRGData {
  [sectorTicker: string]: [rs_ratio: number, rs_momentum: number, date: string][];
  // 每个板块 12 个点（12周轨迹）
}

interface ExcessData {
  dates:   string[];             // ~253 个 "MM-DD"
  spy_cum: number[];             // SPY 累计收益（基点为 0）
  series:  { [sectorTicker: string]: number[] };  // 超额收益 vs SPY
}

interface PxData {
  [sectorTicker: string]: number[];  // ~252 日收盘价
}

interface StockEntry {
  t:    string;  n: string;     // ticker, 中文名
  p:    number;  chg: number;   // 价格, 日涨跌幅%
  w1:   number;  m1:  number;   // 1周%, 1月%
  m3:   number;  m6:  number;   // 3月%, 6月%
  ytd:  number;  y1:  number;   // YTD%, 1年%
  vr:   number;                 // 量比
  vol:  number;  tvr: number;   // 成交量(股), 成交额($)
  h52:  number;  l52: number;   // 52周高/低
  ma20: number;  ma50: number;  ma200: number;
  vola: number;                 // 年化波动率%
  hist: number[];               // ~252日价格历史
  full: string;  ind: string;   // 全称, 行业
  mc?:  number;  aum?: number;  // 市值 / AUM（ETF）
  // 基本面（个股）
  pe?:  number;  fpe?: number;  pb?:  number;
  dy?:  number;  beta?: number; eps?: number;
  pm?:  number;  roe?: number;  tgt?: number;
}
```

### 3.3 板块颜色映射

```js
const SECTOR_COLOR = {
  XLK:  "#3157ff",  // 科技
  XLC:  "#7c70ec",  // 通信
  XLY:  "#e66b00",  // 可选消费
  XLF:  "#00a676",  // 金融
  XLI:  "#7b8491",  // 工业
  XLB:  "#b08900",  // 材料
  XLE:  "#d32f2f",  // 能源
  XLV:  "#9c27b0",  // 医疗
  XLP:  "#0d87a5",  // 必选消费
  XLU:  "#558b2f",  // 公用事业
  XLRE: "#8d6e63",  // 房地产
};
```

---

## 4. 页面结构与组件

### 4.1 `index.html` — 主看板

#### 布局骨架

```
.page (max-width: 1480px)
├── .masthead
│   ├── h1 "美股板块轮动看板"
│   ├── .spy-price + .spy-chip (价格 + 日涨跌)
│   └── .asof (数据日期)
├── .kpi-row (4 格)
│   ├── best  — 近月最强板块
│   ├── worst — 近月最弱板块
│   ├── risk_spread — 周期/防御情绪
│   └── dispersion  — 轮动强度
├── .pill-bar (11 个板块 pill，点击打开 modal)
└── .chart-grid (12 列 CSS grid)
    ├── #cHeat  (span 7) — 热力图
    ├── #cRRG   (span 5) — RRG 散点
    ├── #cEx    (span 7) — 超额收益线图
    └── #cBar   (span 5) — 横向对比柱图（含周期切换 tabs）
```

#### 热力图 (`#cHeat`)

- 坐标轴: Y = 11 个板块（按 1月收益降序），X = 6 个时间跨度
- 每列独立色阶（正值红色/上涨，负值绿色/下跌，中国市场惯例）
- 单元格显示收益率百分比；点击单元格或板块名打开 modal

#### RRG 散点图 (`#cRRG`)

- X 轴: RS-Ratio（相对强度），Y 轴: RS-Momentum（动量）
- 四象限: 领先（右上）/ 改善（左上）/ 落后（左下）/ 转弱（右下）
- 每个板块绘制 12 周轨迹线，终点为最新位置
- 轨迹点透明度随时间递减（最新点不透明）

#### 超额收益线图 (`#cEx`)

- X 轴: ~253 个交易日（约 1 年），Y 轴: 相对 SPY 的累计超额收益%
- SPY 基线为 0（虚线）
- 悬浮 tooltip 显示各板块超额值

#### 横向对比柱图 (`#cBar`)

- 水平柱状图，板块按选定周期收益排序
- 顶部 tab 切换时间跨度（1周/1月/3月/6月/YTD/1年）
- 虚线标注 SPY 同期收益
- 点击板块名打开 modal

#### 板块 Modal

```
.modal-overlay
└── .modal-panel (slide-in, 右侧或底部)
    ├── .modal-header (板块名 + 关闭按钮)
    ├── .modal-returns (板块 vs SPY vs 超额，6个时间跨度)
    ├── #mChart (1年价格走势 ECharts 实例)
    ├── .modal-etfs  (本板块相关 ETF 表格，点击行 → quote 页)
    └── .modal-stocks (本板块代表性个股表格，点击行 → quote 页)
```

跳转方式: `window.top.location.href = "/work/sector-rotation/" + ticker`

#### 响应式断点

| 断点 | 变化 |
|------|------|
| < 1080px | KPI 行 2列 |
| < 768px  | chart-grid 单列 |
| < 640px  | modal 变为底部 sheet（`transform: translateY`） |

---

### 4.2 `quote.html` — 标的详情页

#### URL 参数解析

```js
const params = new URLSearchParams(location.search);
const ticker = params.get("t")?.toUpperCase();
// 数据来源：合并 stocks + etfs 所有板块 → QMAP[ticker]
const QMAP = {};
Object.values(SECTOR_DATA.stocks).flat().forEach(s => QMAP[s.t] = s);
Object.values(SECTOR_DATA.etfs).flat().forEach(s => QMAP[s.t] = s);
```

#### 布局骨架

```
.page (max-width: 1200px)
├── .breadcrumb  (看板 / {板块名} / {ticker})
├── .qhead
│   ├── .display-name + .ticker-badge
│   ├── .badges (个股|ETF, 板块名, 周期|防御)
│   └── .price-row (.price + .chg-chip)
├── .returns-strip (8格: 1周/1月/3月/6月/YTD/1年/量比/成交额)
└── .body-grid (2/3 + 1/3)
    ├── .main-col
    │   ├── #qChart (1年价格线图)
    │   ├── .tech-grid (技术指标 8格)
    │   └── .fund-grid (基本面 12格)
    └── .sidebar
        ├── .peers-list (同板块同类型标的链接)
        └── .sector-returns (板块 vs SPY 6期对比表)
```

#### 技术指标格

| 字段 | 说明 |
|------|------|
| 52周高 / 低 | h52 / l52 |
| 距高点 | `(price/h52 - 1) * 100` % |
| MA20/50/200 | 均线值 + 上方/下方信号 |
| 年化波动率 | vola % |
| 成交量 | vol（股） |
| 成交额 | tvr（美元） |

#### 基本面格（个股）

PE · 远期PE · PB · 股息率 · Beta · EPS · 净利率 · ROE · 分析师目标价

ETF 显示：AUM · 全称 · 行业（跟踪指数）

#### 错误状态

```html
<div class="error-state">
  找不到标的 "<span id="notFoundTicker"></span>" —
  <a href="javascript:history.back()">← 返回看板</a>
</div>
```

---

## 5. 待更新事项

### 5.1 功能增强

#### P0 — 数据刷新指示

当前 `asof` 日期只显示在 masthead，但没有视觉警告标识数据是否过期。

**建议**: 在 masthead 增加过期检测，若 `asof` 距今超过 2 个交易日，显示橙色警告 chip：

```js
const asofMs = new Date(SECTOR_DATA.asof).getTime();
const staleThreshold = 2 * 24 * 60 * 60 * 1000; // 2天
if (Date.now() - asofMs > staleThreshold) {
  document.querySelector(".asof").classList.add("stale");
}
```

```css
.asof.stale { color: var(--warn); }
.asof.stale::after { content: " ⚠ 数据可能未更新"; }
```

#### P0 — quote.html 手机端布局

当前 `.body-grid` 用固定 `grid-template-columns: 1fr 320px`，在 < 768px 时 sidebar 会溢出。

**建议**:
```css
@media (max-width: 768px) {
  .body-grid { grid-template-columns: 1fr; }
  .sidebar { order: -1; }  /* 将同板块对比上移至价格图前 */
}
```

#### P1 — RRG 历史回放

当前 RRG 只显示最近 12 周静态轨迹。增加时间滑块允许回看历史轮动路径。

**接口需求**: `data.js` 中 `rrg[ticker]` 已有 12 周的 `[rs_ratio, rs_momentum, date]` 数组，滑块可直接截取前 N 点渲染。无需修改数据结构。

```js
// 控制显示前 k 周（1 ≤ k ≤ 12）
function renderRRG(k = 12) {
  const trailData = Object.entries(SECTOR_DATA.rrg).map(([ticker, pts]) => ({
    ticker,
    trail: pts.slice(0, k),
  }));
  // ... rebuild ECharts series
}
```

#### P1 — 板块 Modal 中的超额收益迷你图

当前 modal 只有一个 1年价格图。在返回表格旁增加一条超额收益迷你折线（sparkline），让用户无需回到主看板就能看到相对 SPY 的走势。

**实现**: 在 modal 里初始化一个 150px 高的 ECharts 实例，使用 `excess.series[ticker]` 数据。

#### P2 — 全局搜索

在 pill bar 旁增加搜索框，支持按 ticker 或中文名搜索 `QMAP` 中的所有 88 只个股 + 41 只 ETF，直接跳转 quote 页。

```js
const SEARCH_INDEX = Object.values(QMAP).map(s => ({
  t: s.t, label: `${s.t} · ${s.n}`,
  href: `/work/sector-rotation/${s.t}`
}));
```

#### P2 — KPI 行 tooltip

`risk_spread` 和 `dispersion` 对初次使用者不直觉。建议在 KPI 格标题加 `?` 图标，hover 显示计算说明：

- `risk_spread`: 周期股板块（XLK/XLC/XLY/XLF/XLI/XLB/XLE）与防御股板块（XLV/XLP/XLU/XLRE）1月平均收益之差
- `dispersion`: 11 个板块 1月收益率的标准差（越大说明轮动越剧烈）

### 5.2 技术优化

#### 将 `index.html` 和 `quote.html` 拆分为共享模板

两个文件共享大量 CSS（设计 token、排版、chip/badge 样式）和 JS 工具函数（`fmt`/`cls`/`fMoney`/`fVol`）。

**建议**: 提取到 `shared.css` + `utils.js`，两个 HTML 文件各 `<link>/<script>` 引用，减少维护重复。

```
public/work/sector-rotation/
├── shared.css    ← 提取的 CSS 变量 + 通用样式
├── utils.js      ← fmt / cls / fMoney / fVol + ECharts 通用 config
├── index.html    ← 引用 shared.css + utils.js
└── quote.html    ← 引用 shared.css + utils.js
```

#### `[ticker]/page.tsx` — iframe 抽取为共享组件

`page.tsx`（主看板）和 `[ticker]/page.tsx` 都使用相同的固定 iframe 样式。

```tsx
// src/components/FullPageIframe.tsx
export function FullPageIframe({ src }: { src: string }) {
  return (
    <iframe
      src={src}
      style={{
        position: "fixed", top: 65, left: 0,
        width: "100%", height: "calc(100% - 65px)",
        border: "none", zIndex: 10,
      }}
    />
  );
}
```

然后两个 `page.tsx` 都改用 `<FullPageIframe src="..." />`。

#### ECharts vendor 版本管理

当前 `vendor/echarts.min.js` 没有版本标识。建议重命名为 `echarts.5.x.x.min.js` 并在两个 HTML 文件的 `<script src>` 中引用带版本号的文件名，方便日后升级。

### 5.3 数据脚本扩展（`fetch_data.py`）

| 字段 | 现状 | 建议 |
|------|------|------|
| `rrg` 历史深度 | 12周 | 扩展到 52周，前端可滑块控制深度 |
| `hist_dates` | ~252日 `MM-DD` | 改为 `YYYY-MM-DD` 格式，避免跨年歧义 |
| `stocks[*].sector` | 无（需通过 key 反查） | 在每个 StockEntry 中加 `sector: "XLK"` 字段，方便前端直接引用 |
| SPY intraday | 无 | 加 `spy.prev_close` 字段，支持 quote 页展示 SPY 当日参照 |

---

## 6. 技术决策记录

### ADR-01: iframe 壳层架构

**决策**: Next.js 页面仅作 iframe 包装，所有逻辑在 `public/` 下的独立 HTML 文件中。

**理由**:
- 数据生成脚本（Python）与前端完全解耦，数据文件可独立部署/更新
- 无需 Next.js 构建步骤即可在本地预览 HTML 文件
- ECharts 在纯 HTML 中初始化比在 Next.js SSR/RSC 中更简单

**权衡**: iframe 无法共享父级 React context；跨框架导航需要 `window.top.location.href` hack；SEO 对 iframe 内容不友好（可接受，因为这是工具页，非内容页）。

### ADR-02: 板块颜色固定编码而非动态分配

**决策**: 每个板块 ticker 对应固定颜色常量，不根据数据动态分配。

**理由**: 板块颜色需在热力图 tooltip、RRG 轨迹、pill bar、modal 标题中保持一致，动态分配会导致不同视图颜色不匹配。

### ADR-03: 热力图使用中国涨跌色惯例（红涨绿跌）

**决策**: 正收益 → 红色，负收益 → 绿色（与 A 股 / 港股 UI 惯例一致）。

**理由**: 目标用户为中文用户，使用与国内平台一致的颜色习惯降低认知负担。

---

## 7. 文件索引

| 文件 | 用途 | 修改频率 |
|------|------|----------|
| `src/app/work/sector-rotation/page.tsx` | Next.js 路由入口 | 极低 |
| `src/app/work/sector-rotation/[ticker]/page.tsx` | 动态标的路由 | 极低 |
| `src/views/SectorRotation.tsx` | iframe 视图壳层 | 极低 |
| `public/work/sector-rotation/data.js` | 每日数据快照 | 每日（脚本生成） |
| `public/work/sector-rotation/index.html` | 主看板（热力图/RRG/超额/对比） | 中 |
| `public/work/sector-rotation/quote.html` | 标的详情页 | 中 |
| `public/work/sector-rotation/vendor/echarts.min.js` | 图表库 | 低（升级时） |
| `scripts/sector-rotation/fetch_data.py` | 数据抓取脚本 | 中 |
