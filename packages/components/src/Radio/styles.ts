import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { UseInputStyleProps, useInputStyles } from '../hooks';
import { RadioProps } from './types';

export default function useRadioStyles(props: RadioProps) {
  const { invalid = false } = props;

  const { styles: inputStyles, focusRingStyles, focusProps } = useInputStyles({
    block: true,
    type: 'radio',
    ...props,
  } as UseInputStyleProps);

  const styles = {
    container: [tw`flex items-center`],
    label: [tw`ml-2`],
    componentWrapper: [tw`inline-flex items-center`],
    inputWrapper: [tw`relative`, focusRingStyles],
    input: [[tw`form-radio`, inputStyles]],
  };

  if (invalid) {
    styles.label.push(tw`text-red-500`);
  }

  return { styles: mapStyles(styles), focusProps };
}
