'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    type: 'Scan',
    desc: '快速扫描类',
    examples: ['NVDA 最新一季 EPS 是多少？', '茅台今天收盘价？', '苹果 2024 年总营收？'],
    note: '有标准答案，可自动验证，适合作为基础评测题',
  },
  {
    type: 'Panorama',
    desc: '全景分析类',
    examples: ['帮我分析 NVDA 的竞争护城河', '茅台近三年的核心增长驱动是什么？', 'Apple 的供应链风险有哪些？'],
    note: '无唯一答案，需 LLM-as-judge + rubric 评分',
  },
  {
    type: 'Deep',
    desc: '深度研究类',
    examples: ['如果美联储 2025 年降息 3 次，对 NVDA 估值影响如何？', '茅台提价空间的边界在哪里？'],
    note: '难度最高，考察推理与失效条件意识',
  },
];

const buildSteps = [
  { step: '1', title: '从历史问答挖掘', detail: 'ARTi 有真实用户产出的问答记录，筛出"有可验证事实答案"的题目作为 Scan 类基础集' },
  { step: '2', title: '人工标注小样本', detail: '投研人员对 Panorama / Deep 类题目给出参考答案和评分标准（~50 题）' },
  { step: '3', title: 'LLM-as-judge 扩展', detail: '用标注样本 fine-tune judge prompt，扩展到大规模自动评分' },
  { step: '4', title: '持续更新', detail: '每季度加入新题目，覆盖最新财报周期和市场事件' },
];

export default function DatasetPage() {
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
          ARTi Benchmark · 测试集
        </p>
        <h1 className="text-5xl font-normal leading-[1.08] mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
          Dataset
        </h1>
        <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
          100+ 道覆盖 A 股 / 港股 / 美股的标准化投研题，分三个难度层级，支持自动评分与人工扩展。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: '1px solid var(--border)' }} />

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-14">
        {/* 题目分类 */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-normal mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>题目分类</h2>
          <div className="space-y-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.type}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-lg"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-lg font-medium" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>{cat.type}</span>
                  <span className="text-sm font-light" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{cat.desc}</span>
                </div>
                <ul className="space-y-1 mb-4">
                  {cat.examples.map((ex) => (
                    <li key={ex} className="text-sm font-light" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
                      &ldquo;{ex}&rdquo;
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-light" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)', opacity: 0.7 }}>{cat.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 构建流程 */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-normal mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>构建流程</h2>
          <div className="space-y-6">
            {buildSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="grid grid-cols-[40px_1fr] gap-6 items-start"
              >
                <span className="text-2xl font-normal" style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-display)' }}>{s.step}</span>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>{s.title}</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{s.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="h-24" />
    </div>
  );
}
