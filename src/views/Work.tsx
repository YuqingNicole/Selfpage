"use client";

import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { workProjects } from "@/data/workProjects";

const experiences = [
  {
    period: "2024 — Present",
    role: "Product Manager",
    company: "ARTi",
    companySlug: "arti",
    type: "Full-time",
    tags: ["AI", "FinTech", "B2C"],
    desc: "构建机构级 AI 投研平台，负责核心产品路线图规划、用户增长策略与跨团队协作，推动 0→1 产品落地。",
  },
  {
    period: "2024",
    role: "Product Designer & PM",
    company: "botearn.ai",
    companySlug: "botearn",
    type: "Founding Team",
    tags: ["SaaS", "AI", "Product"],
    desc: "参与创始团队，负责产品设计与 PM 工作，覆盖功能定义、原型设计到上线迭代全流程。",
  },
  {
    period: "2024",
    role: "Product Researcher",
    company: "WanderPod",
    companySlug: "wanderpod",
    type: "Project",
    tags: ["Travel", "AI", "Consumer"],
    desc: "旅行 AI 产品研究，覆盖竞品分析（Viator vs TripAdvisor）、用户调研与产品差异化方案设计。",
  },
  {
    period: "2023 — 2024",
    role: "Research Assistant",
    company: "Academic Research",
    companySlug: null,
    type: "Research",
    tags: ["Consumer Behavior", "ESG", "Quantitative"],
    desc: "研究方向涵盖可持续消费、年轻消费者行为、语言风格匹配（LSM）及品牌忠诚度，使用 Stata / SPSS 进行数据分析。",
  },
];

const projectSlugs = ["fitreward", "arti", "wanderpod"];

export function Work() {
  const projects = workProjects.filter((p) => projectSlugs.includes(p.slug));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <p
          className="text-xs tracking-[0.14em] uppercase mb-6"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
        >
          Work & Experience
        </p>
        <h1
          className="text-5xl md:text-6xl font-normal leading-[1.1] mb-8"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          Things I've built
          <br />
          <em className="italic" style={{ color: "var(--muted-foreground)" }}>
            and shipped.
          </em>
        </h1>
        <p
          className="text-base font-light leading-relaxed max-w-lg"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
        >
          产品研究者、设计师，也是 builder。专注 AI × 金融 × 消费者行为的交叉地带。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: "1px solid var(--border)" }} />

      {/* Experience */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="grid grid-cols-[120px_1fr] gap-12 mb-12 items-start">
          <p
            className="text-xs tracking-[0.12em] uppercase pt-1"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
          >
            Experience
          </p>
          <div />
        </div>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="grid grid-cols-[120px_1fr] gap-12 py-8"
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}
            >
              <div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
                >
                  {exp.period}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)", opacity: 0.7 }}
                >
                  {exp.type}
                </p>
              </div>
              <div>
                <div className="mb-2">
                  <h3
                    className="text-lg font-normal leading-snug"
                    style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
                  >
                    {exp.role}
                  </h3>
                  {exp.companySlug ? (
                    <Link
                      href={`/work/${exp.companySlug}`}
                      className="text-sm inline-flex items-center gap-1 transition-opacity hover:opacity-70"
                      style={{ color: "var(--accent-warm)", fontFamily: "var(--font-sans)" }}
                    >
                      {exp.company}
                      <ArrowRight size={11} />
                    </Link>
                  ) : (
                    <span
                      className="text-sm"
                      style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
                    >
                      {exp.company}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {exp.tags.map((tag) => (
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
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
                >
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: "1px solid var(--border)" }} />

      {/* Projects */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="grid grid-cols-[120px_1fr] gap-12 mb-12 items-start">
          <p
            className="text-xs tracking-[0.12em] uppercase pt-1"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
          >
            Projects
          </p>
          <div />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <Link
              key={proj.slug}
              href={`/work/${proj.slug}`}
              className="block p-6 rounded-lg transition-all hover:-translate-y-0.5"
              style={{
                border: "1px solid var(--border)",
                background: "var(--card)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="text-lg font-normal"
                  style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
                >
                  {proj.name}
                </h3>
                <ArrowRight size={14} style={{ color: "var(--muted-foreground)" }} />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.06em] uppercase px-2 py-0.5 rounded-sm"
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
              <p
                className="text-sm font-light leading-relaxed"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
              >
                {proj.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section
        className="max-w-3xl mx-auto px-6 py-16"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="grid grid-cols-[120px_1fr] gap-12 items-center">
          <div />
          <div>
            <h3
              className="text-3xl font-normal mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
            >
              Let's build something.
            </h3>
            <a
              href="mailto:yuqingchen02@gmail.com"
              className="text-sm inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{ color: "var(--accent-warm)", fontFamily: "var(--font-sans)" }}
            >
              yuqingchen02@gmail.com
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
