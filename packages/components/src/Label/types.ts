import * as React from 'react';

import { BoxProps } from '../Box';
import { UseFontSizeParams } from '../hooks';

interface Props extends BoxProps {
  /** Visually hidden label */
  visuallyHidden?: boolean;
  /** The ID of the input associated to the label */
  htmlFor: string;
  /** Specify the size of the type */
  size?: UseFontSizeParams['size'];
}

export interface LabelProps extends Props, React.HTMLAttributes<HTMLLabelElement> {}
