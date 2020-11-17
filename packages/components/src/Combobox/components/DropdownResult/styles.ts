import tw, { TwStyle } from 'twin.macro';

import { mapStyles } from '../../../utils/style-props';
import { DropdownResultProps } from './types';

export function useDropdownItemStyles(props: DropdownResultProps) {
  const { selected } = props;
  const styles: Record<string, (TwStyle | string)[]> = {
    item: [
      tw`flex items-center w-full px-2 py-1 leading-5 text-left transition-all duration-75 rounded cursor-pointer`,
    ],
    imageContainer: [tw`flex-none w-24 h-24 mr-6`],
  };

  if (selected) {
    styles.item.push(tw`bg-gray-100`);
  }

  return mapStyles(styles);
}
