import { CacheProvider } from "@emotion/core";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import React from "react";
import { merge } from "../utils/object";
import cache from "./cache";

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface Theme {
  color: {
    primary: string;
  };
}

const defaultTheme: Theme = {
  color: { primary: "#3f83f8" }
};

interface ThemeProviderProps {
  important?: boolean;
  theme?: DeepPartial<Theme>;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = defaultTheme,
  important = true,
  children
}) => (
  <EmotionThemeProvider theme={merge(defaultTheme, theme)}>
    {important ? (
      <CacheProvider value={cache}>{children}</CacheProvider>
    ) : (
      children
    )}
  </EmotionThemeProvider>
);

export default ThemeProvider;
