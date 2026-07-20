import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://aldairtosayh.github.io',
  base: '/',
  output: 'static',
  integrations: [react(), tailwind()],
  vite: {
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/node_modules/three/')) return 'three-core';
            if (id.includes('/node_modules/@react-three/fiber/')) return 'react-three-fiber';
            if (id.includes('/node_modules/@react-three/drei/') || id.includes('/node_modules/three-stdlib/')) return 'react-three-drei';
          },
        },
      },
    },
  },
});
