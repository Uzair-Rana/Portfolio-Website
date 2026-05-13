export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#38bdf8',         // existing
        accent: '#a78bfa',          // existing
        secondary: '#f472b6',       // new vibrant pink
        highlight: '#facc15',       // new yellow accent
        backgroundLight: '#f5f5f5', // subtle light background
        backgroundDark: '#0f172a',  // deep dark background
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
        heroGradient: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
        sectionGradient: "linear-gradient(135deg, #38bdf8 0%, #f472b6 100%)",
        glass: "rgba(255, 255, 255, 0.1)",
      },
      boxShadow: {
        soft: '0 4px 30px rgba(0, 0, 0, 0.1)',
        glow: '0 0 15px rgba(56, 189, 248, 0.5)',
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out forwards',
        slideUp: 'slideUp 0.8s ease-in-out forwards',
        bounceIn: 'bounceIn 1s ease-in-out forwards',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '60%': { transform: 'scale(1.2)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
};
