import * as React from 'react';

import { BoxProps } from '../Box';
import { UseInputStyleProps } from '../hooks';

type HtmlAttributes = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof Props | 'size'>;

interface Props extends BoxProps {
  /** The state when entering an invalid input */
  invalid?: boolean;
  /** An aria-label, also used for the placeholder if not specified */
  label?: string;
  /** The size of the select */
  size?: UseInputStyleProps['size'];
}

export interface SelectProps extends HtmlAttributes, Props {}
