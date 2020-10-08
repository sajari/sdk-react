import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';
import { useTheme } from '../styles/theming';

export interface UseInputStyleProps {
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  indeterminate?: boolean;
  block?: boolean;
  type: 'text' | 'select' | 'radio' | 'checkbox';
}

export default function useInputStyles(props: UseInputStyleProps) {
  const { block, disabled, indeterminate, invalid, readOnly, type } = props;
  const theme = useTheme();

  const styles: (TwStyle | string)[] = [];

  styles.push(
    tw`text-gray-700 border-gray-300 border border-solid rounded-full bg-white outline-none px-3 py-2 text-base leading-normal pl-10`,
  );

  styles.push(`&:focus{box-shadow: 0 0 0 3px ${theme.color.primary.outline};}`);

  if (block) {
    styles.push(tw`block w-full`);
  }

  if (disabled || readOnly) {
    styles.push(tw`cursor-not-allowed`);
  }

  if (disabled) {
    styles.push(tw`text-gray-400 bg-gray-100 border-gray-200 focus:border-gray-200 focus:shadow-none`);

    if (['radio', 'checkbox'].includes(type)) {
      styles.push(tw`checked:bg-gray-400 checked:border-gray-400`);
    }
  }

  if (invalid) {
    styles.push(tw`border-red-500 focus:border-red-500 focus:shadow-outline-red`);

    if (['radio', 'checkbox'].includes(type)) {
      styles.push(tw`bg-red-100 checked:bg-red-500`);
    }
  }

  if (['radio', 'checkbox'].includes(type)) {
    styles.push(tw`h-4 w-4 text-blue-500`);
  } else {
    styles.push(tw`transition-shadow duration-200 ease-in-out`);
  }

  if (type === 'checkbox' && indeterminate) {
    styles.push(tw`border-transparent`);
    styles.push(`background-color: ${theme.color.primary.base};`);
  }

  return css(styles);
}
