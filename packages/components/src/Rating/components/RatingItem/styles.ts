import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { InternalRatingItemProps } from '../../types';

export default function useRatingItemStyles(props: InternalRatingItemProps) {
  const { half, flipped, active } = props;

  const styles = {
    container: [tw`relative inline-block p-0 m-0`, active && !half ? tw`text-orange-400` : tw`text-gray-300`],
    firstHalf: [
      tw`absolute top-0 w-1/2 h-full overflow-hidden select-none`,
      '& > * { flex-shrink: 0; }',
      flipped ? tw`right-0 flex flex-row-reverse` : tw`left-0 flex flex-row`,
      half ? tw`text-orange-400` : 'inherit',
    ],
    secondHalf: [tw`flex`, 'color: inherit;'],
  };

  return mapStyles(styles);
}
