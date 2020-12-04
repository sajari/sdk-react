import { mapStyles, useTheme } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { FillProps } from './types';

export default function useFillStyles(props: FillProps) {
  const { index, isSingleHandle } = props;
  const theme = useTheme();

  const styles = {
    container: [
      [
        tw`h-full rounded-full cursor-pointer`,
        {
          backgroundColor:
            (index === 1 && !isSingleHandle) || (index === 0 && isSingleHandle)
              ? theme.color.primary.base
              : 'rgb(218, 223, 231)',
        },
      ],
    ],
  };

  return mapStyles(styles);
}
