import type { Metadata } from 'next';
import { PageView } from '@/components/pages';
import { localizedLang } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildMetadata(localizedLang((await params).lang), 'contact');
}

export default async function Page({ params }: Props) {
  return <PageView lang={localizedLang((await params).lang)} page="contact" />;
}
