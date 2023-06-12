/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gbxd': {
          '50': '#1D242B',
        },
        backgroundImage:{
          'elden-ring': "url('../public/elden-ring.jpg')",
        }
      }
    },
  },
  plugins: [],
}

