import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD700',
          dark: '#E6C200',
          light: '#FFE44D',
        },
        background: {
          light: '#FFFFFF',
          dark: '#0A0A0A',
        },
        surface: {
          light: '#F5F5F5',
          dark: '#1A1A1A',
        },
        card: {
          light: '#FFFFFF',
          dark: '#141414',
        },
        text: {
          light: '#0A0A0A',
          dark: '#FFFFFF',
        },
        muted: {
          light: '#6B7280',
          dark: '#9CA3AF',
        },
      },
      fontFamily: {
        digital: ['Digital7', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'counter': ['4rem', { lineHeight: '1' }],
        'counter-lg': ['5rem', { lineHeight: '1' }],
        'counter-xl': ['6rem', { lineHeight: '1' }],
      },
      animation: {
        'roll-up': 'rollUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'count-up': 'countUp 2s ease-out',
      },
      keyframes: {
        rollUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
