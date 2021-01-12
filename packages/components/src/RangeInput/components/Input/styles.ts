import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { UseInputStyleProps, useInputStyles } from '../../../hooks';
import { RangeInputInputProps } from './types';

type UseRangeInputStylesParams = RangeInputInputProps & { invalid: boolean };

export default function useRangeInputStyles(props: UseRangeInputStylesParams) {
  const { max } = props;
  const { styles: inputStyles, focusRingStyles, focusProps } = useInputStyles({
    type: 'text',
    size: 'sm',
    ...props,
  } as UseInputStyleProps);

  const charLength = max.toString().length;

  const styles = {
    container: [tw`relative`, focusRingStyles],
    // TODO: Replace the magic numbers with calculated ones
    input: [tw`form-input`, inputStyles, `width: calc(${charLength * 9}px + 2.5rem)`],
  };

  return { styles: mapStyles(styles), focusProps };
}
