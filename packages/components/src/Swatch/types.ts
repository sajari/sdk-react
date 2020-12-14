import React from 'react';

import { BoxProps } from '../Box';
import { BorderRadiusParams } from '../hooks';

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
  rounded?: BorderRadiusParams['rounded'];
  /** The classname for the color box being checked */
  checkedClassName?: string;
}

export interface SwatchProps extends BoxProps {
  /** List of <Swatch.Color /> */
  children: React.ReactNode;
  /** On change handler */
  onChange?: (checkedColors: string[]) => void;
  /** Default checked colors */
  checkedColors?: string[];
  /** The classname for color */
  colorClassName?: string;
  /** The classname for color that is being checked */
  colorCheckedClassName?: string;
}
