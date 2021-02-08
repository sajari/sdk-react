import { AriaTextFieldOptions, TextFieldAria } from '@react-aria/textfield';
import { Range } from '@sajari/react-hooks';
import * as React from 'react';

import { BoxProps } from '../Box';

export interface CustomInputProps {
  getProps: (
    override?: AriaTextFieldOptions,
  ) => TextFieldAria & { ref: React.MutableRefObject<HTMLInputElement | null> };
}

export type RangeValue = [number] | Range;

export type RangeInputValue = [string] | [string, string];

export interface RangeInputProps extends BoxProps {
  /** ISO language code to use for i18n and formatting (e.g. en or en-US). Defaults to browser language. */
  language?: string;
  /** How to format the values */
  format?: 'default' | 'price';
  /** Currency code to use for price type */
  currency?: string;
  /** Whether to use fixed-point notation in labels and inputs */
  fixedPoint?: boolean;
  /** The minimum permitted value */
  min?: number;
  /** The maximum permitted value */
  max?: number;
  /** The stepping interval, used both for user interface and validation purposes */
  step?: number;
  /** An array of custom steps to use. This will override step. */
  steps?: number[];
  /** The interval to show small ticks */
  tick?: number;
  /** An array of custom ticks to use. This will override tick. */
  ticks?: number[];
  /** The range value */
  value?: RangeValue;
  /** Called once the handle has been released */
  onChange?: (value: RangeValue) => void;
  /** Called on every value change */
  onInput?: (value: RangeValue) => void;
  /** Left custom input */
  leftInput?: (props: CustomInputProps) => React.ReactNode;
  /** Right custom input */
  rightInput?: (props: CustomInputProps) => React.ReactNode;
  /** Show inputs */
  showInputs?: boolean;
  /** The classname for track */
  trackClassName?: string;
  /** The classname for fill */
  fillClassName?: string;
  /** The classname for handle */
  handleClassName?: string;
  /** The classname for active handle */
  handleActiveClassName?: string;
  /** The classname for input */
  inputClassName?: string;
}
