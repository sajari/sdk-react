import { css } from '@emotion/core';
import { useTheme } from '@sajari/react-sdk-utils';
import tw, { TwStyle } from 'twin.macro';

export interface UseInputStyleProps {
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  indeterminate?: boolean;
  type: 'select' | 'radio' | 'checkbox';
  size?: 'sm' | 'md' | 'lg';
}

export default function useInputStyles(props: UseInputStyleProps) {
  const { disabled, indeterminate, invalid, readOnly, size, type } = props;
  const theme = useTheme();
  const styles: (TwStyle | string)[] = [];

  styles.push(
    tw`leading-normal text-gray-600 transition-all duration-150 bg-white border border-gray-200 border-solid font-inherit`,
  );

  // Map the size to padding and font size
  if (!['radio', 'checkbox'].includes(type)) {
    switch (size) {
      case 'lg':
        styles.push(tw`px-5 py-3 text-lg`);
        break;

      case 'sm':
        styles.push(tw`px-3 py-1 text-sm`);
        break;

      default:
      case 'md':
        styles.push(tw`px-4 py-2 text-base`);
        break;
    }
  }

  // Cancel out the form controls plugin styles since we use the ring
  styles.push(tw`focus:outline-none focus:shadow-none focus:border-gray-200`);

  if (['radio', 'checkbox'].includes(type)) {
    styles.push(tw`flex-none w-4 h-4 p-0 m-0 focus:ring-2 focus:ring-current`, `color: ${theme.color.primary.base};`);

    if (indeterminate) {
      styles.push(tw`border-transparent`, `background-color: ${theme.color.primary.base};`);
    }
  }

  if (type === 'select') {
    styles.push(tw`block w-full pr-10 font-normal text-left truncate rounded-md`);
  }

  // Modifiers need to go last so that their specificity is highest
  if (disabled || readOnly) {
    styles.push(tw`cursor-not-allowed`);
  }

  if (disabled) {
    styles.push(tw`text-gray-400 bg-gray-100`);

    if (['radio', 'checkbox'].includes(type)) {
      styles.push(tw`checked:bg-gray-400 checked:border-gray-400`);
    }
  }

  if (invalid) {
    styles.push(tw`border-red-500 bg-red-50 focus:border-red-500`);

    if (['radio', 'checkbox'].includes(type)) {
      styles.push(tw`text-red-500 bg-red-100 checked:bg-red-500`);
    }
  }

  return { styles: css(styles) };
}
