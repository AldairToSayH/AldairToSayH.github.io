/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        card: '#090909',
        raised: '#111111',
        'border-dim': '#242424',
        violet: '#6C63FF',
        teal: '#00D4AA',
        'text-prime': '#F0F0F0',
        'text-muted': '#929292',
        'glow-v': '#6C63FF33',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-v': '0 18px 48px #6C63FF18',
        'glow-t': '0 18px 48px #00D4AA14',
      },
      backgroundImage: {
        'radial-violet': 'radial-gradient(circle at center, #6C63FF33, transparent 38%)',
      },
    },
  },
  plugins: [],
};
