import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { ResultsProps } from './types';

export default function useResultsStyles({ appearance = 'list' }: ResultsProps) {
  const styles = {
    container: [
      appearance === 'grid' ? tw`grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-8` : tw`flex flex-col space-y-8`,
    ],
    item: [],
  };

  return mapStyles(styles);
}
