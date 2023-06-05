/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        'ebony-clay': {
          '50': '#f3f6f8',
          '100': '#e1e9ec',
          '200': '#c6d4db',
          '300': '#9fb6c1',
          '400': '#7090a0',
          '500': '#557485',
          '600': '#496071',
          '700': '#40525e',
          '800': '#3a4650',
          '900': '#343d45',
          '950': '#1f262d',
        },
        backgroundImage:{
          'elden-ring': "url('../public/elden-ring.jpg')",
        }
      }
    },
  },
  plugins: [],
}

