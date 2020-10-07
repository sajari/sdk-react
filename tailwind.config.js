module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {}
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus", "focus-within"],
    textColor: ["responsive", "hover", "focus", "group-hover", "group-focus"],
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "checked",
      "group-hover",
      "group-focus"
    ],
    borderColor: ["responsive", "hover", "focus", "checked"]
  },
  plugins: [require("@tailwindcss/ui")]
};
