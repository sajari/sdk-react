import { mapStyles } from '@sajari/react-sdk-utils';
import tw, { theme } from 'twin.macro';

import { InternalRatingItemProps } from './types';

export default function useRatingItemStyles(props: InternalRatingItemProps) {
  const { half, flipped, active } = props;

  const styles = {
    container: [tw`relative m-0 p-0 inline-block`, active && !half ? tw`text-orange-400` : tw`text-gray-300`],
    firstHalf: [
      tw`absolute top-0 w-1/2 h-full overflow-hidden select-none`,
      '& > * { flex-shrink: 0; }',
      flipped ? tw`flex flex-row-reverse right-0` : tw`flex flex-row left-0`,
      half ? theme`colors.orange.400` : 'inherit',
    ],
    secondHalf: [tw`flex`, 'color: inherit;'],
  };

  return mapStyles(styles);
}
