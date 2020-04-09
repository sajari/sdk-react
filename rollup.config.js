import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const IS_DEV = process.env.NODE_ENV !== "production";

const input = "src/index.ts";

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies)
];

const plugins = [
  resolve(),
  commonjs({
    namedExports: {
      react: [
        "PureComponent",
        "Component",
        "createElement",
        "Fragment",
        "createFactory",
        "Children"
      ],
      "react-dom": ["findDOMNode", "createPortal"]
    }
  }),
  typescript({
    typescript: require("typescript")
  }),
  babel({
    exclude: "node_modules/**" // only transpile our source code
  })
];

export default {
  input,
  external,
  output: [
    IS_DEV ? undefined : { file: pkg.main, format: "cjs" },
    IS_DEV
      ? undefined
      : { name: "SajariSDKReact", file: pkg["umd:main"], format: "umd" },
    { file: pkg.module, format: "es" }
  ].filter(x => !!x),
  plugins
};
