import createCache from "@emotion/cache";

import { replaceAll } from "../utils/string";

const disablePrefix = ["letter-spacing"];

const cache = createCache({
  stylisPlugins: (context, content, selectors) => {
    const [selector] = selectors;

    if (selector && selector.endsWith("*")) {
      return content;
    }

    switch (context) {
      case 1:
        return `${content} !important`;

      case 3:
        if (
          selector === "@font-face" ||
          (selector.startsWith("@") && selector.includes("keyframes"))
        ) {
          return replaceAll(content, " !important", "");
        }

        return content;

      default:
        return content;
    }
  },
  prefix: key => !disablePrefix.includes(key)
});

export default cache;
