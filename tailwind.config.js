export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        primary: '#6366f1',         // Indigo
        accent: '#ec4899',          // Pink
        secondary: '#8b5cf6',       // Violet
        highlight: '#10b981',       // Emerald
        backgroundLight: '#f8fafc',
        backgroundDark: '#020617',  // Slate 950
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        heroGradient: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
        sectionGradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        glass: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
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
