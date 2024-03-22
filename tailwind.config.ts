import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      boxShadow: {
        grey: '0 0 20px #47505A',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        flip: {
          to: {
            transform: 'rotate(360deg)',
          },
        },
        rotate: {
          to: {
            transform: 'rotate(90deg)',
          },
        },
        'text-gradient': {
          to: {
            backgroundPosition: '200% center',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        flip: 'flip 6s infinite steps(2, end)',
        rotate: 'rotate 3s linear infinite both',
        'text-gradient': 'text-gradient 2.5s linear infinite',
      },
      colors: {
        eerie: {
          dark: '#15181B',
          light: '#1A1D21',
        },
        metal: '#1E2226',
        pearl: {
          light: '#7ACCB8',
          dark: '#5C9E8A',
        },
        grey: '#47505A',
        'chinese-black': '#111315',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
