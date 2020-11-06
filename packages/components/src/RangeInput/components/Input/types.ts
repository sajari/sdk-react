import { AriaTextFieldOptions } from '@react-aria/textfield';

export interface RangeInputInputProps extends AriaTextFieldOptions {
  /** Label */
  label: string;
  /** Min value */
  min: number;
  /** Max value */
  max: number;
}
