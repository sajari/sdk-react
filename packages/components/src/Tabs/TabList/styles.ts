import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';
import { useTabContext } from '../context';

export default function useTabListStyles() {
  const { align } = useTabContext();
  const styles: TwStyle[] = [];

  styles.push(tw`flex border-0 border-b border-solid border-gray-200`);

  switch (align) {
    case 'center':
      styles.push(tw`justify-center`);
      break;

    case 'end':
      styles.push(tw`justify-end`);
      break;

    default:
    case 'start':
      styles.push(tw`justify-start`);
      break;
  }

  return css(styles);
}
