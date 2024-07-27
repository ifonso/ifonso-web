/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        background: "#F4F4F4",
        primary: "#3C3C3B",
        darker: "#2B2626",
        purple: "#DECFEE",
        accent: "#FFC857",
        mint: "#A8D5BA",
        cred: "#F4BABA",
        darkbg: "#191919",
        secondary: "#A09999"
      },
      fontFamily: {
        jet: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
        roboto: ['"Roboto Mono"', ...defaultTheme.fontFamily.mono],
      }
    },
  },
  plugins: [],
}

