'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { claudeSkills } from '@/data/claude-skills';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/data/translations';

export default function SkillDetail() {
  const params = useParams();
  const name = params?.name as string;
  const skill = claudeSkills.find(s => s.name === name);
  const { lang } = useLanguage();
  const tr = t[lang].skillDetail;

  if (!skill) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-muted-foreground mb-6">Skill <code className="font-mono">/{name}</code> not found.</p>
        <Link
          href="/portfolio"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="size-3.5" />
          {tr.back}
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`/${skill.name} — Claude Skill`}
        description={skill.description}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: `How to use /${skill.name} Claude Skill`,
          description: skill.description,
          url: `https://nicoles.garden/skills/${skill.name}`,
          step: [{
            '@type': 'HowToStep',
            name: 'Activate the skill',
            text: `Type /${skill.name} in Claude Code to activate this skill.`,
          }],
          keywords: skill.tags.join(', '),
        }}
      />

      <div className="min-h-screen">
        <section className="py-24 md:py-32 px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
              >
                <ArrowLeft className="size-3.5" />
                {tr.back}
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-0.5 text-xs border border-border rounded text-muted-foreground">
                  {skill.category}
                </span>
              </div>
              <h1 className="font-mono text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
                /{skill.name}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                {skill.description}
              </p>
            </motion.div>

            {/* Tags */}
            {skill.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2 flex-wrap mb-10"
              >
                <Tag className="size-3.5 text-muted-foreground/60 shrink-0" />
                {skill.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-full border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}

            {/* How to use */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-lg border border-border bg-card p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="size-4 text-muted-foreground" />
                <h2 className="text-sm font-medium tracking-wide">{tr.howToUse}</h2>
              </div>
              <div className="bg-background rounded border border-border px-4 py-3 font-mono text-sm text-primary mb-3">
                /{skill.name}
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {tr.howToUseBody} <span className="text-foreground font-medium">Claude Code</span> {tr.howToUseBodyMid}
              </p>
            </motion.div>

            {/* Trigger hint */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h2 className="text-sm font-medium tracking-wide mb-3">{tr.whenToTrigger}</h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                This skill is in the <span className="text-foreground font-medium">{skill.category}</span> category. Use it when you need {skill.description.toLowerCase().replace(/\.$/, '')}.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
