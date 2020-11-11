import { css } from '@emotion/core';
import { useTheme } from 'sajari-react-sdk-styles';
import tw, { TwStyle } from 'twin.macro';

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
    tw`items-center justify-center no-underline transition duration-150 ease-in-out border border-transparent border-solid cursor-pointer focus:outline-none`,
  );

  if (!isLink) {
    styles.push(tw`font-medium rounded-md select-none`);
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
      styles.push(tw`text-sm`);

      if (spacing !== 'none') {
        if (spacing === 'compact') {
          styles.push(tw`px-2`);
        } else {
          styles.push(tw`px-3 py-1`);
        }
      }
      break;

    case 'xs':
      styles.push(tw`text-xs`);

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
        styles.push(tw`bg-gray-100 border-gray-200`);
        break;

      default:
        break;
    }

    return css(styles);
  }

  switch (appearance) {
    // TODO: test theming for primary appearance, we might want to change them later
    case 'primary':
      styles.push(`color: ${theme.color.primary.text};`);

      if (focused || pressed) {
        styles.push(`background: ${theme.color.primary.active};`);
      } else if (hovered) {
        styles.push(`background: ${theme.color.primary.active};`);
      } else {
        styles.push(`background: ${theme.color.primary.base};`);
      }
      break;

    case 'default':
      styles.push(
        tw`text-gray-500 bg-white border-gray-200 shadow-sm focus:border-gray-400 hover:bg-gray-100 focus:bg-white focus:shadow-outline-gray`,
      );
      if (pressed) {
        styles.push(tw`bg-gray-100`);
      }
      break;

    case 'link':
      styles.push(
        tw`no-underline bg-transparent hover:underline focus:underline focus:shadow-outline focus:shadow-outline-blue`,
      );
      styles.push({ color: pressed ? theme.color.primary.active : theme.color.primary.base });

      if (!loading && !pressed) {
        styles.push(`&:hover, &:focus { color: ${theme.color.primary.active} }`);
      }
      break;

    case 'subtle-link':
      styles.push(
        tw`no-underline bg-transparent hover:underline focus:underline focus:shadow-outline focus:shadow-outline-gray`,
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
