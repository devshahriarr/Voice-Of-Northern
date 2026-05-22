/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Navy / Dark Blue backgrounds
        navy: {
          950: '#020617', // Custom deep navy background
          900: '#0f172a', // Custom navy surface
          800: '#1e293b', // Custom dark blue panel
          700: '#334155',
        },
        // Accents: Cyan / Glow Blue
        glow: {
          500: '#06b6d4', // Cyan 500 for normal accents
          600: '#0891b2', // Cyan 600 for hover state
          700: '#0369a1', // Sky 700 for active state
        },
        // Protest/Warning: Orange / Red
        protest: {
          orange: '#f97316', // Orange 500 for warning/protest
          red: '#ef4444', // Red 500 for critical alert/danger
        }
      }
    },
  },
  plugins: [],
}
