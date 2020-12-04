import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { UseInputStyleProps, useInputStyles } from '../../../hooks';
import { RangeInputInputProps } from './types';

export default function useRangeInputStyles(props: RangeInputInputProps) {
  const { max } = props;
  const { styles: inputStyles, focusRingStyles, focusProps } = useInputStyles({
    block: true,
    type: 'text',
    ...props,
  } as UseInputStyleProps);

  const styles = {
    container: [tw`relative`, focusRingStyles],
    // TODO: Replace the magic numbers
    input: [tw`form-input text-sm`, inputStyles, `width: ${38 + max.toString().length * 12}px`],
  };

  return { styles: mapStyles(styles), focusProps };
}
