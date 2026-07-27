'use client';

import Link from 'next/link';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';

const layers = [
  {
    name: '测试集',
    what: '100+ 道有标准答案的投研题（覆盖 scan / panorama / deep，含 A 股 / 港股 / 美股）',
    difficulty: 3,
    note: '最核心，人工成本高',
  },
  {
    name: '评分 rubric',
    what: '把 D/Q/R 7 个子维度翻译成投研场景的打分标准，用 LLM-as-judge 自动评',
    difficulty: 3,
    note: '',
  },
  {
    name: 'benchmark runner',
    what: '对每个模型 × reasoning 档位跑完整测试集，记录分 / 成本 / 耗时',
    difficulty: 2,
    note: '',
  },
  {
    name: '结果存储',
    what: '新建 benchmark_runs / benchmark_scores 表',
    difficulty: 1,
    note: '',
  },
  {
    name: '排行榜页面',
    what: '表格 + 热力图 + 散点图，公开可访问',
    difficulty: 2,
    note: '',
  },
  {
    name: 'head-to-head 计算',
    what: '两两比较胜率，按题目粒度',
    difficulty: 1,
    note: '',
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="text-foreground/60 text-sm">
      {'★'.repeat(n)}{'☆'.repeat(3 - n)}
    </span>
  );
}

export default function ArtiBenchmark() {
  return (
    <>
      <SEOHead
        title="ARTi Benchmark 方案"
        description="AI 模型投研能力 Benchmark 设计：评分体系、测试集构建、工程架构与排行榜实现方案。"
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Thinking</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                ARTi Benchmark
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
                用标准化测试集衡量 AI 投研能力——评分体系、工程架构与排行榜实现方案
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 space-y-20">

          {/* IRAB 参考 */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-light tracking-wide mb-6">他们做了什么</h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              <a
                href="https://irab.rabyte.cn/leaderboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                IRAB
              </a>
              {' '}是目前最系统的 AI 投研能力排行榜——用一套标准化测试集跑所有模型配置，按多维度打分，公开展示结果。
            </p>

            <div className="border border-border rounded-lg p-6 space-y-5">
              <div>
                <p className="text-sm font-medium tracking-wide mb-2">评分体系：D × Q × R</p>
                <ul className="space-y-1 text-sm text-muted-foreground font-light">
                  <li><span className="text-foreground">D（Data）</span>：数据质量、时效性、来源权威性、无冲突</li>
                  <li><span className="text-foreground">Q（Quality）</span>：分析深度、覆盖度</li>
                  <li><span className="text-foreground">R（Reliability）</span>：无数据失真、无数据冲突</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium tracking-wide mb-2">每次测试记录</p>
                <p className="text-sm text-muted-foreground font-light">综合分、7 个子维度分、成本/次、耗时/次、P95 耗时、样本量 N</p>
              </div>
              <div>
                <p className="text-sm font-medium tracking-wide mb-2">可视化</p>
                <p className="text-sm text-muted-foreground font-light">排行榜表格、能力热力图、成本×分数散点图、time×分数散点图、head-to-head 胜率</p>
              </div>
            </div>
          </motion.section>

          {/* 已有基础 */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-light tracking-wide mb-6">ARTi 已有的基础</h2>
            <ul className="space-y-2 text-sm text-muted-foreground font-light">
              <li className="flex items-start gap-3">
                <span className="text-foreground mt-0.5">—</span>
                <span>evaluate-with-judge + admin-golden-set 跑批评估</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground mt-0.5">—</span>
                <span>多 provider / 模型支持（RFC-0017）</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground mt-0.5">—</span>
                <span>AI gateway 里有耗时 / token 记录</span>
              </li>
            </ul>
          </motion.section>

          {/* 需要新建的层 */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-light tracking-wide mb-6">需要新建的</h2>
            <div className="divide-y divide-border border-y border-border">
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="py-5 flex items-start gap-6"
                >
                  <div className="w-32 shrink-0">
                    <p className="text-sm font-medium tracking-wide">{layer.name}</p>
                    <Stars n={layer.difficulty} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{layer.what}</p>
                    {layer.note && (
                      <p className="mt-1 text-xs text-muted-foreground/70 font-light">{layer.note}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 关键判断 */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-light tracking-wide mb-6">关键判断</h2>
            <div className="space-y-5 text-muted-foreground font-light leading-relaxed">
              <p>
                最重的工作量在<span className="text-foreground">测试集构建</span>和<span className="text-foreground">评分维度定义</span>，不是代码。工程侧 2–3 周能出初版，但测试集质量决定排行榜有没有公信力——这才是值得投入时间的地方。
              </p>
              <p>ARTi 有先天优势——有真实用户产出的研报和预测记录，可以：</p>
              <ol className="space-y-2 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-foreground font-medium shrink-0">1.</span>
                  <span>从历史问答里筛出"有事实答案"的题（股价预测验证、数据查询）做自动评估</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground font-medium shrink-0">2.</span>
                  <span>用专业投研人员标注少量样本，再用 LLM-as-judge 扩展</span>
                </li>
              </ol>
            </div>
          </motion.section>

        </div>

        {/* Sub-page navigation */}
        <div className="mt-16 border-t" style={{ borderColor: 'var(--border)' }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 mb-4">
          {[
            { href: '/work/arti-benchmark/scoring', label: '评分体系', desc: 'D × Q × R 三维度，七个子指标' },
            { href: '/work/arti-benchmark/dataset', label: '测试集', desc: '100+ 道分级投研题，三难度层级' },
            { href: '/work/arti-benchmark/architecture', label: '架构方案 v1.0', desc: '动态路由 · 结构化证据包 · 分级调度' },
            { href: '/work/arti-benchmark/leaderboard', label: '排行榜', desc: 'irab.rabyte.cn 实时榜单' },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                href={item.href}
                className="group flex items-start justify-between p-5 rounded-lg transition-colors hover:bg-[var(--muted)]"
                style={{ border: '1px solid var(--border)' }}
              >
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>{item.label}</p>
                  <p className="text-xs font-light" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{item.desc}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--foreground)' }}>
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="h-24" />
      </div>
    </>
  );
}
