/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#0b0f19",
          slate: "#0f172a",
          navy: "#1e1b4b",
          midnight: "#1e1435",
          cyan: "#38bdf8",
          neonCyan: "#06b6d4",
          blue: "#3b82f6",
          purple: "#a855f7",
          indigo: "#6366f1",
          gold: "#f59e0b",
          amber: "#fbbf24",
          emerald: "#10b981",
          green: "#22c55e",
          rose: "#f43f5e",
          coral: "#ef4444",
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(56, 189, 248, 0.4), 0 0 40px rgba(56, 189, 248, 0.2)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(99, 102, 241, 0.3)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-gold': '0 0 15px rgba(245, 158, 11, 0.5)',
        'glow-emerald': '0 0 15px rgba(34, 197, 94, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(56, 189, 248, 0.8)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '70%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gearRotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'float 9s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s infinite',
        bounceIn: 'bounceIn 0.4s ease-out forwards',
        gearSpin: 'gearRotate 12s linear infinite',
      }
    },
  },
  plugins: [],
}
