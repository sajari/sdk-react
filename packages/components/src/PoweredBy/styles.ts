import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { PoweredByProps } from './types';

export default function usePoweredByStyles({ align = 'right' }: PoweredByProps) {
  const styles = {
    container: [tw`flex items-center m-2 text-xs text-gray-400`],
    logo: [tw`inline-block align-middle`],
    label: [tw`pr-1`],
  };

  switch (align) {
    case 'left':
      styles.container.push(tw`justify-start`);
      break;

    case 'center':
      styles.container.push(tw`justify-center`);
      break;

    default:
    case 'right':
      styles.container.push(tw`justify-end`);
      break;
  }

  return mapStyles(styles);
}
