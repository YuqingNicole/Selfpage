'use client';

/**
 * 期权学园 — 引导图示库
 * 用纯 SVG 绘制损益图与概念曲线，随知识卡片展示。
 * 所有图均由函数采样生成：绿色区域=盈利，红色区域=亏损。
 */

interface Series {
  fn: (x: number) => number;
  color: string;
  label?: string;
  dash?: boolean;
  /** signed: 相对 y=0 上绿下红填充（用于损益图） */
  fill?: 'signed' | 'none';
}

interface DiagramSpec {
  title: string;
  caption: string;
  xDomain: [number, number];
  yDomain: [number, number];
  xLabel: string;
  yLabel: string;
  series: Series[];
  vlines?: { x: number; label: string; row?: number }[];
  regionLabels?: { x: number; label: string }[];
}

const W = 340;
const H = 222;
const PAD = { l: 10, r: 10, t: 26, b: 38 };
const N = 160;

const POS_FILL = 'rgba(88, 204, 2, 0.18)';
const NEG_FILL = 'rgba(255, 75, 75, 0.15)';

function scales(spec: DiagramSpec) {
  const [x0, x1] = spec.xDomain;
  const [y0, y1] = spec.yDomain;
  const sx = (x: number) => PAD.l + ((x - x0) / (x1 - x0)) * (W - PAD.l - PAD.r);
  const sy = (y: number) => PAD.t + ((y1 - y) / (y1 - y0)) * (H - PAD.t - PAD.b);
  return { sx, sy, x0, x1, y0, y1 };
}

function samplePoints(spec: DiagramSpec, fn: (x: number) => number) {
  const { sx, sy, x0, x1, y0, y1 } = scales(spec);
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const x = x0 + ((x1 - x0) * i) / N;
    const y = Math.max(y0, Math.min(y1, fn(x)));
    pts.push([sx(x), sy(y)]);
  }
  return pts;
}

