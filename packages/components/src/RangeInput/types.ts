import { AriaTextFieldOptions, TextFieldAria } from '@react-aria/textfield';
import { Range, RangeFilter } from '@sajari/react-hooks';
import React from 'react';

export interface CustomInputProps {
  getProps: (
    override?: AriaTextFieldOptions,
  ) => TextFieldAria & { ref: React.MutableRefObject<HTMLInputElement | null> };
}

export interface RangeInputProps {
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
  /** Show inputs */
  showInputs?: boolean;
}
