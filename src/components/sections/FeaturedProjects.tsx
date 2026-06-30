"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/data/translations";
import { getFeaturedProjects } from "@/data/projects";

export function FeaturedProjects() {
  const { lang } = useLanguage();
  const T = t[lang].home;
  const featured = getFeaturedProjects();

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-10">
          <p
            className="text-xs tracking-[0.12em] uppercase"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
          >
            {T?.featuredProjects ?? "Featured Projects"}
          </p>
          <Link
            href="/portfolio"
            className="text-xs flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
          >
            {T?.viewAll ?? "View all"}
            <ArrowRight size={11} />
          </Link>
        </div>

        {/* Project list */}
        <div>
          {featured.map((project) => (
            <div
              key={project.id}
              style={{ borderTop: "1px solid var(--border)" }}
              className="py-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <h3
                      className="text-base font-normal"
                      style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
                    >
                      {project.title}
                    </h3>
                    <span
                      className="text-[10px] tracking-[0.06em] uppercase px-1.5 py-0.5 rounded-sm"
                      style={{
                        background: "var(--muted)",
                        color: "var(--muted-foreground)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <p
                    className="text-sm font-light leading-relaxed"
                    style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
                  >
                    {project.description}
                  </p>
                </div>
                <Link
                  href={`/project/${project.slug}`}
                  className="flex-shrink-0 mt-0.5 transition-opacity hover:opacity-70"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </div>
    </section>
  );
}
