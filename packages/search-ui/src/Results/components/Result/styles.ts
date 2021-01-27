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
    imageContainer: [],
    image: [tw`rounded-md`],
    content: [tw`flex-1 min-w-0`],
    header: [tw`flex items-start justify-between`],
    title: [tw`font-medium`],
    subtitle: [tw`text-xs text-gray-400`],
    description: [tw`mt-1 text-sm text-gray-500`],
    rating: [tw`mt-1 space-y-1 text-center`],
    priceContainer: [],
    price: [isOnSale ? tw`font-medium text-red-500` : ''],
    originalPrice: [tw`text-xs text-gray-400 line-through`],
  });

  switch (appearance) {
    case 'grid':
      styles.container.push(tw`text-center`);
      styles.imageContainer.push(tw`block mb-4`);
      styles.priceContainer.push(tw`flex items-baseline justify-center space-x-1`);
      break;

    default:
    case 'list':
      styles.container.push(tw`flex items-center w-full`);
      styles.imageContainer.push(tw`w-24 mr-6`);
      styles.priceContainer.push(tw`text-right`);
      break;
  }

  return mapStyles(styles);
}
