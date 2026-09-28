import type { ReactNode } from 'react';

/** The centred label / h1 / intro block that opens every inner page. */
export function PageIntro({
  label,
  title,
  intro,
  before,
}: {
  label: string;
  title: string;
  intro?: string;
  before?: ReactNode;
}) {
  return (
    <div className="page-intro wrap">
      {before}
      <div className="label">{label}</div>
      <h1>{title}</h1>
      {intro !== undefined && <p>{intro}</p>}
    </div>
  );
}
