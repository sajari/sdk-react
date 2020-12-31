import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { UseInputStyleProps, useInputStyles } from '../../../hooks';
import { SelectProps } from '../../types';

export type UseButtonStylesParams = Required<Pick<SelectProps, 'size' | 'invalid' | 'disabled'>>;

export function useButtonStyles(params: UseButtonStylesParams) {
  const { styles: inputStyles, focusProps: focusRingProps, focusRingStyles } = useInputStyles({
    type: 'select',
    ...params,
  } as UseInputStyleProps);

  const styles = { container: [tw`form-select`, inputStyles] };

  return { styles: mapStyles(styles), focusRingProps, focusRingStyles };
}
