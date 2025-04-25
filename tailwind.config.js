/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue', // Include the root Vue file
    './components/**/*.{vue,js,ts}', // Include components
    './pages/**/*.{vue,js,ts}', // Include pages
    './layouts/**/*.{vue,js,ts}', // Include layouts
    './plugins/**/*.{js,ts}', // Include plugins
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

