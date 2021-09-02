import type { Environment } from 'downshift';
import * as React from 'react';

import { BoxProps } from '../Box';
import { UseInputStyleProps } from '../hooks';
import { OptionProps } from './components/Option/types';

export type Item = OptionProps;

export interface SelectCustomClassNames {
  /** The classnames for the button */
  buttonClassName?: string;
  /** The classnames for dropdown container */
  dropdownClassName?: string;
  /** The classnames for the options */
  optionClassName?: string;
}

interface Props extends BoxProps {
  id?: string;
  /** Whether to autofocus the select */
  autofocus?: boolean;
  /** The select should be marked disabled */
  disabled?: boolean;
  /** The select should be marked invalid */
  invalid?: boolean;
  /** An aria-label, also used for the placeholder if not specified */
  label?: string;
  /** Allow multiple selections */
  multiple?: boolean;
  /** The name of the input */
  name?: string;
  /** The text for the button */
  text?: React.ReactText | ((selected: Array<OptionProps['children']>) => React.ReactText);
  /** The size of the select */
  size?: UseInputStyleProps['size'];
  /** Handle the value changing */
  onChange?: (values: string | Array<string>) => void;
  /** The initial value */
  value?: OptionProps['value'] | Array<OptionProps['value']>;
}

export interface SelectProps extends Props, SelectCustomClassNames {
  downshiftEnvironment?: Environment;
}
