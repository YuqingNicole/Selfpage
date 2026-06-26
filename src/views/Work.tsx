"use client";

import { useState } from "react";
import { ArrowRight, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";

const positions = [
  {
    id: 1,
    title: "Product Manager",
    department: "Product",
    location: "Remote / Shanghai",
    type: "Full-time",
    tags: ["AI", "FinTech", "0→1"],
    summary:
      "负责 ARTi 核心产品路线图，主导功能定义、用户增长策略，与研发/设计/运营深度协作。",
    responsibilities: [
      "定义并维护产品路线图，平衡用户价值与商业目标",
      "主导需求评审、原型设计到上线的全流程",
      "深度参与数据指标体系设计，驱动决策",
      "跨团队协作（研发、设计、运营、数据），推动项目落地",
      "持续追踪竞品动态，输出差异化产品策略",
    ],
    requirements: [
      "2 年以上产品经理经验，有 AI / FinTech 产品背景优先",
      "具备从 0 到 1 产品经验，能独立推动复杂项目",
      "数据敏感，熟悉 SQL 或 BI 工具",
      "优秀的跨团队沟通能力，英文流利",
      "对投资、金融市场有真实兴趣",
    ],
  },
  {
    id: 2,
    title: "AI Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    tags: ["LLM", "Python", "RAG"],
    summary:
      "构建 ARTi 的 AI 引擎，包括多模型协作、RAG 流程优化和金融数据结构化处理。",
    responsibilities: [
      "设计并实现多模型 LLM 协作架构（OpenAI、Anthropic、开源模型）",
      "构建金融数据 RAG 管道，提升检索精度和响应质量",
      "优化 AI 早晚报、预测市场分析等核心功能的推理效率",
      "参与 AI 功能的 Prompt 工程与评估体系建设",
      "与产品团队紧密协作，快速迭代 AI 功能",
    ],
    requirements: [
      "扎实的 Python 工程能力，熟悉 LangChain / LlamaIndex 或类似框架",
      "有 RAG 系统设计经验，了解向量数据库（pgvector、Pinecone 等）",
      "熟悉主流 LLM API 使用与 Prompt 优化",
      "有金融数据处理经验优先（如 Tushare、Polymarket API）",
      "能在快节奏环境中独立推进项目",
    ],
  },
  {
    id: 3,
    title: "Growth & Operations",
    department: "Growth",
    location: "Remote / Shanghai",
    type: "Full-time",
    tags: ["Growth", "Community", "Content"],
    summary:
      "驱动 ARTi 用户增长，负责社区运营、内容策略与渠道拓展，把好产品推到对的用户面前。",
    responsibilities: [
      "制定并执行用户获取策略（SEO、社媒、KOL、社区）",
      "运营 ARTi 投资者社区，提升用户活跃度和留存",
      "输出高质量金融内容（早晚报、投研解读、产品更新），覆盖多渠道",
      "分析增长数据，优化漏斗各环节转化率",
      "与产品团队协作，设计用户激励机制（Credits 经济体系等）",
    ],
    requirements: [
      "有 B2C 产品增长或社区运营经验",
      "对金融市场有基本了解，能读懂行情和研报",
      "出色的中英文写作能力",
      "数据驱动，熟悉增长分析工具",
      "有投资社区或金融媒体经验优先",
    ],
  },
];

function PositionCard({ position }: { position: (typeof positions)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-lg transition-all"
      style={{ border: "1px solid var(--border)", background: "var(--card)" }}
    >
      {/* Header */}
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {position.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.08em] uppercase px-2 py-0.5 rounded-sm"
                style={{
                  background: "var(--muted)",
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3
            className="text-2xl font-normal mb-2 leading-snug"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            {position.title}
          </h3>
          <div
            className="flex flex-wrap items-center gap-3 text-xs"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
          >
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {position.location}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {position.type}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1" style={{ color: "var(--muted-foreground)" }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Expanded */}
      {open && (
        <div className="px-6 pb-8" style={{ borderTop: "1px solid var(--border)" }}>
          <p
            className="text-sm font-light leading-relaxed mt-6 mb-8"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
          >
            {position.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p
                className="text-xs tracking-[0.1em] uppercase mb-4"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
              >
                Responsibilities
              </p>
              <ul className="space-y-3">
                {position.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: "var(--accent-warm)" }}
                    />
                    <span
                      className="text-sm font-light leading-relaxed"
                      style={{ color: "var(--foreground)", fontFamily: "var(--font-sans)" }}
                    >
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                className="text-xs tracking-[0.1em] uppercase mb-4"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
              >
                Requirements
              </p>
              <ul className="space-y-3">
                {position.requirements.map((r, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: "var(--muted-foreground)", opacity: 0.5 }}
                    />
                    <span
                      className="text-sm font-light leading-relaxed"
                      style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
                    >
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={`mailto:hi@artifin.ai?subject=Application: ${position.title}`}
              className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "var(--accent-warm)", fontFamily: "var(--font-sans)" }}
            >
              Apply for this role
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export function Work() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <p
          className="text-xs tracking-[0.14em] uppercase mb-6"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
        >
          ARTi — Open Positions
        </p>
        <h1
          className="text-5xl md:text-6xl font-normal leading-[1.1] mb-8"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          Build the future
          <br />
          <em className="italic" style={{ color: "var(--muted-foreground)" }}>
            of AI investing.
          </em>
        </h1>
        <p
          className="text-base font-light leading-relaxed max-w-lg"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
        >
          ARTi 是一个 AI 驱动的投研平台，帮助个人和机构投资者做出更好的决策。我们是一支小而精的远程团队，正在寻找真正热爱这件事的人。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: "1px solid var(--border)" }} />

      {/* Values */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Remote First", desc: "全员远程，异步优先，结果导向。" },
            { label: "Small & Sharp", desc: "小团队，每个人的影响力都是真实的。" },
            { label: "Ship Fast", desc: "快速验证，快速迭代，不追求完美主义。" },
          ].map((v) => (
            <div key={v.label}>
              <p
                className="text-sm font-normal mb-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
              >
                {v.label}
              </p>
              <p
                className="text-sm font-light leading-relaxed"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: "1px solid var(--border)" }} />

      {/* Positions */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <p
          className="text-xs tracking-[0.12em] uppercase mb-10"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
        >
          Open Roles · {positions.length}
        </p>
        <div className="space-y-4">
          {positions.map((p) => (
            <PositionCard key={p.id} position={p} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section
        className="max-w-3xl mx-auto px-6 py-16"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <h3
          className="text-3xl font-normal mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          Don't see your role?
        </h3>
        <p
          className="text-sm font-light leading-relaxed mb-6 max-w-md"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
        >
          如果你对 ARTi 感兴趣但没有合适的职位，欢迎直接发邮件，说说你能做什么。
        </p>
        <a
          href="mailto:hi@artifin.ai"
          className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
          style={{ color: "var(--accent-warm)", fontFamily: "var(--font-sans)" }}
        >
          hi@artifin.ai
          <ArrowRight size={13} />
        </a>
      </section>
    </div>
  );
}
