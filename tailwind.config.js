/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // Premium Purple
        accent: '#E0E7FF', // Soft Blue
        background: '#F8FAFC', // Off-white clean bg
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        malayalam: ['Manjari', 'sans-serif'],
      },
      boxShadow: {
        'floating': '0 10px 40px -10px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
