const presets = ["@babel/preset-react", "@babel/preset-stage-3"];

const env = [
  "@babel/preset-env",
  {
    targets: {
      browser: "ie > 9"
    }
  }
];

if (process.env.NODE_ENV === "test" || process.env.BABEL_ENV === "std") {
  presets.push(env);
}

module.exports = {
  presets,
  plugins: ["@babel/plugin-proposal-class-properties"]
};
