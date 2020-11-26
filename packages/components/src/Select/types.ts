import React from 'react';

import { UseInputStyleProps } from '../hooks/useInputStyles';

type HtmlAttributes = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof Props | 'size'>;

interface Props {
  /** The state when entering an invalid input */
  invalid?: boolean;
  /** An aria-label, also used for the placeholder if not specified */
  label?: string;
  /** The size of the select */
  size?: UseInputStyleProps['size'];
}

export interface SelectProps extends HtmlAttributes, Props {}
