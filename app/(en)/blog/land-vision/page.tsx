import { PageView } from '@/components/pages';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata('en', 'post-land-vision');

export default function Page() {
  return <PageView lang="en" page="post-land-vision" />;
}
