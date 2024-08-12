module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-color": "#0a192f",
        "secondary-color": "#68d391",
        "light-theme-bg": "#fff",
        "text-color-dark": "#d1d5db",
        "accent-color-light": "#8892b0",
        "accent-color-dark": "#111",
      },
      animation: {
        "loop-scroll": "loop-scroll 50s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const extendUnderline = {
        ".underline": {
          textDecoration: "underline",
          "text-decoration-color": "#fff",
          "text-decoration-thickness": "2.5px",
        },
      };
      addUtilities(extendUnderline);
    },
    require("tailwind-scrollbar-hide"),
  ],
};
