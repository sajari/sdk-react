import { AriaTextFieldOptions, TextFieldAria } from '@react-aria/textfield';
import { RangeFilter } from '@sajari/react-hooks';
import React from 'react';

export interface CustomInputProps {
  /** Usual props for the input and label to be accessible and work correctly */
  getCustomInputProps: () => TextFieldAria;
}

export type RangeInputProps = {
  /** RangeFilter object  */
  filter: RangeFilter;
  /** Left custom input */
  leftInput?: (props: CustomInputProps) => React.ReactNode;
  /** Right custom input */
  rightInput?: (props: CustomInputProps) => React.ReactNode;
};

export type RangeInputInputProps = AriaTextFieldOptions & {
  /** Label */
  label: string;
  /** Min value */
  min: number;
  /** Max value */
  max: number;
};
