import { AriaTextFieldOptions } from '@react-aria/textfield';

import { BoxProps } from '../../../Box';
import { RangeInputProps } from '../../types';

export interface RangeInputInputProps<T>
  extends AriaTextFieldOptions,
    BoxProps,
    Required<Pick<RangeInputProps<T>, 'min' | 'max' | 'step'>> {
  /** Label */
  label: string;
}
