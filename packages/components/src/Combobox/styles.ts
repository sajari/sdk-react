import { mapStyles } from '@sajari/react-sdk-utils';
import tw, { TwStyle } from 'twin.macro';

import useFocusRingStyles from '../hooks/useFocusRingStyles';
import { ComboboxProps } from './types';

interface UseComboboxStylesProps {
  size: ComboboxProps<any>['size'];
  voiceEnabled: boolean;
  loading: boolean;
}

export function useComboboxStyles(props: UseComboboxStylesProps) {
  const { size, voiceEnabled, loading } = props;
  const { focusProps, focusRingStyles } = useFocusRingStyles();
  const containerStyles: TwStyle[] = [];
  const iconContainerStyles: TwStyle[] = [tw`absolute inset-y-0 flex items-center space-x-2 text-gray-400`];

  switch (size) {
    case 'sm':
      containerStyles.push(tw`py-1 text-sm pl-7`);

      if (loading && voiceEnabled) {
        containerStyles.push(tw`pr-13`);
      } else if (loading || voiceEnabled) {
        containerStyles.push(tw`pr-7`);
      }

      iconContainerStyles.push(tw`px-2`);
      break;
    case 'md':
    default:
      containerStyles.push(tw`pl-9`);

      if (loading && voiceEnabled) {
        containerStyles.push(tw`pr-14`);
      } else if (loading || voiceEnabled) {
        containerStyles.push(tw`pr-9`);
      }

      iconContainerStyles.push(tw`px-3`);
      break;
  }

  const styles = {
    container: [tw`relative`],
    inputContainer: [
      tw`form-input`,
      tw`relative transition-all duration-150 bg-white border border-gray-200`,
      ...focusRingStyles,
      ...containerStyles,
    ],
    label: [tw`sr-only`],
    iconContainerLeft: [...iconContainerStyles, tw`left-0`],
    iconContainerRight: [...iconContainerStyles, tw`right-0`],
    input: [
      tw`form-input`,
      tw`absolute inset-0 w-full bg-transparent border-0 focus:shadow-none`,
      ...containerStyles,
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
