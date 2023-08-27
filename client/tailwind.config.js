/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#008060",
        primary: "#394556",
        destructive: "#d82c0d",
        text: "#202223",
        textDisabled: "#8c9196",
        surfaceDisabled: "#fafbfb",
        borderDisabled: "#d2d5d8",
      },
      boxShadow: {
        button: "0 0.0625rem 0 rgba(0,0,0,.05)",
      },
    },
  },
  plugins: [],
};
