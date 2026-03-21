import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e6ecf3',
          100: '#cdd9e7',
          200: '#9bb3cf',
          300: '#698db7',
          400: '#37679f',
          500: '#0E3460',
          600: '#0b2a4d',
          700: '#081f3a',
          800: '#061527',
          900: '#030a13',
        },
        teal: {
          50: '#e6f4f6',
          100: '#cde9ee',
          200: '#9bd3dc',
          300: '#69bdcb',
          400: '#37a7b9',
          500: '#0E7490',
          600: '#0b5d73',
          700: '#084656',
          800: '#062f3a',
          900: '#03171d',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
