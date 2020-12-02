import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useFocusRingStyles } from '../hooks';
import { ColorProps } from './types';

interface UseColorStylesParams {
  checked: boolean;
  border: ColorProps['border'];
  rounded: ColorProps['rounded'];
}

export default function useColorStyles(props: UseColorStylesParams) {
  const { checked, border, rounded } = props;
  const { focusProps, focusRingStyles } = useFocusRingStyles({ color: String(border) });

  const styles = {
    container: [
      focusRingStyles,
      tw`relative flex items-center justify-center mt-2 ml-2 border border-solid cursor-pointer w-7 h-7`,
    ],
    iconCheck: [checked ? tw`opacity-100 fill-current` : tw`opacity-0 fill-current`],
  };

  switch (rounded) {
    case 'none':
      styles.container.push(tw`rounded-none`);
      break;
    case 'sm':
      styles.container.push(tw`rounded-sm`);
      break;
    case 'lg':
      styles.container.push(tw`rounded-lg`);
      break;
    case 'full':
      styles.container.push(tw`rounded-full`);
      break;
    default:
    case 'md':
      styles.container.push(tw`rounded-md`);
      break;
  }

  return { styles: mapStyles(styles), focusProps };
}
