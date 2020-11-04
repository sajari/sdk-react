import tw from 'twin.macro';

import { mapStyles } from '../utils/style-props';
import { AspectRatioProps } from './types';

export function useAspectRatioStyles(props: AspectRatioProps) {
  const { ratio } = props;
  const styles = {
    parent: [
      tw`relative`,
      tw`before:(content block h-0)`,
      `&::before { padding-bottom: calc(100% / ${ratio})}`,
      '& > * { position: absolute; top: 0; left: 0; width: 100%; height: 100% }',
    ],
  };

  return mapStyles(styles);
}
