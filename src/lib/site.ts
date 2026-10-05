/**
 * Canonical origin for the deployed site.
 *
 * Override at build time so preview and production URLs stay correct without
 * editing source:  NEXT_PUBLIC_SITE_URL=https://your-domain npm run build
 */
const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = (raw && /^https?:\/\//.test(raw) ? raw : "https://ahmedmalik.dev").replace(
  /\/+$/,
  "",
);

export const siteTitle = "Ahmed Malik — Cloud & DevOps Engineer";