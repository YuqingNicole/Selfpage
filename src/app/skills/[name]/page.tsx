import type { Metadata } from 'next';
import { claudeSkills } from '@/data/claude-skills';
import SkillDetailPage from '@/views/SkillDetail';

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const skill = claudeSkills.find((s) => s.name === name);
  if (!skill) return { title: 'Skill Not Found' };
  return {
    title: skill.name,
    description: skill.description,
  };
}

export default function Page() {
  return <SkillDetailPage />;
}
