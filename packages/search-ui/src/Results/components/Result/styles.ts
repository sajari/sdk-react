import { inferStylesObjectKeys, mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { ResultProps } from './types';

interface UseResultStylesParams extends ResultProps {
  isOnSale?: boolean;
}

export default function useResultStyles(props: UseResultStylesParams) {
  const { appearance, isOnSale } = props;

  const styles = inferStylesObjectKeys({
    container: [],
    wrapper: [tw`flex flex-col mb-4`],
    imageContainer: [],
    content: [tw`min-w-0`],
    header: [tw`flex items-start justify-between`],
    title: [tw`font-medium`],
    subtitle: [tw`text-xs text-gray-400`],
    description: [tw`mt-1 text-sm text-gray-500`],
    rating: [tw`mt-1 space-y-1 text-center`],
    priceContainer: [],
    price: [isOnSale ? tw`font-medium text-red-500` : ''],
    originalPrice: [tw`text-xs text-gray-400 line-through`],
    previewImagesContainer: [tw`flex flex-wrap gap-2 w-full my-2`],
    previewImageContainer: [
      tw`w-9 h-9 outline-none rounded-md p-0.5 border-2 border-transparent focus:border-indigo-400`,
    ],
  });

  switch (appearance) {
    case 'grid':
      styles.container.push(tw`text-center flex flex-col`);
      styles.title.push(tw`mt-2`);
      styles.imageContainer.push(tw`block`);
      styles.priceContainer.push(tw`flex items-baseline justify-center space-x-1`);
      break;

    default:
    case 'list':
      styles.content.push(tw`flex-1`);
      styles.container.push(tw`flex items-center w-full`);
      styles.imageContainer.push(tw`w-24 mr-6`);
      styles.priceContainer.push(tw`text-right`);
      break;
  }

  return mapStyles(styles);
}
