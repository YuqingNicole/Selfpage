"use client";

import { useState } from "react";

const jobs = [
  {
    id: "fullstack",
    title: "Full Stack Engineer",
    type: "Full-time · Remote",
    description:
      "We're looking for a Full Stack Engineer to help build and scale ARTi's core platform. You'll work across our Next.js frontend and Node.js/Python backend, shipping features that real investors use every day.",
    responsibilities: [
      "Build and maintain features across our full stack (Next.js, Node.js, Python)",
      "Design and optimize database schemas and queries (PostgreSQL/Supabase)",
      "Integrate third-party APIs (market data, AI models, payment systems)",
      "Write clean, well-tested code and participate in code reviews",
      "Collaborate closely with product and design to ship fast",
    ],
    requirements: [
      "3+ years of full stack development experience",
      "Strong proficiency in TypeScript/JavaScript and React",
      "Experience with Node.js or Python backends",
      "Familiarity with PostgreSQL and RESTful API design",
      "Bonus: experience with AI/ML integrations or financial data",
    ],
  },
  {
    id: "aiml",
    title: "AI/ML Engineer",
    type: "Full-time · Remote",
    description:
      "Join us to build the intelligence layer of ARTi. You'll work on LLM integrations, RAG pipelines, and AI-powered features that help investors make better decisions.",
    responsibilities: [
      "Design and implement LLM-powered features (market analysis, report generation)",
      "Build and optimize RAG pipelines for financial data retrieval",
      "Fine-tune and evaluate AI models for financial use cases",
      "Develop AI infrastructure that scales reliably",
      "Stay current with AI research and bring new capabilities to the product",
    ],
    requirements: [
      "Strong Python skills and experience with ML frameworks",
      "Experience with LLMs (OpenAI, Anthropic, or open-source models)",
      "Familiarity with vector databases and embedding models",
      "Understanding of NLP fundamentals",
      "Bonus: background in quantitative finance or financial data",
    ],
  },
  {
    id: "productdesigner",
    title: "Product Designer",
    type: "Full-time · Remote",
    description:
      "We're looking for a Product Designer to shape how investors experience ARTi. You'll own design end-to-end — from user research to polished UI — making complex financial data feel clear and actionable.",
    responsibilities: [
      "Lead design for core product features from concept to launch",
      "Create wireframes, prototypes, and high-fidelity designs in Figma",
      "Conduct user research and translate insights into design decisions",
      "Establish and maintain our design system",
      "Work closely with engineers to ensure pixel-perfect implementation",
    ],
    requirements: [
      "3+ years of product design experience",
      "Strong portfolio showing end-to-end product design work",
      "Proficiency in Figma",
      "Experience designing data-heavy or financial products",
      "Bonus: understanding of financial markets or investing",
    ],
  },
  {
    id: "growthmarketing",
    title: "Growth & Marketing Lead",
    type: "Full-time · Remote",
    description:
      "Help us grow ARTi from early adopters to mainstream investors. You'll own our growth strategy, content marketing, and community building — driving acquisition and retention through creative, data-driven campaigns.",
    responsibilities: [
      "Develop and execute growth strategies across channels (SEO, social, email, partnerships)",
      "Create compelling content about AI investing and market insights",
      "Build and nurture our investor community",
      "Analyze funnel metrics and optimize conversion at every stage",
      "Collaborate with product to design growth loops and referral programs",
    ],
    requirements: [
      "3+ years in growth marketing or content strategy",
      "Track record of growing a B2C product or community",
      "Strong writing skills — you can make complex topics accessible",
      "Data-driven mindset with experience in analytics tools",
      "Genuine interest in investing and financial markets",
    ],
  },
];

