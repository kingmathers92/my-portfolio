module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "light-theme-bg": "var(--light-theme-bg)",
        "accent-color-light": "var(--accent-color-light)",
        "accent-color-dark": "var(--accent-color-dark)",
        "text-color-dark": "var(--text-color-dark)",
        "text-color-light": "var(--text-color-light)",
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
