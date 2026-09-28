import type { Lang } from '@/content/types';
import { contact, signupUrl } from '@/content/shared';
import { getContent } from '@/lib/i18n';

export function ContactPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).pages.contact;
  return (
    <section className="page" data-page="contact" id="page-contact">
      <div className="page-intro wrap">
        <div className="label">{c.label}</div>
        <h1 id="contactH1">{c.title}</h1>
        <p id="contactIntro">{c.intro}</p>
      </div>
      <div className="wrap">
        <div className="form-block">
          <a className="cta" href={signupUrl[lang]}>
            {c.signupCta}
          </a>
        </div>
        <div className="contact-details">
          <div>
            <div className="label">{c.emailLabel}</div>
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
          <div>
            <div className="label">{c.followLabel}</div>
            <p>
              <a href={contact.instagramUrl} target="_blank" rel="noopener">
                {contact.instagramHandle}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
