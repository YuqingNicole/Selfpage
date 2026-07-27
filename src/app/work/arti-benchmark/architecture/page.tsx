'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const optimizations = [
  {
    id: '01',
    title: '动态分析师选择',
    desc: '在 Layer 0 加一个路由器，解析问题意图后只激活必要的分析师。估值问题不需要宏观分析师，宏观判断不需要个股分析师。',
    saving: 'Token 消耗降低 30-50%',
  },
  {
    id: '02',
    title: 'Layer 1 结构化输出',
    desc: '每个分析师不再写完整文段，统一输出 JSON 格式的证据包（claim + evidence + confidence），后续层只处理结构化数据。',
    saving: 'Token 消耗降低 40-60%',
    code: `{
  "claim": "NVDA 数据中心收入同比增长 122%",
  "evidence": "2024Q4 财报，Revenue $35.1B，YoY +122%",
  "confidence": 0.95,
  "source": "SEC 10-K 2024-02-21"
}`,
  },
  {
    id: '03',
    title: '层间压缩传递',
    desc: '进入下一层前做一次合并：提取各分析师共识、保留核心分歧、删除冗余。Context 长度恒定可控，不会越传越长。',
    saving: 'Context 长度恒定',
  },
  {
    id: '04',
    title: '模型分级调度',
    desc: '根据任务复杂度选择不同规格的模型，避免用大模型处理简单归纳任务。',
    saving: '成本降低 60-70%',
    table: [
      { task: '简单归纳', model: 'Haiku / mini', cost: '低' },
      { task: '冲突判断', model: 'Sonnet', cost: '中' },
      { task: '最终合成 + 修复', model: 'Opus', cost: '按需' },
    ],
  },
  {
    id: '05',
    title: '报告自动评分 + 按需修复',
    desc: '输出前自动打分，低分报告触发修复流程，高分报告直接输出，避免全量过一遍大模型。',
    saving: '质量稳定，成本可控',
    table: [
      { range: '≥ 80 分', action: '直接输出', model: '—' },
      { range: '60–79 分', action: '轻修', model: 'Sonnet' },
      { range: '< 60 分', action: '深修', model: 'Opus' },
    ],
  },
];

export default function ArchitecturePage() {
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
          ARTi Benchmark · 架构方案
        </p>
        <h1 className="text-5xl font-normal leading-[1.08] mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
          Architecture v1.0
        </h1>
        <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
          五项架构优化——动态路由、结构化证据包、层间压缩、模型分级调度、自动评分修复——系统性降本提质。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: '1px solid var(--border)' }} />

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-16">
        {optimizations.map((opt, i) => (
          <motion.section
            key={opt.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-sm font-light" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{opt.id}</span>
              <h2 className="text-xl font-normal" style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>{opt.title}</h2>
            </div>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{opt.desc}</p>

            {opt.code && (
              <pre className="text-xs font-mono p-4 rounded-lg overflow-x-auto mb-4" style={{ background: 'var(--muted)', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                {opt.code}
              </pre>
            )}

            {opt.table && opt.id === '04' && (
              <div className="divide-y" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                {(opt.table as { task: string; model: string; cost: string }[]).map((row) => (
                  <div key={row.task} className="grid grid-cols-3 py-3 text-sm">
                    <span className="font-light" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>{row.task}</span>
                    <span className="font-light" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{row.model}</span>
                    <span className="font-light" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{row.cost}</span>
                  </div>
                ))}
              </div>
            )}

            {opt.table && opt.id === '05' && (
              <div className="divide-y" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                {(opt.table as { range: string; action: string; model: string }[]).map((row) => (
                  <div key={row.range} className="grid grid-cols-3 py-3 text-sm">
                    <span className="font-light" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>{row.range}</span>
                    <span className="font-light" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{row.action}</span>
                    <span className="font-light" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>{row.model}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-3 text-xs font-light" style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-sans)' }}>{opt.saving}</p>
          </motion.section>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: '1px solid var(--border)' }} />
      <section className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
          优先级：P0 → Layer 1 结构化输出 + 自动评分修复；P1 → 路由器 + 层间压缩；P2 → Benchmark 问题集 + 竞品横向对比。
        </p>
      </section>
      <div className="h-24" />
    </div>
  );
}
