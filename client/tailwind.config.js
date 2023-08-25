/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#E85B81",
        secondaryHover: "#D35375",
        secondaryActive: "#C04B6A",

        primary: "#7A55EA",
        primaryHover: "#704BDF",
        primaryActive: "#6641D3",

        tertiary: "#58ABBB",
        tertiaryHover: "#509BAA",
        tertiaryActive: "#498D9B",

        success: "#3CE000",
        successHover: "#37CC00",
        successActive: "#32B900",

        warning: "#E80000",
        warningHover: "#D30000",
        warningActive: "#C00000",
      },
    },
  },
  plugins: [],
};
