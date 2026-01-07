/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['EB Garamond', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Work Sans', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'EB Garamond, Georgia, serif',
            h1: { fontFamily: 'Playfair Display, Georgia, serif' },
            h2: { fontFamily: 'Playfair Display, Georgia, serif' },
            h3: { fontFamily: 'Playfair Display, Georgia, serif' },
            h4: { fontFamily: 'Playfair Display, Georgia, serif' },
            h5: { fontFamily: 'Playfair Display, Georgia, serif' },
            h6: { fontFamily: 'Playfair Display, Georgia, serif' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}