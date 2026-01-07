/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['EB Garamond', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'EB Garamond, Georgia, serif',
            h1: { fontFamily: 'EB Garamond, Georgia, serif' },
            h2: { fontFamily: 'EB Garamond, Georgia, serif' },
            h3: { fontFamily: 'EB Garamond, Georgia, serif' },
            h4: { fontFamily: 'EB Garamond, Georgia, serif' },
            h5: { fontFamily: 'EB Garamond, Georgia, serif' },
            h6: { fontFamily: 'EB Garamond, Georgia, serif' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}