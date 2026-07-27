'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const dimensions = [
  {
    code: 'D',
    name: 'Data',
    desc: '数据质量维度',
    items: [
      { label: '数据时效性', detail: '引用数据是否为最新可用数据，财报数据是否与发布时间匹配' },
      { label: '来源权威性', detail: '数据来源是否为 SEC、交易所、官方财报等一级来源' },
      { label: '无冲突', detail: '同一报告内不同段落的数据是否自洽，无前后矛盾' },
    ],
  },
  {
    code: 'Q',
    name: 'Quality',
    desc: '分析质量维度',
    items: [
      { label: '分析深度', detail: '是否超出数据复述，提供有效推断和因果解释' },
      { label: '覆盖度', detail: '核心问题是否被完整覆盖，关键数据点不遗漏' },
    ],
  },
  {
    code: 'R',
    name: 'Reliability',
    desc: '可靠性维度',
    items: [
      { label: '无数据失真', detail: '数字未被四舍五入或错误单位化（如亿/百万混淆）' },
      { label: '无幻觉', detail: '不引用未经验证的数据，不编造财务数字' },
    ],
  },
];

export default function ScoringPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <Link
          href="/work/arti-benchmark"
          className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
          style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
        >
          <ArrowLeft size={14} />
          Back to ARTi Benchmark
        </Link>
      </div>

      <section className="max-w-3xl mx-auto px-6 pt-10 pb-12">
        <p className="text-xs tracking-[0.12em] uppercase mb-4" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
          ARTi Benchmark · 评分体系
        </p>
        <h1 className="text-5xl font-normal leading-[1.08] mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
          D × Q × R
        </h1>
        <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
          三个维度，七个子指标，用 LLM-as-judge 自动评分，可覆盖 A 股 / 港股 / 美股场景。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: '1px solid var(--border)' }} />

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-14">
        {dimensions.map((dim, i) => (
          <motion.section
            key={dim.code}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-normal" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-warm)' }}>{dim.code}</span>
              <span className="text-xl font-light" style={{ fontFamily: 'var(--font-sans)', color: 'var(--foreground)' }}>{dim.name}</span>
              <span className="text-sm font-light" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{dim.desc}</span>
            </div>
            <div className="space-y-4">
              {dim.items.map((item) => (
                <div key={item.label} className="grid grid-cols-[160px_1fr] gap-6">
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>{item.label}</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: '1px solid var(--border)' }} />
      <section className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
          综合得分 = D × Q × R，满分 100。每个子维度由 LLM-as-judge 打 0–1 连续分，加权求和后归一化。评分 rubric 需投研专业人员参与标注初始样本，再通过 prompt tuning 扩展到自动化流程。
        </p>
      </section>
      <div className="h-24" />
    </div>
  );
}
