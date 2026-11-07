// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site lives at https://putu-studio.github.io (a GitHub "user site"),
// so no `base` path is needed.
export default defineConfig({
  site: 'https://putu-studio.github.io',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
