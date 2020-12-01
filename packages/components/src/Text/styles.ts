import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useTextSize } from '../hooks';
import { mapTruncateValue } from '../utils/styles';
import { TextElement, TextProps } from './types';

interface UseTextStylesProps {
  as: TextElement;
  truncate: TextProps['truncate'];
  size: TextProps['size'];
}

export default function useTextStyles({ as, truncate, size }: UseTextStylesProps) {
  const sizeStyles = useTextSize({ size });

  const styles = {
    container: [tw`p-0 m-0`, mapTruncateValue(truncate), sizeStyles],
  };

  switch (as) {
    case 'small':
      styles.container.push(tw`text-sm`);
      break;

    case 'pre':
    case 'code':
      styles.container.push(tw`font-mono font-normal text-code-inline`);
      break;

    case 'mark':
      styles.container.push(tw`px-1 text-gray-800 bg-yellow-100`);
      break;

    default:
      break;
  }

  if (as === 'code') {
    styles.container.push(tw`text-red-500`);
  }

  return mapStyles(styles);
}
