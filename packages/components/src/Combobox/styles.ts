/* eslint-disable @typescript-eslint/no-explicit-any */
import { inferStylesObjectKeys, mapStyles } from '@sajari/react-sdk-utils';
import tw, { TwStyle } from 'twin.macro';

import { useFocusRingStyles } from '../hooks';
import { ComboboxProps } from './types';

interface UseComboboxStylesProps {
  size: ComboboxProps<any>['size'];
  voiceEnabled: boolean;
  loading: boolean;
  variant: ComboboxProps<any>['variant'];
}

export function useComboboxStyles(props: UseComboboxStylesProps) {
  const { size, voiceEnabled, loading, variant } = props;
  const { focusProps, focusRingStyles } = useFocusRingStyles();
  const containerStyles: TwStyle[] = [];
  const inputStyles: TwStyle[] = [];
  const iconContainerStyles: TwStyle[] = [tw`absolute inset-y-0 flex items-center space-x-2 text-gray-400`];
  const iconSearchStyles: TwStyle[] = [];

  switch (size) {
    case 'sm':
      containerStyles.push(tw`py-1`);
      inputStyles.push(tw`text-sm pl-8`);

      if (loading && voiceEnabled) {
        containerStyles.push(tw`pr-13`);
      } else if (loading || voiceEnabled) {
        containerStyles.push(tw`pr-7`);
      }

      iconContainerStyles.push(tw`px-2`);
      break;

    case '2xl':
      containerStyles.push(tw`py-4`);
      inputStyles.push(tw`pl-9 text-2xl`);

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
      inputStyles.push(tw`pl-10 text-xl`);

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
      inputStyles.push(tw`text-lg pl-10`);

      if (loading && voiceEnabled) {
        containerStyles.push(tw`pr-15`);
      } else if (loading || voiceEnabled) {
        containerStyles.push(tw`pr-11`);
      }

      iconContainerStyles.push(tw`px-4`);
      break;

    case 'md':
    default:
      inputStyles.push(tw`pl-9`);

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
    inputContainer: [tw`form-input`, tw`relative text-base transition-all duration-150`, ...containerStyles],
    iconContainerLeft: [...iconContainerStyles, tw`left-0`],
    iconContainerRight: [...iconContainerStyles, tw`right-0`],
    input: [
      tw`form-input`,
      tw`absolute inset-0 w-full h-full bg-transparent border-0 focus:border-0 outline-none focus:outline-none shadow-none focus:shadow-none font-inherit m-0 p-0 box-border`,
      ...inputStyles,
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
    styles.inputContainer.push(...[tw`bg-white border border-gray-200 border-solid`, ...focusRingStyles]);
  } else {
    styles.inputContainer.push(tw`border-none py-0`);
  }

  if (size === 'sm') {
    styles.iconSpinner.push(tw`w-3 h-3`);
  } else if (size === '2xl') {
    styles.iconSpinner.push(tw`w-5 h-5`);
  }

  return { styles: mapStyles(styles), focusProps };
}
