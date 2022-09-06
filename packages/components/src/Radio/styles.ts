import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useFontSize, UseInputStyleProps, useInputStyles } from '../hooks';
import { RadioProps } from './types';

export default function useRadioStyles(props: RadioProps) {
  const { invalid = false, fontSize } = props;
  const sizeStyles = useFontSize({ size: fontSize });

  const { styles: inputStyles } = useInputStyles({
    type: 'radio',
    ...props,
  } as UseInputStyleProps);

  const styles = {
    container: [tw`flex items-center`],
    label: [tw`p-0 ml-2`, sizeStyles],
    componentWrapper: [tw`inline-flex items-center`],
    input: [tw`m-0`, inputStyles],
  };

  if (invalid) {
    styles.label.push(tw`text-red-500`);
  }

  return { styles: mapStyles(styles) };
}
