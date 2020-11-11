import Color from 'color';
import { useTheme } from 'sajari-react-sdk-styles';
import tw from 'twin.macro';

import { mapStyles } from '../utils/style-props';

interface UseComboboxStylesProps {
  focusWithin: boolean;
}

export function useComboboxStyles(props: UseComboboxStylesProps) {
  const { focusWithin } = props;
  const theme = useTheme();
  const color = new Color(theme.color.primary.base);

  const styles = {
    container: [tw`relative`],
    inputContainer: [
      tw`form-input`,
      tw`relative transition-all duration-150 bg-white border border-gray-200 pl-9`,
      focusWithin ? { borderColor: theme.color.primary.base, boxShadow: `0 0 0 3px ${color.alpha(0.45).hsl()}` } : '',
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

  return mapStyles(styles);
}
