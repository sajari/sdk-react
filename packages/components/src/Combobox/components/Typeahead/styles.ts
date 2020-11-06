import tw from 'twin.macro';

import { mapStyles } from '../../../utils/style-props';

export function useTypeaheadStyles() {
  const styles = {
    container: [tw`text-gray-400`],
    hidden: [tw`opacity-0`],
  };

  return mapStyles(styles);
}
