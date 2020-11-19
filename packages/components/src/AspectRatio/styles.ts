import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';

import { AspectRatioProps } from './types';

export function useAspectRatioStyles(props: AspectRatioProps) {
  const { ratio } = props;
  const styles: (string | TwStyle)[] = [tw`overflow-hidden`];

  if (!ratio) {
    return css(styles);
  }

  styles.push(
    tw`relative`,
    tw`before:(content block h-0)`,
    `&::before { padding-bottom: calc(100% / ${ratio})}`,
    '& > * { position: absolute; top: 0; left: 0; width: 100%; height: 100% }',
  );

  return css(styles);
}
