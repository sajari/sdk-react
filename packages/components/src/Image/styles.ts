import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useHasImageLoaded } from '../hooks/useHasImageLoaded';
import { ImageProps } from './types';

function useObjectFit(objectFit: ImageProps['objectFit'], isSecondImage = false) {
  switch (objectFit) {
    case 'contain':
      return tw`object-contain`;

    case 'cover':
      return tw`object-cover`;

    case 'fill':
      return tw`object-fill`;

    case 'scale-down':
      return tw`object-scale-down`;

    case 'none':
      return tw`object-none`;

    default:
      return isSecondImage ? tw`object-cover` : '';
  }
}

function useObjectPosition(objectPosition: ImageProps['objectPosition']) {
  switch (objectPosition) {
    case 'top':
      return tw`object-top`;
    case 'bottom':
      return tw`object-bottom`;
    case 'left':
      return tw`object-left`;
    case 'right':
      return tw`object-right`;
    case 'left-top':
      return tw`object-left-top`;
    case 'left-bottom':
      return tw`object-left-bottom`;
    case 'right-top':
      return tw`object-right-top`;
    case 'right-bottom':
      return tw`object-right-bottom`;
    case 'center':
      return tw`object-center`;
    default:
      return tw`object-center`;
  }
}

export function useImageStyles(props: ImageProps & { hover: boolean }) {
  const hasLoaded = useHasImageLoaded(props);
  const { hover, objectFit, objectPosition } = props;
  const styles = {
    container: [tw`relative rounded-sm`, !hasLoaded ? tw`bg-gray-100` : ''],
    image: [
      tw`transition-opacity duration-200 ease-in`,
      hasLoaded && !hover ? tw`opacity-100` : tw`opacity-0`,
      { borderRadius: 'inherit' },
      useObjectFit(objectFit),
      useObjectPosition(objectPosition),
    ],
    secondImage: [
      tw`absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-200 ease-in`,
      hasLoaded && hover ? tw`opacity-100` : tw`opacity-0`,
      { borderRadius: 'inherit' },
      useObjectFit(objectFit, true),
      useObjectPosition(objectPosition),
    ],
  };

  return mapStyles(styles);
}