function toPath(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

/** 把曲线相对 y=0 拆成上/下两组多边形，用于红绿填充 */
function signedPolygons(spec: DiagramSpec, fn: (x: number) => number) {
  const { sx, sy, x0, x1 } = scales(spec);
  const zeroY = sy(0);
  const pos: string[] = [];
  const neg: string[] = [];
  let cur: [number, number][] = [];
  let curSign = 0;

  const flush = () => {
    if (cur.length > 1 && curSign !== 0) {
      const poly =
        cur.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ') +
        ` ${cur[cur.length - 1][0].toFixed(1)},${zeroY.toFixed(1)} ${cur[0][0].toFixed(1)},${zeroY.toFixed(1)}`;
      (curSign > 0 ? pos : neg).push(poly);
    }
    cur = [];
  };

  let prevX = x0;
  let prevY = fn(x0);
  for (let i = 0; i <= N; i++) {
    const x = x0 + ((x1 - x0) * i) / N;
    const y = fn(x);
    const sign = y > 1e-9 ? 1 : y < -1e-9 ? -1 : 0;
    if (i > 0 && sign !== 0 && curSign !== 0 && sign !== curSign) {
      // 符号翻转：插值出过零点，闭合旧多边形
      const t = prevY / (prevY - y);
      const xc = prevX + (x - prevX) * t;
      cur.push([sx(xc), zeroY]);
      flush();
      cur.push([sx(xc), zeroY]);
    }
    cur.push([sx(x), sy(Math.max(spec.yDomain[0], Math.min(spec.yDomain[1], y)))]);
    if (sign !== 0) curSign = sign;
    prevX = x;
    prevY = y;
  }
  flush();
  return { pos, neg };
}

export function LessonDiagram({ id }: { id: string }) {
  const spec = DIAGRAMS[id];
  if (!spec) return null;
  const { sx, sy, x0, x1, y0, y1 } = scales(spec);
  const zeroVisible = y0 < 0 && y1 > 0;
  const zeroY = zeroVisible ? sy(0) : sy(y0);

  return (
    <figure className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
      <figcaption className="mb-1 text-center text-sm font-extrabold">{spec.title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={spec.title}>
        {/* 红绿填充 */}
        {spec.series
          .filter((s) => s.fill === 'signed')
          .map((s, si) => {
            const { pos, neg } = signedPolygons(spec, s.fn);
            return (
              <g key={si}>
                {pos.map((p, i) => (
                  <polygon key={`p${i}`} points={p} fill={POS_FILL} />
                ))}
                {neg.map((p, i) => (
                  <polygon key={`n${i}`} points={p} fill={NEG_FILL} />
                ))}
              </g>
            );
          })}

        {/* 零轴 / 底轴 */}
        <line
          x1={PAD.l}
          y1={zeroY}
          x2={W - PAD.r}
          y2={zeroY}
          stroke="var(--muted-foreground)"
          strokeWidth="1.5"
          strokeDasharray={zeroVisible ? '5 4' : undefined}
          opacity="0.7"
        />

        {/* 参考竖线 */}
        {spec.vlines?.map((v, i) => (
          <g key={i}>
            <line
              x1={sx(v.x)}
              y1={PAD.t}
              x2={sx(v.x)}
              y2={H - PAD.b}
              stroke="var(--muted-foreground)"
              strokeWidth="1"
              strokeDasharray="3 4"
              opacity="0.55"
            />
            <text
              x={sx(v.x)}
              y={H - PAD.b + 13 + (v.row ?? 0) * 12}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--muted-foreground)"
            >
              {v.label}
            </text>
          </g>
        ))}

        {/* 区域标签 */}
        {spec.regionLabels?.map((r, i) => (
          <text
            key={i}
            x={sx(r.x)}
            y={PAD.t - 8}
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fill="var(--muted-foreground)"
          >
            {r.label}
          </text>
        ))}

        {/* 曲线 */}
        {spec.series.map((s, i) => (
          <path
            key={i}
            d={toPath(samplePoints(spec, s.fn))}
            fill="none"
            stroke={s.color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={s.dash ? '7 6' : undefined}
          />
        ))}

        {/* 图例 */}
        {spec.series.some((s) => s.label) && (
          <g>
            {spec.series
              .filter((s) => s.label)
              .map((s, i) => (
                <g key={i} transform={`translate(${PAD.l + 4}, ${PAD.t + 2 + i * 15})`}>
                  <line x1="0" y1="0" x2="18" y2="0" stroke={s.color} strokeWidth="3.5" strokeDasharray={s.dash ? '6 5' : undefined} />
                  <text x="23" y="3.5" fontSize="10.5" fontWeight="700" fill="var(--foreground)">
                    {s.label}
                  </text>
                </g>
              ))}
          </g>
        )}

        {/* 轴标签 */}
        <text x={W - PAD.r} y={H - 4} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--muted-foreground)">
          {spec.xLabel} →
        </text>
        <text x={PAD.l} y={H - 4} textAnchor="start" fontSize="10" fontWeight="700" fill="var(--muted-foreground)">
          ↑ {spec.yLabel}
        </text>
      </svg>
      <p className="mt-2 text-center text-xs leading-relaxed text-[var(--muted-foreground)]">{spec.caption}</p>
    </figure>
  );
}

/* ---------- 常用损益函数 ---------- */

const call = (K: number) => (s: number) => Math.max(s - K, 0);
const put = (K: number) => (s: number) => Math.max(K - s, 0);

const BLUE = '#1cb0f6';
const GREEN = '#58cc02';
const RED = '#ff4b4b';
const PURPLE = '#ce82ff';
const ORANGE = '#ff9600';

export const DIAGRAMS: Record<string, DiagramSpec> = {
  buyerSeller: {
    title: '买方 vs 卖方：一张 Call 的两面',
    caption: '买方（绿）亏损封底在权利金，收益无上限；卖方（红）收益封顶在权利金，亏损无上限——同一张合约，损益互为镜像。',
    xDomain: [80, 130],
    yDomain: [-18, 18],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [
      { fn: (s) => call(100)(s) - 5, color: GREEN, label: '买入 Call' },
      { fn: (s) => 5 - call(100)(s), color: RED, label: '卖出 Call', dash: true },
    ],
    vlines: [{ x: 100, label: '行权价 100' }],
  },

  stockVsCall: {
    title: '持有股票 vs 买入 Call',
    caption: '股票（虚线）盈亏随价格线性变化、可深度亏损；Call（实线）下跌时最多亏掉权利金，上涨时跟随股价——先付「保费」换来的不对称。',
    xDomain: [70, 130],
    yDomain: [-32, 32],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [
      { fn: (s) => s - 100, color: ORANGE, label: '持有股票', dash: true },
      { fn: (s) => call(100)(s) - 6, color: BLUE, label: '买入 Call', fill: 'signed' },
    ],
    vlines: [{ x: 100, label: '100' }],
  },

  longCall: {
    title: 'Long Call 到期损益',
    caption: '行权价 100、权利金 5：股价 ≤100 时亏掉全部权利金；涨过 105（盈亏平衡点）后开始净赚，上不封顶。',
    xDomain: [80, 130],
    yDomain: [-12, 24],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [{ fn: (s) => call(100)(s) - 5, color: BLUE, fill: 'signed' }],
    vlines: [
      { x: 100, label: '行权价' },
      { x: 105, label: '盈亏平衡 105', row: 1 },
    ],
  },

  longPut: {
    title: 'Long Put 到期损益',
    caption: '行权价 100、权利金 5：股价 ≥100 时亏掉权利金；跌破 95（盈亏平衡点）后开始净赚，最大收益在股价归零时。',
    xDomain: [70, 120],
    yDomain: [-12, 24],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [{ fn: (s) => put(100)(s) - 5, color: PURPLE, fill: 'signed' }],
    vlines: [
      { x: 100, label: '行权价' },
      { x: 95, label: '盈亏平衡 95', row: 1 },
    ],
  },

  shortCallPut: {
    title: '卖出 Call vs 卖出 Put',
    caption: '两者最大收益都是权利金（图中平顶）。卖 Call（红）在暴涨中亏损无上限；卖 Put（蓝）在暴跌中亏损巨大但有限。',
    xDomain: [70, 130],
    yDomain: [-24, 12],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [
      { fn: (s) => 5 - call(105)(s), color: RED, label: '卖出 Call(105)' },
      { fn: (s) => 5 - put(95)(s), color: BLUE, label: '卖出 Put(95)', dash: true },
    ],
    vlines: [
      { x: 95, label: '95' },
      { x: 105, label: '105' },
    ],
  },

  moneyness: {
    title: 'Call 的实值 / 平值 / 虚值',
    caption: '以行权价 100 的 Call 为例：股价高于行权价为实值（ITM），附近为平值（ATM），低于为虚值（OTM）。Put 方向正好相反。',
    xDomain: [80, 120],
    yDomain: [-3, 22],
    xLabel: '当前股价',
    yLabel: '内在价值',
    series: [{ fn: (s) => call(100)(s), color: GREEN }],
    vlines: [{ x: 100, label: '行权价 100' }],
    regionLabels: [
      { x: 88, label: '虚值 OTM' },
      { x: 100, label: '平值 ATM' },
      { x: 113, label: '实值 ITM' },
    ],
  },

  valueComposition: {
    title: '期权价格 = 内在价值 + 时间价值',
    caption: '折线是内在价值（立即行权的所得），上方曲线是期权市价。两者的差距就是时间价值——在平值（行权价附近）最大，向两端递减。',
    xDomain: [75, 125],
    yDomain: [-2, 30],
    xLabel: '当前股价',
    yLabel: '价值',
    series: [
      { fn: (s) => call(100)(s), color: ORANGE, label: '内在价值', dash: true },
      { fn: (s) => 5 * Math.log(1 + Math.exp((s - 100) / 5)), color: BLUE, label: '期权价格' },
    ],
    vlines: [{ x: 100, label: '行权价' }],
  },

  timeDecay: {
    title: '时间衰减：越临近到期烧得越快',
    caption: '平值期权的时间价值不是匀速消失的：前期缓慢阴跌，最后 30~45 天加速坠落，到期日归零——这就是买方的「冰块」。',
    xDomain: [0, 90],
    yDomain: [0, 12],
    xLabel: '时间流逝（天）',
    yLabel: '时间价值',
    series: [{ fn: (t) => 10 * Math.sqrt(Math.max(90 - t, 0) / 90), color: RED }],
    vlines: [
      { x: 45, label: '剩 45 天' },
      { x: 90, label: '到期' },
    ],
  },

  ivCrush: {
    title: '财报前后的 IV 过山车',
    caption: '临近财报，不确定性推高 IV（期权变贵）；财报落地瞬间 IV 崩塌（IV Crush）。财报前追买期权，常常「方向对了还亏钱」。',
    xDomain: [0, 30],
    yDomain: [15, 75],
    xLabel: '时间（天）',
    yLabel: 'IV %',
    series: [
      {
        fn: (t) => (t <= 20 ? 30 + 30 * Math.pow(t / 20, 2.2) : 25 + 3 * Math.exp(-(t - 20) / 2.5)),
        color: PURPLE,
      },
    ],
    vlines: [{ x: 20, label: '财报日' }],
  },

  deltaCurve: {
    title: 'Call 的 Delta 随股价变化',
    caption: '深虚值 Delta≈0、平值≈0.5、深实值≈1，中间是平滑的 S 形曲线。曲线在平值处最陡——那个斜率就是 Gamma 的峰值。',
    xDomain: [80, 120],
    yDomain: [-0.08, 1.12],
    xLabel: '当前股价',
    yLabel: 'Delta',
    series: [{ fn: (s) => 1 / (1 + Math.exp(-(s - 100) / 4)), color: BLUE }],
    vlines: [{ x: 100, label: '行权价（Delta≈0.5）' }],
  },

  coveredCall: {
    title: '备兑开仓（Covered Call）',
    caption: '持股 100 + 卖出 105 Call 收 3：横盘/小涨时比裸持股多赚权利金，涨破 105 后收益封顶；下跌时只比持股少亏 3——它不是保险。',
    xDomain: [80, 125],
    yDomain: [-18, 16],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [
      { fn: (s) => s - 100, color: ORANGE, label: '仅持股', dash: true },
      { fn: (s) => s - 100 + 3 - call(105)(s), color: GREEN, label: '备兑组合', fill: 'signed' },
    ],
    vlines: [{ x: 105, label: '卖出行权价 105' }],
  },

  protectivePut: {
    title: '保护性看跌（Protective Put）',
    caption: '持股 100 + 花 4 买入 95 Put：跌破 95 后亏损被锁定（最大亏 9），上涨照常跟随、只少赚保费——给股票上了保险。',
    xDomain: [75, 125],
    yDomain: [-28, 24],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [
      { fn: (s) => s - 100, color: ORANGE, label: '仅持股', dash: true },
      { fn: (s) => s - 100 - 4 + put(95)(s), color: BLUE, label: '保护组合', fill: 'signed' },
    ],
    vlines: [{ x: 95, label: '保底价 95' }],
  },

  shortPut: {
    title: '现金担保卖 Put（CSP）',
    caption: '卖出 95 Put 收 3：股价不跌破 95 就白赚权利金；跌破则按 95 接货，实际成本 92。图中拐点左侧的亏损=「被迫高买」的浮亏。',
    xDomain: [70, 115],
    yDomain: [-22, 10],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [{ fn: (s) => 3 - put(95)(s), color: GREEN, fill: 'signed' }],
    vlines: [
      { x: 95, label: '行权价 95' },
      { x: 92, label: '盈亏平衡 92', row: 1 },
    ],
  },

  bullCallSpread: {
    title: '牛市看涨价差（Bull Call Spread）',
    caption: '买 95 Call + 卖 105 Call，净成本 4：最大亏损锁定 4，最大收益锁定 6（价差 10 - 成本 4）。用封顶收益换更低成本和更高胜率。',
    xDomain: [85, 120],
    yDomain: [-8, 10],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [{ fn: (s) => call(95)(s) - call(105)(s) - 4, color: BLUE, fill: 'signed' }],
    vlines: [
      { x: 95, label: '买 95' },
      { x: 105, label: '卖 105' },
    ],
  },

  straddle: {
    title: '买入跨式（Long Straddle）',
    caption: '同时买入 100 的 Call 和 Put，共花 12：无论涨跌，只要波动超过 ±12 就盈利——赌的是「幅度」，不是方向。谷底是双份权利金。',
    xDomain: [70, 130],
    yDomain: [-16, 20],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [{ fn: (s) => call(100)(s) + put(100)(s) - 12, color: PURPLE, fill: 'signed' }],
    vlines: [
      { x: 88, label: '88' },
      { x: 100, label: '100' },
      { x: 112, label: '112' },
    ],
  },

  ironCondor: {
    title: '铁鹰（Iron Condor）',
    caption: '卖 90 Put + 买 85 Put + 卖 110 Call + 买 115 Call，净收 3：股价停在 90~110 区间即拿满权利金；突破任一侧则触及有限的最大亏损。',
    xDomain: [78, 122],
    yDomain: [-4, 5],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [
      {
        fn: (s) => 3 - put(90)(s) + put(85)(s) - call(110)(s) + call(115)(s),
        color: ORANGE,
        fill: 'signed',
      },
    ],
    vlines: [
      { x: 90, label: '90' },
      { x: 110, label: '110' },
    ],
  },

  smile: {
    title: '波动率偏斜（Put Skew）',
    caption: '同一到期日、不同行权价的 IV 连线：低行权价（虚值 Put）一端明显更高——市场为「崩盘保险」持续支付溢价，BSM 的水平线假设在现实中不成立。',
    xDomain: [70, 130],
    yDomain: [12, 45],
    xLabel: '行权价',
    yLabel: 'IV %',
    series: [
      {
        fn: (k) => (k <= 100 ? 20 + 0.02 * Math.pow(100 - k, 2) : 20 + 0.006 * Math.pow(k - 100, 2)),
        color: PURPLE,
      },
      { fn: () => 20, color: BLUE, label: 'BSM 假设', dash: true },
    ],
    vlines: [{ x: 100, label: '平值' }],
  },

  termStructure: {
    title: 'IV 期限结构：平静 vs 恐慌',
    caption: '横轴是到期月份。平静市况（蓝）近低远高（Contango）；恐慌来袭（红）近月 IV 飙升、曲线倒挂（Backwardation）——倒挂本身就是恐慌温度计。',
    xDomain: [1, 12],
    yDomain: [12, 62],
    xLabel: '到期月份',
    yLabel: 'IV %',
    series: [
      { fn: (m) => 17 + 6 * Math.log(m + 0.3), color: BLUE, label: '平静：Contango' },
      { fn: (m) => 28 + 30 * Math.exp(-m / 2.6), color: RED, label: '恐慌：倒挂', dash: true },
    ],
  },

  calendar: {
    title: '日历价差：近月到期日的「帐篷」',
    caption: '卖近月 + 买远月（同行权价 100）：近月到期时股价恰好停在行权价附近收益最大；大幅偏离则两头落空——赚的是时间衰减的差值。',
    xDomain: [80, 120],
    yDomain: [-3.5, 6],
    xLabel: '近月到期时股价',
    yLabel: '盈亏',
    series: [
      { fn: (s) => 6.5 * Math.exp(-Math.pow(s - 100, 2) / 90) - 2, color: GREEN, fill: 'signed' },
    ],
    vlines: [{ x: 100, label: '行权价 100' }],
  },

  onesd: {
    title: '一倍标准差与 16 Delta 宽跨式',
    caption: '钟形曲线是市场定价的到期股价分布：中间 ±1σ 区间覆盖约 68% 的结局。在两侧 16 Delta（≈±1σ）卖出宽跨式，赌的就是股价落在两条虚线之间。',
    xDomain: [70, 130],
    yDomain: [0, 1.18],
    xLabel: '到期股价',
    yLabel: '概率密度',
    series: [{ fn: (s) => Math.exp(-Math.pow(s - 100, 2) / (2 * 10 * 10)), color: BLUE }],
    vlines: [
      { x: 90, label: '卖 Put(16Δ)' },
      { x: 110, label: '卖 Call(16Δ)' },
    ],
    regionLabels: [
      { x: 79, label: '16%' },
      { x: 100, label: '≈68% 落在区间内' },
      { x: 121, label: '16%' },
    ],
  },

  dteWindow: {
    title: '45 DTE 进场、21 DTE 离场',
    caption: '曲线是剩余时间价值。45 DTE 开仓吃衰减最划算的一段；到 21 DTE（或吃到 50% 利润）离场，把 Gamma 风险最毒的最后三周留给别人。',
    xDomain: [0, 60],
    yDomain: [0, 12],
    xLabel: '时间流逝（天）',
    yLabel: '剩余时间价值',
    series: [{ fn: (t) => 10 * Math.sqrt(Math.max(60 - t, 0) / 60), color: ORANGE }],
    vlines: [
      { x: 15, label: '进场 45 DTE' },
      { x: 39, label: '离场 21 DTE' },
      { x: 60, label: '到期', row: 1 },
    ],
    regionLabels: [{ x: 27, label: '← 机制持仓窗口 →' }],
  },

  amm: {
    title: 'AMM 恒定乘积曲线：x · y = k',
    caption: '池子永远停在这条曲线上：买走 X（沿曲线右下滑）会让 X 越来越贵。单笔买得越多、离起点越远，均价越差——这就是滑点的几何来源。',
    xDomain: [40, 210],
    yDomain: [30, 230],
    xLabel: '池内 X 数量',
    yLabel: '池内 Y 数量',
    series: [{ fn: (x) => 10000 / x, color: BLUE }],
    vlines: [
      { x: 100, label: '当前状态' },
      { x: 160, label: '大单买入后', row: 1 },
    ],
  },

  fundingArb: {
    title: '资金费率套利：方向归零，坐收费率',
    caption: '现货多头（橙）与永续空头（紫）的损益互相抵消，组合（绿）几乎是一条水平线——不赌方向，收益来自多头拥挤时持续支付的资金费。',
    xDomain: [80, 120],
    yDomain: [-24, 24],
    xLabel: '币价',
    yLabel: '盈亏',
    series: [
      { fn: (s) => s - 100, color: ORANGE, label: '现货多头', dash: true },
      { fn: (s) => 100 - s, color: PURPLE, label: '永续空头', dash: true },
      { fn: () => 2, color: GREEN, label: '组合 + 资金费' },
    ],
    vlines: [{ x: 100, label: '开仓价' }],
  },

  collar: {
    title: '领口（Collar）：把持股装进管道',
    caption: '持股 + 买 90 Put + 卖 110 Call（保费互抵≈零成本）：下跌最多亏到 90，上涨最多赚到 110——上下都有界，机构锁定浮盈的标准做法。',
    xDomain: [75, 130],
    yDomain: [-16, 16],
    xLabel: '到期股价',
    yLabel: '盈亏',
    series: [
      { fn: (s) => s - 100, color: ORANGE, label: '仅持股', dash: true },
      { fn: (s) => s - 100 + put(90)(s) - call(110)(s), color: BLUE, label: '领口组合', fill: 'signed' },
    ],
    vlines: [
      { x: 90, label: '90' },
      { x: 110, label: '110' },
    ],
  },
};