function JobCard({ job }: { job: (typeof jobs)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "28px 32px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#0a0a0a",
              marginBottom: "6px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {job.title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#737373",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {job.type}
          </p>
        </div>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid #e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      {open && (
        <div style={{ padding: "0 32px 32px", borderTop: "1px solid #e5e5e5" }}>
          <p
            style={{
              fontSize: "15px",
              color: "#404040",
              lineHeight: "1.7",
              marginTop: "24px",
              marginBottom: "28px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {job.description}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#0a0a0a",
                  marginBottom: "14px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                What you'll do
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {job.responsibilities.map((r, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "14px",
                      color: "#404040",
                      lineHeight: "1.65",
                      paddingLeft: "16px",
                      position: "relative",
                      marginBottom: "8px",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "9px",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#0a0a0a",
                      }}
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#0a0a0a",
                  marginBottom: "14px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                What we're looking for
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {job.requirements.map((r, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "14px",
                      color: "#404040",
                      lineHeight: "1.65",
                      paddingLeft: "16px",
                      position: "relative",
                      marginBottom: "8px",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "9px",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#737373",
                      }}
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: "28px" }}>
            <a
              href={`mailto:careers@artifin.ai?subject=Application: ${job.title}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "#0a0a0a",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Apply for this role
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7h9M7.5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export function Work() {
  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", fontFamily: "'Inter', sans-serif" }}>
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(250,250,250,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="https://artifin.ai"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "#0a0a0a",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L16 14H2L9 2Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span style={{ fontSize: "16px", fontWeight: 600, color: "#0a0a0a" }}>ARTi</span>
          </a>
          <a
            href="mailto:careers@artifin.ai"
            style={{
              padding: "8px 18px",
              background: "#0a0a0a",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Get in touch
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "96px 24px 80px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: "100px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              background: "#22c55e",
              borderRadius: "50%",
            }}
          />
          <span style={{ fontSize: "13px", color: "#404040", fontWeight: 500 }}>
            We're hiring
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 600,
            color: "#0a0a0a",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
            maxWidth: "760px",
          }}
        >
          Build the future of
          <br />
          <span style={{ color: "#737373" }}>AI-powered investing.</span>
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#737373",
            lineHeight: 1.65,
            maxWidth: "560px",
            marginBottom: "40px",
          }}
        >
          ARTi is an AI investment research platform. We're a small, ambitious team building tools
          that give every investor an edge. Join us.
        </p>

        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {[
            { value: `${jobs.length}`, label: "Open roles" },
            { value: "100%", label: "Remote" },
            { value: "Series Seed", label: "Stage" },
          ].map((s) => (
            <div key={s.label}>
              <p style={{ fontSize: "28px", fontWeight: 600, color: "#0a0a0a", lineHeight: 1 }}>
                {s.value}
              </p>
              <p style={{ fontSize: "14px", color: "#737373", marginTop: "4px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why ARTi */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 96px",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: "16px",
            padding: "48px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#0a0a0a",
              letterSpacing: "-0.02em",
              marginBottom: "40px",
            }}
          >
            Why ARTi
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "40px",
            }}
          >
            {[
              {
                icon: "🚀",
                title: "Real impact, fast",
                desc: "We're a small team, which means your work ships quickly and you can see real users benefiting from what you build.",
              },
              {
                icon: "🤖",
                title: "AI at the core",
                desc: "We're not bolting AI onto an existing product — it's fundamental to everything we do. You'll work on genuinely hard AI problems.",
              },
              {
                icon: "📈",
                title: "High ownership",
                desc: "No bureaucracy, no endless meetings. You own your domain, make decisions, and see them through to production.",
              },
              {
                icon: "🌍",
                title: "Remote-first",
                desc: "Work from anywhere. We care about results, not where you sit or when you start your day.",
              },
              {
                icon: "💰",
                title: "Competitive comp",
                desc: "Salary, equity, and benefits that reflect the caliber of people we're looking for.",
              },
              {
                icon: "🎯",
                title: "Big market",
                desc: "The intersection of AI and finance is one of the most significant opportunities of this decade. We're early.",
              },
            ].map((v) => (
              <div key={v.title}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{v.icon}</div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#0a0a0a",
                    marginBottom: "8px",
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#737373", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 96px",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#0a0a0a",
            letterSpacing: "-0.02em",
            marginBottom: "32px",
          }}
        >
          Open roles
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 96px",
        }}
      >
        <div
          style={{
            background: "#0a0a0a",
            borderRadius: "16px",
            padding: "64px 48px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Don't see the right role?
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#a3a3a3",
              lineHeight: 1.65,
              maxWidth: "460px",
              margin: "0 auto 32px",
            }}
          >
            We're always looking for exceptional people. Send us a note about what you do and why
            you want to join ARTi.
          </p>
          <a
            href="mailto:careers@artifin.ai"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              background: "#fff",
              color: "#0a0a0a",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            careers@artifin.ai
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7h9M7.5 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #e5e5e5",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                background: "#0a0a0a",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L16 14H2L9 2Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#0a0a0a" }}>ARTi</span>
          </div>
          <p style={{ fontSize: "13px", color: "#a3a3a3" }}>
            © {new Date().getFullYear()} ARTi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
