/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main: "#0d53bb",
        bold: "#938073",
        light: "#e2d5cc42",
        background: "#f1f3f7",
        icon: "#0000009c"
      }
    },
    screens:{
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px'
    },
  },
  plugins: [],
}

