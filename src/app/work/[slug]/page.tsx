import { pageMetadata } from '@/lib/seo';
import { workProjects } from "@/data/workProjects";
import { WorkDetail } from "@/views/WorkDetail";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return workProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata(`/work/${slug}`, {
    title: `${project.name} — Nicole`,
    description: project.summary,
  });
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <div lang="zh-CN"><WorkDetail project={project} /></div>;
}
