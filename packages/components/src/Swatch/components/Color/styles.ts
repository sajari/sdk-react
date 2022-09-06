import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useBorderRadius } from '../../../hooks';
import { ColorProps } from '../../types';

interface UseColorStylesParams {
  checked: boolean;
  border: ColorProps['border'];
  rounded: ColorProps['rounded'];
  color: string;
}

export default function useColorStyles(props: UseColorStylesParams) {
  const { checked, color, rounded } = props;
  const borderRadiusStyles = useBorderRadius({ rounded });

  const styles = {
    container: [
      tw`relative flex items-center justify-center mt-2 ml-2 border border-solid cursor-pointer w-7 h-7 focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-current`,
      borderRadiusStyles,
    ],
    iconCheck: [checked ? tw`opacity-100 fill-current` : tw`opacity-0 fill-current`, `color: ${color}`],
  };

  return { styles: mapStyles(styles) };
}
