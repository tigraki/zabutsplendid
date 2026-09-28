import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { RootDocument } from '@/components/RootDocument';
import { isLang, PREFIXED_LANGS } from '@/lib/i18n';

/** Root layout for the prefixed languages: /it/..., /tr/... */
export function generateStaticParams() {
  return PREFIXED_LANGS.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang) || lang === 'en') notFound();
  return <RootDocument lang={lang}>{children}</RootDocument>;
}
