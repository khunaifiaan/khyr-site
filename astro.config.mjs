// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://khyr.my.id',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: { prefixDefaultLocale: false },
  },
});
