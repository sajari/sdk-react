import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { ImageProps } from './types';
import { useHasImageLoaded } from './useHasImageLoaded';

export function useImageStyles(props: ImageProps & { hover: boolean }) {
  const hasLoaded = useHasImageLoaded(props);
  const { hover } = props;
  const styles = {
    container: [tw`rounded-md relative`, !hasLoaded ? tw`bg-gray-100` : ''],
    image: [
      tw`transition-opacity duration-200 ease-in`,
      hasLoaded && !hover ? tw`opacity-100` : tw`opacity-0`,
      { borderRadius: 'inherit' },
    ],
    secondImage: [
      tw`transition-opacity duration-200 ease-in absolute top-0 left-0 w-full h-full`,
      hasLoaded && hover ? tw`opacity-100` : tw`opacity-0`,
      { borderRadius: 'inherit' },
    ],
  };

  switch (props.objectFit) {
    case 'contain':
      styles.image.push(tw`object-contain`);
      break;

    case 'cover':
      styles.image.push(tw`object-cover`);
      break;

    case 'fill':
      styles.image.push(tw`object-fill`);
      break;

    case 'scale-down':
      styles.image.push(tw`object-scale-down`);
      break;

    case 'none':
      styles.image.push(tw`object-none`);
      break;

    default:
      break;
  }

  return mapStyles(styles);
}
