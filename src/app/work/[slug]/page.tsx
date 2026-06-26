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
  return {
    title: `${project.name} — Nicole`,
    description: project.summary,
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <WorkDetail project={project} />;
}
