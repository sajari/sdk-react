import React from 'react';
import { ThemeStyle } from 'twin.macro';

export interface ColorProps {
  /** The identifier of the color */
  id: string;
  /** Background color */
  bg: string | ThemeStyle;
  /** Check icon color */
  color: string | ThemeStyle;
  /** Border color, defaults to background color */
  border?: string | ThemeStyle;
}

export interface SwatchProps {
  /** List of <Swatch.Color /> */
  children: React.ReactNode;
  /** On change handler */
  onChange: (checkedColors: string[]) => void;
  /** Default checked colors */
  checkedColors?: string[];
}
