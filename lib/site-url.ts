/**
 * Public base URL of the site, used for canonical, hreflang and Open Graph URLs.
 * Set NEXT_PUBLIC_SITE_URL in the environment (Vercel project settings / .env);
 * switching to the real domain is that one change.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://zabutsplendid.vercel.app').replace(/\/+$/, '');
