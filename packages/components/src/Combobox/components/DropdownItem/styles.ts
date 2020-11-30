import { mapStyles, useTheme } from '@sajari/react-sdk-utils';
import tw, { TwStyle } from 'twin.macro';

import { DropdownItemProps } from './types';

export function useDropdownItemStyles(props: DropdownItemProps) {
  const theme = useTheme();
  const { selected } = props;
  const styles: Record<'item' | 'highlight' | 'label', (TwStyle | string)[]> = {
    item: [
      tw`flex items-center w-full px-2 py-1 leading-5 text-left transition-all duration-75 rounded cursor-pointer`,
    ],
    highlight: [tw`font-semibold`],
    label: [tw`flex items-center ml-auto text-xs text-gray-400 transition-opacity duration-75`],
  };

  if (selected) {
    styles.item.push(`color: ${theme.color.primary.text}; background: ${theme.color.primary.active};`);
    styles.label.push(`color: ${theme.color.primary.text};`);
  } else {
    styles.item.push(tw`text-gray-500`);
    styles.highlight.push(tw`text-gray-900`);
  }

  return mapStyles(styles);
}
