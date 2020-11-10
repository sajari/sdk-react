import { AriaTextFieldOptions, TextFieldAria } from '@react-aria/textfield';
import { Range, RangeFilter } from '@sajari/react-hooks';
import React from 'react';

export interface CustomInputProps {
  getProps: (
    override?: AriaTextFieldOptions,
  ) => TextFieldAria & { ref: React.MutableRefObject<HTMLInputElement | null> };
}

export type RangeInputProps = {
  /** The min range */
  min?: number;
  /** The max range */
  max?: number;
  /** The range value */
  value?: [number] | Range;
  /** Called once the handle has been released */
  onChange?: (value: [number] | Range) => void;
  /** Called on every value change */
  onInput?: (value: [number] | Range) => void;
  /** RangeFilter object  */
  filter?: RangeFilter;
  /** Left custom input */
  leftInput?: (props: CustomInputProps) => React.ReactNode;
  /** Right custom input */
  rightInput?: (props: CustomInputProps) => React.ReactNode;
  /** Show minimum and maximum value labels */
  showLabels?: boolean;
  /** Show inputs */
  showInputs?: boolean;
};
