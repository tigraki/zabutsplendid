import { PageView } from '@/components/pages';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata('en', 'home');

export default function Page() {
  return <PageView lang="en" page="home" />;
}
