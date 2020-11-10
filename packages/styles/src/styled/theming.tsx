import { CacheProvider } from '@emotion/core';
import { ThemeProvider as EmotionThemeProvider, useTheme as useEmotionTheme } from 'emotion-theming';
import * as React from 'react';
import { theme as twTheme } from 'twin.macro';

import { merge } from '../utils/object';
import cache from './cache';

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface Theme {
  color: {
    primary: {
      base: string;
      text: string;
      active: string;
    };
  };
}

const defaultTheme: Theme = {
  color: {
    primary: {
      base: twTheme`colors.indigo.500`,
      text: twTheme`colors.white`,
      active: twTheme`colors.indigo.600`,
    },
  },
};

export const useTheme = () => useEmotionTheme<Theme>();

export interface ThemeProviderProps {
  importantStyles?: boolean;
  theme?: DeepPartial<Theme>;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme = defaultTheme, importantStyles = true, children }) => (
  <EmotionThemeProvider theme={merge(defaultTheme, theme)}>
    {importantStyles ? <CacheProvider value={cache}>{children}</CacheProvider> : children}
  </EmotionThemeProvider>
);

export default ThemeProvider;
