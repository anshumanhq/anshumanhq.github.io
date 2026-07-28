import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://anshumanhq.github.io',
  base: '/',
  integrations: [tailwind()],
});
