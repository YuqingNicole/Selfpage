import { pageMetadata } from '@/lib/seo';
import { Work } from "@/views/Work";

export const metadata = pageMetadata('/work', {
  title: "Work — Nicole",
  description: "Projects, experience, and things I've built.",
});

export default function WorkPage() {
  return <Work />;
}
