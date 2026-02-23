/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-blue': '#0A58CA',
                'light-blue': '#E8F0FE',
                'dark-blue': '#003282',
                'primary-red': '#DC3545',
                'bg-gray': '#F8F9FA',
            }
        },
    },
    plugins: [],
}
