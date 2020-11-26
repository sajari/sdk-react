import React from 'react';

import { UseTextSizeParams } from '../hooks/useTextSize';

interface Props {
  /** Visually hidden label */
  visuallyHidden?: boolean;
  /** The ID of the input associated to the label */
  htmlFor: string;
  /** Specify the size of the type */
  size?: UseTextSizeParams['size'];
}

export interface LabelProps extends Props, React.HTMLAttributes<HTMLLabelElement> {}
