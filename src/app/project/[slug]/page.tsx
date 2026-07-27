import type { Metadata } from 'next';
import { getProjectBySlug } from '@/data/projects';
import ProjectDetailPage from '@/views/ProjectDetail';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description,
  };
}

export default function Page() {
  return <ProjectDetailPage />;
}
