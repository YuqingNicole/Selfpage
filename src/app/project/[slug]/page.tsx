import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { getProjectBySlug } from '@/data/projects';
import { notFound } from 'next/navigation';
import ProjectDetailPage from '@/views/ProjectDetail';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return pageMetadata(`/project/${slug}`, {
    title: project.title,
    description: project.description,
    openGraph: { images: [project.coverImage] },
    twitter: { images: [project.coverImage] },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();
  return <ProjectDetailPage />;
}
