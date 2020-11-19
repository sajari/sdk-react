import { css, SerializedStyles } from '@emotion/core';
import { TwStyle } from 'twin.macro';

export function mapStyles(styles: Record<string, (TwStyle | string)[]>): Record<string, SerializedStyles> {
  return Object.entries(styles).reduce((obj, [key, value]) => Object.assign(obj, { [key]: css(value) }), {}) as Record<
    keyof typeof styles,
    SerializedStyles
  >;
}
export { default as styled } from './styled';
export { default as tailwindConfig } from './tailwind.config';
export { default as ThemeProvider } from './theming';
export { ThemeProviderProps, useTheme } from './theming';
