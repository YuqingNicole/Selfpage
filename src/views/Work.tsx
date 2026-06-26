import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const experiences = [
  {
    period: "2024 — Present",
    role: "Product Manager",
    company: "ARTi",
    companyUrl: "https://artifin.ai",
    type: "Full-time",
    tags: ["AI", "FinTech", "B2C"],
    desc: "构建机构级 AI 投研平台，负责核心产品路线图规划、用户增长策略与跨团队协作，推动 0→1 产品落地。",
  },
  {
    period: "2024",
    role: "Product Designer & PM",
    company: "botearn.ai",
    companyUrl: "https://botearn.ai",
    type: "Founding Team",
    tags: ["SaaS", "AI", "Product"],
    desc: "参与创始团队，负责产品设计与 PM 工作，覆盖功能定义、原型设计到上线迭代全流程。",
  },
  {
    period: "2024",
    role: "Product Researcher",
    company: "WanderPod",
    companyUrl: "#",
    type: "Project",
    tags: ["Travel", "AI", "Consumer"],
    desc: "旅行 AI 产品研究，覆盖竞品分析（Viator vs TripAdvisor）、用户调研与产品差异化方案设计。",
  },
  {
    period: "2023 — 2024",
    role: "Research Assistant",
    company: "Academic Research",
    companyUrl: "#",
    type: "Research",
    tags: ["Consumer Behavior", "ESG", "Quantitative"],
    desc: "研究方向涵盖可持续消费、年轻消费者行为、语言风格匹配（LSM）及品牌忠诚度，使用 Stata / SPSS 进行数据分析。",
  },
];

const projects = [
  {
    name: "FitReward",
    url: "https://fitreward-next.vercel.app",
    tags: ["Next.js", "PWA", "AI"],
    desc: "团队运动激励 Web App，截图记录运动、AI 识别截图、季度奖池机制。Strava 风格设计。",
    status: "Live",
  },
  {
    name: "ARTi Careers",
    url: "https://arti-careers-74te948a7-sitesfy.vercel.app",
    tags: ["Static", "Editorial"],
    desc: "ARTi 招聘官网，白色杂志风设计，基于 EB Garamond + Inter 双字体系统。",
    status: "Live",
  },
  {
    name: "Agent Report",
    url: "https://yuqingnicole.github.io/agent-report/",
    tags: ["Research", "AI"],
    desc: "AI Agent 投研报告系统，自动化生成金融分析内容并发布至 GitHub Pages。",
    status: "Live",
  },
];

export function Work() {
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
              className="grid grid-cols-[120px_1fr] gap-12 py-8 group"
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
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3
                      className="text-lg font-normal leading-snug"
                      style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
                    >
                      {exp.role}
                    </h3>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm inline-flex items-center gap-1 transition-opacity hover:opacity-70"
                      style={{ color: "var(--accent-warm)", fontFamily: "var(--font-sans)" }}
                    >
                      {exp.company}
                      {exp.companyUrl !== "#" && <ExternalLink size={11} />}
                    </a>
                  </div>
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
          {projects.map((proj, i) => (
            <a
              key={i}
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
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
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] tracking-[0.06em] uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: "hsl(150, 22%, 90%)",
                      color: "var(--accent-sage)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {proj.status}
                  </span>
                  <ExternalLink size={13} style={{ color: "var(--muted-foreground)" }} />
                </div>
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
                {proj.desc}
              </p>
            </a>
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
