import { css, SerializedStyles } from '@emotion/core';
import tw from 'twin.macro';

// import { ResultProps } from './types';

type Styles = {
  container: SerializedStyles[];
  image: SerializedStyles[];
  logo: SerializedStyles[];
  label: SerializedStyles[];
};

export default function useResultStyles(): Styles {
  const styles = {
    container: [tw`flex items-center`],
    image: [tw`object-contain max-h-full rounded-md`],
    logo: [tw`inline-block align-middle`],
    label: [tw`pr-1`],
  };

  /* switch (align) {
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
  } */

  return Object.entries(styles).reduce((obj, [key, value]) => Object.assign(obj, { [key]: css(value) }), {}) as Styles;
}
