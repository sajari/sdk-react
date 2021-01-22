import { AriaTextFieldOptions } from '@react-aria/textfield';

import { BoxProps } from '../../../Box';
import { RangeInputProps } from '../../types';

export interface RangeInputInputProps
  extends AriaTextFieldOptions,
    BoxProps,
    Required<Pick<RangeInputProps, 'min' | 'max' | 'step'>> {
  /** Label */
  label: string;
}
