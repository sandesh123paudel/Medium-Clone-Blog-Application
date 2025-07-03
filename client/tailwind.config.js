// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Replace 'Sohne' with the actual font-family name provided by your font service
        // You might also need a fallback, e.g., sans-serif
        poppins: ["Poppins", "sans-serif"],
        // Example for variable fonts, might be 'sohne-var'
        // sohne: ['"sohne-var"', 'sans-serif'],
      },
     
    },
  },
  plugins: [],
};
