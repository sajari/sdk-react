import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { UseInputStyleProps, useInputStyles } from '../hooks';
import { SelectProps } from './types';

export function useSelectStyles(props: SelectProps) {
  const { styles: inputStyles, focusRingStyles, focusProps } = useInputStyles({
    type: 'select',
    ...props,
  } as UseInputStyleProps);

  const styles = {
    container: [tw`relative`, focusRingStyles],
    select: [tw`form-select`, inputStyles],
  };

  return { styles: mapStyles(styles), focusProps };
}
