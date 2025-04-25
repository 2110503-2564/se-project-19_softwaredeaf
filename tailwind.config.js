/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dots: {
          "0%, 20%":   { content: "'...'" }, // ●●●
          "40%":       { content: "'..'" },  // ●●
          "60%":       { content: "'.'" },   // ●
          "80%, 100%": { content: "''" },    // none
        },
      },
      animation: {
        dots: "dots 1s steps(4,end) infinite",
      },
    },
  },
  plugins: [],
};
