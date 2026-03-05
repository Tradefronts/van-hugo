/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./theme/**/*.liquid"],
  theme: {
    extend: {
      keyframes: {
        "menu-open": {
          "0%": { height: "3.5rem" },
          "100%": { height: "100vh", backgroundColor: "#000000" },
        },
        "menu-close": {
          "0%": { height: "100vh", backgroundColor: "#000000" },
          "100%": { height: "3.5rem" },
        },
        "menu-items-on": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        "menu-items-off": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
      animation: {
        "menu-open": "menu-open 1s ease-out forwards",
        "menu-close": "menu-close 1s ease-out forwards",
        "menu-items-on": "menu-items-on 1s ease-out forwards",
        "menu-items-off": "menu-items-off 1s ease-out forwards",
      },
    },
  },
  plugins: [],
  safelist: [
    "animate-menu-open",
    "animate-menu-close",
    "animate-menu-items-on",
    "animate-menu-items-off",
    // 'border-red-900',

  ],
};
