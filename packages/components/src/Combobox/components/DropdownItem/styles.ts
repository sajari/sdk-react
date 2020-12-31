import { inferStylesObjectKeys, mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useDropdownItemStyles as useCoreDropdownItemStyles } from '../../../hooks';
import { DropdownItemProps } from './types';

export function useDropdownItemStyles(props: DropdownItemProps) {
  const { selected } = props;
  const { root, label } = useCoreDropdownItemStyles({ highlighted: selected });
  const styles = inferStylesObjectKeys({
    item: [root],
    highlight: [tw`font-semibold`],
    label: [label, tw`flex items-center transition-opacity duration-75`],
    iconEnter: [tw`ml-2`],
  });

  if (selected) {
    styles.label.push(tw`opacity-100`);
  } else {
    styles.highlight.push(tw`text-gray-900`);
    styles.label.push(tw`opacity-0`);
  }

  return mapStyles(styles);
}
