import { mapStyles } from '@sajari/react-sdk-utils';
import tw, { TwStyle } from 'twin.macro';

import { ResultProps } from './types';

export default function useResultStyles(props: ResultProps) {
  const { appearance } = props;

  const styles: Record<string, TwStyle[]> = {
    container: [],
    imageContainer: [],
    image: [tw`rounded-md`],
  };

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
