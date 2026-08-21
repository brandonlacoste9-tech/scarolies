import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: '/:locale/clinic', destination: '/:locale/about', permanent: false },
      { source: '/:locale/services', destination: '/:locale/menu', permanent: false },
      { source: '/:locale/walk-in', destination: '/:locale/takeaway', permanent: false },
      { source: '/:locale/walkin', destination: '/:locale/takeaway', permanent: false },
      { source: '/:locale/team', destination: '/:locale/about', permanent: false },
      { source: '/:locale/a-propos', destination: '/:locale/about', permanent: false },
      { source: '/:locale/horaire', destination: '/:locale/locations', permanent: false },
      { source: '/:locale/restaurant', destination: '/:locale/locations', permanent: false },
      { source: '/:locale/pret-a-manger', destination: '/:locale/takeaway', permanent: false },
      { source: '/:locale/accueil-pretamanger', destination: '/:locale/takeaway', permanent: false },
      { source: '/:locale/careers', destination: '/:locale/about', permanent: false },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
