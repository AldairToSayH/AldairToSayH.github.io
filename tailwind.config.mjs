/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0F',
        card: '#12121A',
        'border-dim': '#1E1E2E',
        violet: '#6C63FF',
        teal: '#00D4AA',
        'text-prime': '#F0F0F0',
        'text-muted': '#8A8A9A',
        'glow-v': '#6C63FF33',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-v': '0 0 20px #6C63FF44',
        'glow-t': '0 0 20px #00D4AA44',
      },
      backgroundImage: {
        'radial-violet': 'radial-gradient(circle at center, #6C63FF33, transparent 38%)',
      },
    },
  },
  plugins: [],
};
