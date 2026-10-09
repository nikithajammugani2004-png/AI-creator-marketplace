/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        auraDark: "#0D0D0D",
        auraCard: "#14121a",
        auraBorder: "rgba(255, 255, 255, 0.08)",
        auraPurple: "#FF7B00",
        auraMagenta: "#E63946",
        auraLavender: "#FFD166"
      },
      boxShadow: {
        auraGlow: "0 0 35px -5px rgba(179, 75, 255, 0.45)",
        magentaGlow: "0 0 35px -5px rgba(219, 56, 209, 0.45)",
        cardEdge: "0 8px 32px 0 rgba(0, 0, 0, 0.5)"
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};