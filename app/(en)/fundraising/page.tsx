import { PageView } from '@/components/pages';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata('en', 'fundraising');

export default function Page() {
  return <PageView lang="en" page="fundraising" />;
}
