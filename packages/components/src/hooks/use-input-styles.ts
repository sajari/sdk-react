import { css } from '@emotion/core';
import { useTheme } from 'sajari-react-sdk-styles';
import tw, { TwStyle } from 'twin.macro';

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
    tw`text-gray-700 border-gray-300 border border-solid rounded-full bg-white outline-none text-base leading-normal px-3 py-2 pl-10`,
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
    styles.push(tw`h-4 w-4 text-blue-500 flex-none p-0 m-0`);
  } else {
    styles.push(tw`transition-shadow duration-200 ease-in-out`);
  }

  if (type === 'checkbox') {
    styles.push(tw`rounded`);
  }

  if (type === 'checkbox' && indeterminate) {
    styles.push(tw`border-transparent`);
    styles.push(`background-color: ${theme.color.primary.base};`);
  }

  if (type === 'select') {
    styles.push(tw`rounded-md py-2 px-10 pl-3`);
  }

  return css(styles);
}
