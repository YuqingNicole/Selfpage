import { pageMetadata } from '@/lib/seo';
import Home from '@/views/Home';

export const metadata = pageMetadata('/', { title: { absolute: 'Nicole Chen — Digital Garden' } });

export default function Page() {
  return <Home />;
}
