import tw, { TwStyle } from 'twin.macro';

import useFocusRingStyles from '../hooks/useFocusRingStyles';
import { mapStyles } from '../utils/style-props';
import { ComboboxProps } from './types';

interface UseComboboxStylesProps {
  size: ComboboxProps['size'];
}

export function useComboboxStyles(props: UseComboboxStylesProps) {
  const { size } = props;
  const { focusProps, focusRingStyles } = useFocusRingStyles();
  const sizeStyles: TwStyle[] = [];
  switch (size) {
    case 'lg':
      sizeStyles.push(tw`py-3 text-lg pl-7`);
      break;
    case 'sm':
      sizeStyles.push(tw`py-1 text-sm pl-7`);
      break;
    default:
      sizeStyles.push(tw`pl-9`);
      break;
  }

  const styles = {
    container: [tw`relative`],
    inputContainer: [
      tw`form-input`,
      tw`relative transition-all duration-150 bg-white border border-gray-200`,
      ...focusRingStyles,
      ...sizeStyles,
    ],
    label: [tw`sr-only`],
    input: [
      tw`form-input`,
      tw`absolute inset-0 w-full bg-transparent border-0 pl-9 focus:shadow-none`,
      ...sizeStyles,
      ` &::-ms-clear,
        &::-ms-reveal {
          display: none;
          width: 0;
          height: 0;
        }
        &::-webkit-search-decoration,
        &::-webkit-search-cancel-button,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
          -webkit-appearance:none;
        }`,
    ],
  };

  return { styles: mapStyles(styles), focusProps };
}
