/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          DEFAULT: '#C4748A',
          light: '#E8C5CF',
          dark: '#A85A70',
        },
        gold: '#C9A96E',
        cream: '#FBF6F3',
        'cream-warm': '#FDF0EF',
        charcoal: '#1A1A1A',
        muted: '#7A7A7A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease both',
        'fade-in': 'fadeIn 0.5s ease both',
        'slide-left': 'slideLeft 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'bounce-in': 'bounceIn 0.6s ease both',
        'float-a': 'floatA 6s ease-in-out infinite',
        'float-b': 'floatB 8s ease-in-out infinite',
        'float-c': 'floatC 5s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        'pulse-rose': 'pulseRose 2.5s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse': 'spinReverse 12s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'none' },
        },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to: { opacity: '1', transform: 'none' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        floatA: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' },
        },
        floatB: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-3deg)' },
        },
        floatC: {
          '0%,100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseRose: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(196,116,138,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(196,116,138,0)' },
        },
        spinReverse: { to: { transform: 'rotate(-360deg)' } },
      },
      boxShadow: {
        rose: '0 8px 32px rgba(196,116,138,0.4)',
        'rose-lg': '0 18px 48px rgba(196,116,138,0.55)',
        card: '0 8px 48px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
