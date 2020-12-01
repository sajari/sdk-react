import React from 'react';

import { BoxProps } from '../Box';

interface Props extends BoxProps {
  /** Which logo to use */
  appearance?: 'color' | 'mono';
}

export interface PoweredByProps extends Props, React.HTMLAttributes<HTMLAnchorElement> {}
