import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useBorderRadius, useFocusRingStyles } from '../../../hooks';
import { ColorProps } from '../../types';

interface UseColorStylesParams {
  checked: boolean;
  border: ColorProps['border'];
  rounded: ColorProps['rounded'];
}

export default function useColorStyles(props: UseColorStylesParams) {
  const { checked, border, rounded } = props;
  const { focusProps, focusRingStyles } = useFocusRingStyles({ color: String(border) });
  const borderRadiusStyles = useBorderRadius({ rounded });

  const styles = {
    container: [
      focusRingStyles,
      tw`relative flex items-center justify-center mt-2 ml-2 border border-solid cursor-pointer w-7 h-7`,
      borderRadiusStyles,
    ],
    iconCheck: [checked ? tw`opacity-100 fill-current` : tw`opacity-0 fill-current`],
  };

  return { styles: mapStyles(styles), focusProps };
}
