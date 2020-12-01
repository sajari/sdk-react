import { inferStylesObjectKeys, mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useTextSize } from '../hooks';
import { LabelProps } from './types';

export default function useLabelStyles({ visuallyHidden, size }: LabelProps) {
  const styles = inferStylesObjectKeys({
    container: [],
  });

  if (visuallyHidden) {
    styles.container.push(tw`sr-only`);
  } else {
    const sizeStyles = useTextSize({ size });
    styles.container.push(tw`inline-flex items-center cursor-pointer`);
    styles.container.push(sizeStyles as any);
  }

  return mapStyles(styles);
}
