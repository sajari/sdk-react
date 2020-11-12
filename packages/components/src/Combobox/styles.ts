import tw from 'twin.macro';

import useFocusRingStyles from '../hooks/useFocusRingStyles';
import { mapStyles } from '../utils/style-props';

export function useComboboxStyles() {
  const { focusProps, focusRingStyles } = useFocusRingStyles();

  const styles = {
    container: [tw`relative`],
    inputContainer: [
      tw`form-input`,
      tw`relative transition-all duration-150 bg-white border border-gray-200 pl-9`,
      ...focusRingStyles,
    ],
    label: [tw`sr-only`],
    input: [
      tw`form-input`,
      tw`absolute inset-0 w-full bg-transparent border-0 pl-9 focus:shadow-none`,
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
