import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0F172A',
        pure: '#FFFFFF',
        pastelViolet: '#7C3AED',
        lightGray: '#F3F4F6'
      },
      borderRadius: {
        card: '8px'
      },
      boxShadow: {
        card: '0 4px 6px rgba(0,0,0,0.08)'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        pulseSoft: 'pulseSoft 1.8s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out both'
      }
    }
  },
  plugins: []
};

export default config;
