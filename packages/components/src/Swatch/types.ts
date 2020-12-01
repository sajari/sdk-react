import React from 'react';

import { BoxProps } from '../Box';

export interface ColorProps extends BoxProps {
  /** The identifier of the color */
  id: string;
  /** Background color */
  bg: string;
  /** Check icon color */
  color?: string;
  /** Border color, defaults to background color */
  border?: string;
  /** Border radius */
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  /** The classname for the color box being checked */
  checkedClassName?: string;
}

export interface SwatchProps extends BoxProps {
  /** List of <Swatch.Color /> */
  children: React.ReactNode;
  /** On change handler */
  onChange: (checkedColors: string[]) => void;
  /** Default checked colors */
  checkedColors?: string[];
}
