import { mapStyles, useTheme } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useFontSize, UseInputStyleProps, useInputStyles } from '../hooks';
import { CheckboxProps } from './types';

export function useCheckboxStyles(props: CheckboxProps) {
  const theme = useTheme();
  const { invalid = false, indeterminate = false, fontSize } = props;
  const sizeStyles = useFontSize({ size: fontSize });

  const { styles: inputStyles } = useInputStyles({
    type: 'checkbox',
    indeterminate,
    ...props,
  } as UseInputStyleProps);

  const styles = {
    container: [tw`flex items-center`],
    componentWrapper: [tw`relative inline-flex items-center`],
    label: [tw`p-0 ml-2`, sizeStyles],
    indeterminate: [tw`absolute inset-0 flex items-center justify-center pointer-events-none`],
    indeterminateInner: [tw`m-auto w-1/2 h-0.5 rounded-sm`, { backgroundColor: theme.color.primary.text }],
    input: [tw`m-0 rounded`, inputStyles],
  };

  if (invalid) {
    styles.label.push(tw`text-red-500`);
  }

  return { styles: mapStyles(styles) };
}
