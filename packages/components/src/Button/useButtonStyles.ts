import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';
import { useTheme } from '../styles/theming';
import { ButtonProps } from './types';

const useButtonStyles = ({
  size,
  fullWidth,
  appearance,
  spacing,
  disabled,
  loading,
  pressed,
  focused,
  hovered,
}: ButtonProps & { pressed: boolean; hovered: boolean; focused: boolean }) => {
  const theme = useTheme();

  const isLink = (['link', 'subtle-link'] as Array<ButtonProps['apperance']>).includes(appearance);

  const styles: (string | TwStyle)[] = [];

  styles.push(
    tw`focus:outline-none items-center justify-center border transition duration-150 ease-in-out cursor-pointer no-underline`,
  );

  if (!isLink) {
    styles.push(tw`font-medium select-none rounded-md`);
  }

  styles.push(fullWidth ? tw`flex` : tw`inline-flex`);

  switch (size) {
    case 'xl':
      if (!isLink) {
        styles.push(tw`text-xl`);
      }
      if (spacing !== 'none') {
        if (spacing === 'compact') {
          styles.push(tw`px-8`);
        } else {
          styles.push(tw`px-12 py-4`);
        }
      }
      break;

    case 'lg':
      if (!isLink) {
        styles.push(tw`text-lg`);
      }
      if (spacing !== 'none') {
        if (spacing === 'compact') {
          styles.push(tw`px-6`);
        } else {
          styles.push(tw`px-8 py-3`);
        }
      }
      break;

    case 'sm':
      if (!isLink) {
        styles.push(tw`text-sm`);
      }
      if (spacing !== 'none') {
        if (spacing === 'compact') {
          styles.push(tw`px-2`);
        } else {
          styles.push(tw`px-3 py-1`);
        }
      }
      break;

    case 'xs':
      if (!isLink) {
        styles.push(tw`text-xs`);
      }
      if (spacing !== 'none') {
        if (spacing === 'compact') {
          styles.push(tw`px-2`);
        } else {
          styles.push(tw`px-3 py-1`);
        }
      }
      break;

    default:
    case 'md':
      if (!isLink) {
        styles.push(tw`text-base`);
      }
      if (spacing !== 'none') {
        if (spacing === 'compact') {
          styles.push(tw`px-3`);
        } else {
          styles.push(tw`px-4 py-2`);
        }
      }
      break;
  }

  if (disabled) {
    styles.push(tw`text-gray-400 cursor-not-allowed`);

    switch (appearance) {
      case 'default':
        styles.push(tw`border-gray-200 bg-gray-100`);
        break;

      default:
        styles.push(tw`border-transparent`);
        break;
    }

    return css(styles);
  }

  switch (appearance) {
    // TODO: test theming for primary appearance, we might want to change them later
    case 'primary':
      styles.push(`
        color: ${theme.color.primary.text};
        border-color: ${theme.color.primary.border};
      `);

      if (focused || pressed) {
        styles.push(`background: ${theme.color.primary.active};`);
        styles.push(`box-shadow: 0 0 0 3px ${theme.color.primary.outline};`);
      } else if (hovered) {
        styles.push(`background: ${theme.color.primary.active};`);
      } else {
        styles.push(`background: ${theme.color.primary.base};`);
      }
      break;

    case 'default':
      styles.push(
        tw`text-gray-500 border-gray-200 focus:border-gray-400 bg-white hover:bg-gray-100 focus:bg-white focus:border-opacity-75 focus:shadow-outline-gray shadow-sm`,
      );
      if (pressed) {
        styles.push(tw`bg-gray-100`);
      }
      break;

    case 'link':
      styles.push(
        tw`bg-transparent no-underline hover:underline focus:underline border-transparent focus:shadow-outline focus:shadow-outline-blue`,
      );
      styles.push(pressed ? tw`text-blue-700` : tw`text-blue-500`);

      if (!loading && !pressed) {
        styles.push(tw`hover:text-blue-700 focus:text-blue-700`);
      }
      break;

    case 'subtle-link':
      styles.push(
        tw`bg-transparent no-underline hover:underline focus:underline border-transparent focus:shadow-outline focus:shadow-outline-gray`,
      );

      styles.push(pressed ? tw`text-gray-700` : tw`text-gray-500`);

      if (!loading && !pressed) {
        styles.push(tw`hover:text-gray-700 focus:text-gray-700`);
      }
      break;
    default:
      break;
  }

  return css(styles);
};

export default useButtonStyles;
