export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rift: {
          950: '#0b0f17',
          900: '#111722',
          850: '#17202e',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          gold: {
            light: '#fde68a',
            DEFAULT: '#d97706',
            dark: '#92400e',
            hover: '#b45309',
          },
          cyan: {
            DEFAULT: '#0284c7',
            dark: '#0369a1',
          }
        }
      }
    },
  },
  plugins: [],
}
