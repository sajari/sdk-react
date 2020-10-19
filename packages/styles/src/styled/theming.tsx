import { CacheProvider } from '@emotion/core';
import { ThemeProvider as EmotionThemeProvider, useTheme as useEmotionTheme } from 'emotion-theming';
import * as React from 'react';

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
      base: 'hsl(228, 100%, 66%)',
      text: '#fff',
      active: 'hsl(228, 100%, 60%)',
    },
  },
};

export const useTheme = () => useEmotionTheme<Theme>();

interface ThemeProviderProps {
  importantStyles?: boolean;
  theme?: DeepPartial<Theme>;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme = defaultTheme, importantStyles = true, children }) => (
  <EmotionThemeProvider theme={merge(defaultTheme, theme)}>
    {importantStyles ? <CacheProvider value={cache}>{children}</CacheProvider> : children}
  </EmotionThemeProvider>
);

export default ThemeProvider;
