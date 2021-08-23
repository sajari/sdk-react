import resolveConfig from 'tailwindcss/lib/util/resolveConfig';
import getAllConfigs from 'tailwindcss/lib/util/getAllConfigs';
import type { TailwindConfig } from 'tailwindcss/tailwind-config';

interface Options {
  exclude: (keyof TailwindConfig['theme'])[];
  replacer: (v: string) => string;
}

// recursively walks object/array to find a string value,
// then apply `replacer` to it
export function processTheme(
  theme: Record<string, {} | string>,
  { exclude, replacer }: Omit<Options, 'exclude'> & { exclude: string[] },
) {
  let replacedTheme = theme; // might need to deep clone this, but seems unecessary
  // also work for array
  for (const [key, value] of Object.entries(replacedTheme)) {
    if ((exclude ?? []).includes(key)) continue;

    let val = value;
    switch (typeof value) {
      case 'object':
        val = processTheme(value, { exclude, replacer });
        break;
      case 'string':
        val = replacer(value);
        break;
    }
    replacedTheme[key] = val;
  }

  return replacedTheme;
}

export const replaceTailwindUnit = (opts: Options) => (userConfig: TailwindConfig): TailwindConfig => {
  // mimics the way Tailwind resolve user's config
  // https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/resolveConfig.js#L259
  // https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/getAllConfigs.js
  const { theme, ...config } = resolveConfig([...getAllConfigs(userConfig)]);
  return {
    ...config,
    theme: processTheme(theme, opts),
  };
};

export function toEM(value: string) {
  // Taken from https://github.com/jesstech/postcss-rem-to-pixel/blob/master/lib/rem-unit-regex.js#L9
  // Not anything inside double quotes
  // Not anything inside single quotes
  // Not anything inside url()
  // Any digit followed by rem
  // !singlequotes|!doublequotes|!url()|remunit
  const remUnitRegex = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d*\.?\d+)rem/g;

  return value.replace(remUnitRegex, (match, remDigit) => {
    // replace REM-contained value
    const amount = Number(remDigit);
    if (Number.isNaN(amount)) {
      return match;
    }
    return `${amount}em`;
  });
}
