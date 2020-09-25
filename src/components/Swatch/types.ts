import { ChangeEvent } from "react";

export interface ColorProps {
  /** The identifier of the color */
  id: string;
  /** Background color */
  bg: string;
  /** Check icon color */
  color: string;
  /** Border color, defaults to background color */
  border?: string;
}

export interface SwatchProps {
  /** List of <Swatch.Color /> */
  children: React.ReactNode;
  /** On change handler */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Currently checked colors */
  checkedColors?: string[];
}
