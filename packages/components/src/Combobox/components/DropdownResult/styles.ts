import { inferStylesObjectKeys, mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { DropdownResultProps } from './types';

export function useDropdownItemStyles(props: DropdownResultProps) {
  const { selected } = props;
  const styles = inferStylesObjectKeys({
    item: [
      tw`flex items-center w-full px-2 py-1 text-sm leading-5 text-left transition-all duration-75 rounded cursor-pointer`,
    ],
    imageContainer: [tw`flex-none w-12 h-12 mr-6`],
    textContainer: [tw`min-w-0 space-y-0.5`],
  });

  if (selected) {
    styles.item.push(tw`bg-gray-200`);
  }

  return mapStyles(styles);
}
