/* eslint-disable @typescript-eslint/no-explicit-any */
import { css, SerializedStyles } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import { TwStyle } from 'twin.macro';

import { isNullOrUndefined } from '../assertion';
import * as tailwindConfig from './tailwind.config';
import { replaceTailwindUnit, toEM } from './tailwind-unit-replace';

export function mapStyles<T = Record<string, (TwStyle | string | SerializedStyles)[]>>(
  styles: T,
): Record<keyof T, SerializedStyles> {
  return Object.entries(styles).reduce((obj, [key, value]) => Object.assign(obj, { [key]: css(value) }), {}) as Record<
    keyof typeof styles,
    SerializedStyles
  >;
}

export function getStylesObject<T = Record<string, SerializedStyles>>(
  styles: T,
  disableDefaultStyles: boolean,
): Partial<T> {
  if (disableDefaultStyles) {
    return {} as Partial<T>;
  }

  return styles;
}

export function inferStylesObjectKeys<T, K = (TwStyle | string | SerializedStyles)[]>(obj: T): Record<keyof T, K> {
  return (obj as unknown) as Record<keyof T, K>;
}

export function filterProps(props?: Record<string, any>): Record<string, any> {
  if (isNullOrUndefined(props)) {
    return {};
  }

  return Object.entries(props).reduce((current, [key, value]) => {
    if (isPropValid(key)) {
      return { ...current, [key]: value };
    }
    return current;
  }, {});
}

const tailwindConfigEM = replaceTailwindUnit({
  exclude: ['fontFamily'],
  replacer: toEM,
})(tailwindConfig.default);

export { tailwindConfigEM as tailwindConfig };
export { default as styled } from './styled';
export { default as ThemeProvider } from './theming';
export { ThemeProviderProps, useTheme } from './theming';
