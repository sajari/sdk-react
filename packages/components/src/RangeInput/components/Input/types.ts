import { AriaTextFieldOptions } from '@react-aria/textfield';

import { BoxProps } from '../../../Box';

export interface RangeInputInputProps extends AriaTextFieldOptions, BoxProps {
  /** Label */
  label: string;
  /** Min value */
  min: number;
  /** Max value */
  max: number;
}
