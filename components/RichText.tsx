import { Fragment } from 'react';
import type { RichText as RichTextValue } from '@/content/types';
import { contact } from '@/content/shared';

/** Renders copy in which `{email}` stands for the contact address as a mailto link. */
export function RichText({ text }: { text: RichTextValue }) {
  const parts = text.split('{email}');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
    </Fragment>
  ));
}
