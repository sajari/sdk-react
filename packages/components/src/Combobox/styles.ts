/* eslint-disable @typescript-eslint/no-explicit-any */
import { inferStylesObjectKeys, mapStyles, useTheme } from '@sajari/react-sdk-utils';
import tw, { TwStyle } from 'twin.macro';

import { ComboboxProps, ComboboxSize } from './types';

interface UseComboboxStylesProps {
  size: ComboboxProps<any>['size'];
  voiceEnabled: boolean;
  loading: boolean;
  variant: ComboboxProps<any>['variant'];
}

export function getInputSpacingStyles(size?: ComboboxSize) {
  switch (size) {
    case 'sm':
      return tw`pl-8 text-sm`;

    case '2xl':
      return tw`text-2xl pl-9`;

    case 'xl':
      return tw`pl-10 text-xl`;

    case 'lg':
      return tw`pl-10 text-lg`;

    case 'md':
    default:
      return tw`pl-9 text-base`;
  }
}

export function useComboboxStyles(props: UseComboboxStylesProps) {
  const { size, voiceEnabled, loading, variant } = props;
  const theme = useTheme();
  const containerStyles: TwStyle[] = [];
  const iconContainerStyles: TwStyle[] = [tw`absolute inset-y-0 flex items-center space-x-2 text-gray-400`];
  const iconSearchStyles: TwStyle[] = [];
  const inputStyles = getInputSpacingStyles(size);

  switch (size) {
    case 'sm':
      containerStyles.push(tw`py-1`);

      if (loading && voiceEnabled) {
        containerStyles.push(tw`pr-13`);
      } else if (loading || voiceEnabled) {
        containerStyles.push(tw`pr-7`);
      }

      iconContainerStyles.push(tw`px-2`);
      break;

    case '2xl':
      containerStyles.push(tw`py-4`);

      if (loading && voiceEnabled) {
        containerStyles.push(tw`pr-15`);
      } else if (loading || voiceEnabled) {
        containerStyles.push(tw`pr-11`);
      }

      iconContainerStyles.push(tw`px-4`);
      iconSearchStyles.push(tw`w-6 h-6`);
      break;

    case 'xl':
      containerStyles.push(tw`py-3.5`);

      if (loading && voiceEnabled) {
        containerStyles.push(tw`pr-15`);
      } else if (loading || voiceEnabled) {
        containerStyles.push(tw`pr-11`);
      }

      iconContainerStyles.push(tw`px-4`);
      iconSearchStyles.push(tw`w-5 h-5`);
      break;

    case 'lg':
      containerStyles.push(tw`py-3`);

      if (loading && voiceEnabled) {
        containerStyles.push(tw`pr-15`);
      } else if (loading || voiceEnabled) {
        containerStyles.push(tw`pr-11`);
      }

      iconContainerStyles.push(tw`px-4`);
      break;

    case 'md':
    default:
      if (loading && voiceEnabled) {
        containerStyles.push(tw`pr-14`);
      } else if (loading || voiceEnabled) {
        containerStyles.push(tw`pr-9`);
      }

      iconContainerStyles.push(tw`px-3`);
      break;
  }

  const styles = inferStylesObjectKeys({
    container: [tw`relative`],
    inputContainer: [tw`relative px-0 py-2 text-base transition-all duration-150 rounded-md`, ...containerStyles],
    iconContainerLeft: [...iconContainerStyles, tw`left-0`],
    iconContainerRight: [...iconContainerStyles, tw`right-0`],
    input: [
      tw`box-border absolute inset-0 w-full min-h-full p-0 m-0 bg-transparent border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 font-inherit`,
      inputStyles,
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
    iconSpinner: [],
    iconSearch: iconSearchStyles,
  });

  if (variant === 'outline') {
    styles.inputContainer.push(
      tw`bg-white border border-gray-200 border-solid`,
      `&:focus-within { box-shadow: 0 0 0 1px #fff, 0 0 0 3px ${theme.color.primary.base} }`,
    );
  } else {
    styles.inputContainer.push(tw`py-0 border-none`);
  }

  if (size === 'sm') {
    styles.iconSpinner.push(tw`w-3 h-3`);
  } else if (size === '2xl') {
    styles.iconSpinner.push(tw`w-5 h-5`);
  }

  return { styles: mapStyles(styles) };
}
