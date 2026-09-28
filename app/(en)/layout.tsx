import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';

/** Root layout for English, served at the site root with no prefix. */
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
