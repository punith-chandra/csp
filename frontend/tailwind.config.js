/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1b4332',
          primary: '#2d6a4f',
          teal: '#0f766e',
          lightTeal: '#0d9488',
          accent: '#52b788',
          softGreen: '#74c69d',
          paleGreen: '#d8f3dc',
          bgLight: '#f8fafc',
          card: '#ffffff',
          charcoal: '#1e293b',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'premium': '0 10px 30px -5px rgba(27, 67, 50, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'hover-card': '0 20px 40px -10px rgba(45, 106, 79, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 25px rgba(82, 183, 136, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        }
      }
    },
  },
  plugins: [],
}
