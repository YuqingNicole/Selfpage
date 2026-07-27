"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { WorkProject } from "@/data/workProjects";

export function WorkDetail({ project }: { project: WorkProject }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Back */}
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
        >
          <ArrowLeft size={14} />
          Back to Work
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-10 pb-12">
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
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

        <h1
          className="text-5xl md:text-6xl font-normal leading-[1.08] mb-5"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          {project.name}
        </h1>

        <div
          className="flex items-center gap-4 mb-6 text-sm"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
        >
          <span>{project.role}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{project.period}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{project.type}</span>
        </div>

        <p
          className="text-lg font-light leading-relaxed"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
        >
          {project.summary}
        </p>
      </section>

      {/* Cover Image */}
      {project.coverImage && (
        <div className="max-w-3xl mx-auto px-6 mb-16">
          <div
            className="w-full rounded-lg overflow-hidden"
            style={{ aspectRatio: "16/9", background: "var(--muted)" }}
          >
            <img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: "1px solid var(--border)" }} />

      {/* Description */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="grid grid-cols-[120px_1fr] gap-12">
          <p
            className="text-xs tracking-[0.12em] uppercase pt-1"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
          >
            Overview
          </p>
          <div
            className="text-base font-light leading-relaxed whitespace-pre-line"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-sans)" }}
          >
            {project.description}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6" style={{ borderTop: "1px solid var(--border)" }} />

      {/* Highlights */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="grid grid-cols-[120px_1fr] gap-12">
          <p
            className="text-xs tracking-[0.12em] uppercase pt-1"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-sans)" }}
          >
            Highlights
          </p>
          <ul className="space-y-4">
            {project.highlights.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent-warm)" }}
                />
                <span
                  className="text-base font-light leading-relaxed"
                  style={{ color: "var(--foreground)", fontFamily: "var(--font-sans)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* External link */}
      {project.externalUrl && (
        <>
          <div className="max-w-3xl mx-auto px-6" style={{ borderTop: "1px solid var(--border)" }} />
          <section className="max-w-3xl mx-auto px-6 py-14">
            <div className="grid grid-cols-[120px_1fr] gap-12 items-center">
              <div />
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                style={{ color: "var(--accent-warm)", fontFamily: "var(--font-sans)" }}
              >
                Visit {project.name}
                <ExternalLink size={13} />
              </a>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
