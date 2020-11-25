import { css, SerializedStyles } from '@emotion/core';
import { TwStyle } from 'twin.macro';

export function mapStyles<T = Record<string, (TwStyle | string)[]>>(styles: T): Record<keyof T, SerializedStyles> {
  return Object.entries(styles).reduce((obj, [key, value]) => Object.assign(obj, { [key]: css(value) }), {}) as Record<
    keyof typeof styles,
    SerializedStyles
  >;
}

export function getStylesObject<T = Record<string, SerializedStyles>>(styles: T, disableDefaultStyles: boolean) {
  if (disableDefaultStyles) {
    return {} as Partial<T>;
  }

  return styles;
}

export { default as styled } from './styled';
export { default as tailwindConfig } from './tailwind.config';
export { default as ThemeProvider } from './theming';
export { ThemeProviderProps, useTheme } from './theming';
