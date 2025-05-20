/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      borderColor: {
        custom: "hsl(263, 70%, 50%)", // Custom border color
      },
    },
  },
  plugins: [],
};
