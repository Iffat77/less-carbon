/** @type {import('tailwindcss').Config} */ 
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'righteous':['Righteous','sans-serif'],
      'work': ['Work Sans', 'sans-serif'],
      'kanit': ['Kanit', 'sans-serif'],
      'michroma': ['Michroma', 'sans-serif'],
      'saira': ['Saira', 'sans-serif'],
      'wix-made': ['Wix Madefor Text', 'sans-serif'],
      'zilla':['Zilla Slab', 'sans-serif' ],

    },
    extend: {
      colors: {
        neonGreen: '#39ff14',
      },
      backgroundImage: {
        'hero': "url('./assets/apexstratsbg.jpg')",
        'airbot': "url('./assets/airqualbot.jpg')"
      },
    },
  },
  plugins: [],
}