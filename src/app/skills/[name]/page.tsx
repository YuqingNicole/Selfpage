import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { claudeSkills } from '@/data/claude-skills';
import { notFound } from 'next/navigation';
import SkillDetailPage from '@/views/SkillDetail';

function findSkill(name: string) {
  try { return claudeSkills.find((skill) => skill.name === decodeURIComponent(name)); }
  catch { return undefined; }
}

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const skill = findSkill(name);
  if (!skill) return { title: 'Skill Not Found' };
  return pageMetadata(`/skills/${skill.name}`, {
    title: `/${skill.name} — Claude Skill`,
    description: skill.description,
  });
}

export default async function Page({ params }: Props) {
  const { name } = await params;
  const skill = findSkill(name);
  if (!skill) notFound();
  return <SkillDetailPage initialSkill={skill} />;
}
