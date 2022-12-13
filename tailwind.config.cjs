const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "synthwave", "retro",

      {
        lighttheme: {

          "primary": "#f2b7ae",

          "secondary": "#5dd890",

          "accent": "#db81ab",

          "neutral": "#201B27",

          "base-100": "#EEEAF6",

          "info": "#5B7CD7",

          "success": "#125948",

          "warning": "#F8B354",

          "error": "#E87D81",
        },
        darkpinktheme: {

          "primary": "#e567b0",

          "secondary": "#f4b7ba",

          "accent": "#a5f7ab",

          "neutral": "#141B24",

          "base-100": "#3B3748",

          "info": "#88E0F2",

          "success": "#2ED19D",

          "warning": "#A56D0D",

          "error": "#E46278",
        },
        bluetheme: {

          "primary": "#6654b7",

          "secondary": "#ab04dd",

          "accent": "#d123c5",

          "neutral": "#26222A",

          "base-100": "#46474E",

          "info": "#4883CB",

          "success": "#1C8747",

          "warning": "#FAAF2E",

          "error": "#E87398",
        },
        purpletheme: {

          "primary": "#f9aecb",

          "secondary": "#929fe5",

          "accent": "#e07daf",

          "neutral": "#271B27",

          "base-100": "#4F3D5C",

          "info": "#679BE9",

          "success": "#158475",

          "warning": "#C1660B",

          "error": "#F3394F",
        },
        mytheme: {

          "primary": "#f4e004",

          "secondary": "#9df99e",

          "accent": "#5d8407",

          "neutral": "#1D1622",

          "base-100": "#472A4B",

          "info": "#9BB8ED",

          "success": "#52DA87",

          "warning": "#CD7E0E",

          "error": "#E34A7D",
        },
        pinktheme: {

          "primary": "#ff0fcb",

          "secondary": "#f46be9",

          "accent": "#ff7a81",

          "neutral": "#21232C",

          "base-100": "#3C2659",

          "info": "#6EC4DE",

          "success": "#45DEB5",

          "warning": "#9A830E",

          "error": "#F56666",
        },
      },
    ],
  },
  plugins: [forms, typography, daisyui],
};

module.exports = config;
