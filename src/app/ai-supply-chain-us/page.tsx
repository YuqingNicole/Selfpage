const chainCards = [
  {
    title: 'GPU / AI 芯片',
    focus: 'NVDA · AMD · AVGO · MRVL',
    desc: '主线风险偏好温度计。先看龙头是否领涨，再看链内是否扩散。',
    signal: '先看 NVDA 是否带动 AVGO / MRVL 同步转强。',
  },
  {
    title: '网络 / 光通信',
    focus: 'ANET · CIEN · LITE · COHR',
    desc: 'Scale-out 扩散链。常在 GPU 之后承接资金，决定主线宽度。',
    signal: 'ANET 是否持续跑赢 NVDA，是关键背离信号。',
  },
  {
    title: '服务器 / 基础设施',
    focus: 'SMCI · DELL · HPE',
    desc: '验证硬件 CapEx 是否还在继续外溢。',
    signal: '如果 GPU 强而服务器弱，说明市场只在交易龙头，不在交易广度。',
  },
  {
    title: '半导体设备 / 制造',
    focus: 'AMAT · LRCX · KLAC · ASML · TSM',
    desc: '中周期验证链，判断资本开支是否真的向制造端传导。',
    signal: '设备链转强，往往意味着主线从情绪走向更扎实的中期逻辑。',
  },
  {
    title: '存储 / 封装',
    focus: 'MU · WDC · AMKR',
    desc: '看训练与推理扩容是否往 memory / packaging 传导。',
    signal: 'MU 是否带动存储链回暖，是判断需求扩散的重要观察点。',
  },
  {
    title: '电力 / 散热 / 供电',
    focus: 'VRT · ETN · NVT · HUBB · PWR',
    desc: 'AI Infra 的确定性补链，经常承担第二波逻辑。',
    signal: '硬件回调时若电力链抗跌，说明市场仍在交易基础设施确定性。',
  },
]

const signals = [
  '今日状态：先判断 risk-on / risk-off / 观察期，不先看细节。',
  '风格切换：硬件强还是软件强？龙头强还是扩散强？',
  '关键背离：NVDA 跌而 ANET / VRT 抗跌，往往比单纯涨跌更有信息。',
  '明日阈值：只保留 3–5 条最重要观察，不做信息堆料。',
]

const watchlist = [
  'NVDA 是否重新站回短期强势区间',
  'ANET 是否连续跑赢 GPU 链',
  'MSFT / META 是否相对硬件出现超额收益',
  'VRT / ETN 是否在回调日维持韧性',
  'MU 是否带动存储链同步修复',
]

export default function AiSupplyChainUsPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, rgba(158, 116, 255, 0.18), transparent 28%), linear-gradient(180deg, #0b1020 0%, #0f172a 45%, #111827 100%)',
        color: '#f5f7fb',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 80px' }}>
        <section style={{ marginBottom: 40 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 14px',
              borderRadius: 999,
              background: 'rgba(200, 162, 200, 0.16)',
              color: '#e9d5ff',
              fontSize: 13,
              letterSpacing: '0.06em',
            }}
          >
            SELF PAGE · MVP
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)', lineHeight: 1.02, margin: '18px 0 14px', fontWeight: 700 }}>
            US AI Supply Chain
            <br />
            Decision Board
          </h1>
          <p style={{ maxWidth: 820, fontSize: 18, lineHeight: 1.7, color: 'rgba(245,247,251,0.76)', margin: 0 }}>
            一个给投资判断用的 MVP，不是研究堆料页。核心不是“把所有信息都摆出来”，而是先回答：
            <strong style={{ color: '#fff' }}> 今天 AI 主线的钱在往哪里走？</strong>
          </p>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 18,
          }}
        >
          {[
            ['Today\'s State', 'Observation', '主线未崩，但不默认继续追高，先看资金是否回流。'],
            ['Strongest Chain', 'Application Software', '若软件持续跑赢硬件，意味着风格正在切换。'],
            ['Weakest Chain', 'Semi Equipment', '设备链偏弱时，说明市场还没 fully price in 中周期扩张。'],
            ['Today\'s Move', 'Wait for Confirmation', '先看龙头与扩散是否同步，再决定试探还是防守。'],
          ].map(([eyebrow, title, body]) => (
            <div
              key={eyebrow}
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                padding: 22,
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div style={{ color: '#c8a2c8', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                {eyebrow}
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 10 }}>{title}</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.65 }}>{body}</div>
            </div>
          ))}
        </section>

        <section
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 28,
            padding: 28,
            background: 'rgba(17,24,39,0.5)',
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 14, color: '#c8a2c8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Core framing
          </div>
          <h2 style={{ fontSize: 30, lineHeight: 1.15, margin: '0 0 12px' }}>
            From analyst dashboard to decision dashboard
          </h2>
          <p style={{ maxWidth: 860, lineHeight: 1.8, color: 'rgba(245,247,251,0.76)', margin: 0 }}>
            第一屏只做一件事：把复杂研究压缩成用户可执行的判断。先给结论，再给证据；先说今天怎么看，再说为什么；先服务动作，再服务理解。
          </p>
        </section>

        <section style={{ marginBottom: 34 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'end', marginBottom: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#c8a2c8', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Six-chain MVP</div>
              <h2 style={{ fontSize: 30, margin: 0 }}>What to track in the US version</h2>
            </div>
            <div style={{ color: 'rgba(245,247,251,0.68)', maxWidth: 420, lineHeight: 1.65 }}>
              先只盯 6 条主链，把注意力压缩到真正影响 risk appetite、风格切换与扩散路径的地方。
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {chainCards.map((card) => (
              <article
                key={card.title}
                style={{
                  borderRadius: 24,
                  padding: 22,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <h3 style={{ fontSize: 22, margin: '0 0 10px' }}>{card.title}</h3>
                <div style={{ color: '#e9d5ff', marginBottom: 12, fontWeight: 600 }}>{card.focus}</div>
                <p style={{ margin: '0 0 14px', color: 'rgba(245,247,251,0.72)', lineHeight: 1.7 }}>{card.desc}</p>
                <div style={{ color: '#cbd5e1', lineHeight: 1.65, fontSize: 15 }}>观察点：{card.signal}</div>
              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 18,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              borderRadius: 24,
              padding: 24,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div style={{ color: '#c8a2c8', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Signal lights</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'rgba(245,247,251,0.78)', lineHeight: 1.9 }}>
              {signals.map((item) => (
                <li key={item} style={{ marginBottom: 6 }}>{item}</li>
              ))}
            </ul>
          </div>
          <div
            style={{
              borderRadius: 24,
              padding: 24,
              background: 'linear-gradient(180deg, rgba(150,120,210,0.18), rgba(255,255,255,0.04))',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ color: '#f3e8ff', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Tomorrow watchlist</div>
            <ol style={{ margin: 0, paddingLeft: 18, color: 'rgba(245,247,251,0.84)', lineHeight: 1.9 }}>
              {watchlist.map((item) => (
                <li key={item} style={{ marginBottom: 6 }}>{item}</li>
              ))}
            </ol>
          </div>
        </section>

        <section
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 24,
            color: 'rgba(245,247,251,0.62)',
            lineHeight: 1.75,
          }}
        >
          MVP 目标不是做全量数据库，而是先验证一个问题：
          <strong style={{ color: '#fff' }}>用户是否愿意每天回来，用一屏内容完成当天的 AI 主线判断。</strong>
        </section>
      </div>
    </main>
  )
}
