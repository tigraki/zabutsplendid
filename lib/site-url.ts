/**
 * Public base URL of the site, used for canonical, hreflang and Open Graph URLs.
 * Defaults to the live domain. NEXT_PUBLIC_SITE_URL overrides it (Vercel project settings
 * or .env.local); it is read at build time, so a change needs a redeploy.
 * www is used because the bare domain 308-redirects to it on Vercel.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.zabutsplendid.com').replace(/\/+$/, '');
