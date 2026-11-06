// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://khyr.my.id',
  output: 'static',
  trailingSlash: 'always',
  // Fetch pages on hover/focus so the transition starts the moment a link is clicked.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: { prefixDefaultLocale: false },
  },
});
