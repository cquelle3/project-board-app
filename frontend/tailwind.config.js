/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand"]
      },
      height: {
        '5-screen': '5vh',
        '10-screen': '10vh',
        '15-screen': '15vh',
        '20-screen': '20vh',
        '80-screen': '80vh',
        '85-screen': '85vh',
        '90-screen': '90vh',
        '95-screen': '95vh'
      }
    },
  },
  plugins: [],
}

