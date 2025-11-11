/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#0066CC',
                secondary: '#00A3E0',
                dark: '#1a1a1a',
            }
        },
    },
    plugins: [],
}