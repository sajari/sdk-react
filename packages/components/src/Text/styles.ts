import { css } from '@emotion/core';
import tw from 'twin.macro';

import { mapTruncateValue } from '../utils/styles';
import { TextElement, TextProps } from './types';

interface UseTextStylesProps {
  as: TextElement;
  truncate: TextProps['truncate'];
}

export default function useTextStyles({ as, truncate }: UseTextStylesProps) {
  const props = [tw`p-0 m-0`, mapTruncateValue(truncate)];

  switch (as) {
    case 'small':
      props.push(tw`text-sm`);
      break;

    case 'pre':
    case 'code':
      props.push(tw`font-mono font-normal text-code-inline`);
      break;

    case 'mark':
      props.push(tw`px-1 text-gray-800 bg-yellow-100`);
      break;

    default:
      break;
  }

  if (as === 'code') {
    props.push(tw`text-red-500`);
  }

  return css(props);
}
