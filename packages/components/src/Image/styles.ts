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

export function useImageStyles(props: ImageProps & { hover: boolean }) {
  const hasLoaded = useHasImageLoaded(props);
  const { hover, objectFit } = props;
  const styles = {
    container: [tw`relative rounded-md`, !hasLoaded ? tw`bg-gray-100` : ''],
    image: [
      tw`transition-opacity duration-200 ease-in`,
      hasLoaded && !hover ? tw`opacity-100` : tw`opacity-0`,
      { borderRadius: 'inherit' },
      useObjectFit(objectFit),
    ],
    secondImage: [
      tw`absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-200 ease-in`,
      hasLoaded && hover ? tw`opacity-100` : tw`opacity-0`,
      { borderRadius: 'inherit' },
      useObjectFit(objectFit, true),
    ],
  };

  return mapStyles(styles);
}
