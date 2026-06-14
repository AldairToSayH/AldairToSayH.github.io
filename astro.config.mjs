import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://aldairtosayh.github.io',
  base: '/',
  output: 'static',
  integrations: [react(), tailwind()],
});
