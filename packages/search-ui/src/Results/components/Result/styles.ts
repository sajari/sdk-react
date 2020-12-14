import { inferStylesObjectKeys, mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { ResultProps } from './types';

export default function useResultStyles(props: ResultProps) {
  const { appearance } = props;

  const styles = inferStylesObjectKeys({
    container: [],
    imageContainer: [],
    image: [tw`rounded-md`],
    content: [tw`flex-1 min-w-0`],
    head: [tw`flex items-start`],
    title: [tw`flex-1 font-medium`],
    listPrice: [tw`ml-6`],
    listRating: [tw`flex items-baseline mt-1`],
    listLinkSubtitle: [tw`mr-3 text-xs text-gray-400`],
    listSubtitle: [tw`mr-3 text-xs text-gray-400`],
    listDesc: [tw`mt-1 text-sm text-gray-500`],
    gridRating: [tw`mt-1 space-y-1 text-center`],
    gridPrice: [tw`text-gray-500`],
  });

  switch (appearance) {
    case 'grid':
      styles.container.push(tw`text-center`);
      styles.imageContainer.push(tw`block mb-4`);
      break;

    default:
    case 'list':
      styles.container.push(tw`flex items-center w-full`);
      styles.imageContainer.push(tw`w-24 mr-6`);
      break;
  }

  return mapStyles(styles);
}
