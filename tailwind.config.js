/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'text-secondary': '#a1a1aa', // Adjust to match your theme
        'accent-purple': '#a855f7',
        
      },
      // Your current code
      backgroundColor: "rgba(18, 18, 26, 0.8)",
      boxShadow: {
        // This creates the "glass" edge effect
        'glass': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 4px 30px rgba(0, 0, 0, 0.1)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #c084fc, #a855f7)',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'], // Or whatever font you use for the logo
      }
    },
  },
  plugins: [],
}