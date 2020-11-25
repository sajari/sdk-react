import { CSSObject } from '@emotion/core';

export interface BoxProps {
  children?: React.ReactNode;
  className?: string;
  styles?: CSSObject;
  /** If true, the default styling will be disabled */
  disableDefaultStyles?: boolean;
}
