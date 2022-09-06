import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { UseInputStyleProps, useInputStyles } from '../../../hooks';
import { RangeInputInputProps } from './types';

type UseRangeInputStylesParams<T> = RangeInputInputProps<T>;

export default function useRangeInputStyles<T>(props: UseRangeInputStylesParams<T>) {
  const { max, step } = props;
  const { styles: inputStyles } = useInputStyles({
    type: 'text',
    size: 'sm',
    ...props,
  } as UseInputStyleProps);

  const charLength = (max + step).toString().length;

  const styles = {
    container: [tw`relative`],
    // TODO: Replace the magic numbers with calculated ones
    input: [inputStyles, `width: calc(${charLength * 9}px + 2.5rem)`],
  };

  return { styles: mapStyles(styles) };
}
