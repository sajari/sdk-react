import { mapStyles, useTheme } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { HandleProps } from './types';

export default function useHandleStyles(props: HandleProps) {
  const theme = useTheme();

  const styles = {
    container: [
      tw`w-4 h-4 p-0 m-0 transition duration-200 bg-white border border-gray-300 border-solid rounded-full shadow outline-none appearance-none cursor-pointer border-opacity-80 font-inherit leading-inherit`,
      tw`before:(absolute bottom-full left-1/2 opacity-0 text-xs px-1 rounded mb-2 bg-gray-900 bg-opacity-75 text-white text-center transition-opacity duration-200)`,
      tw`focus:ring-2 focus:ring-offset-1 focus:ring-current`,
      `color: ${theme.color.primary.base};`,
      `&::before {
        content: attr(data-value);
        transform: translateX(-50%);
      }
      &:hover::before,
      &:focus::before {
        opacity: 1;
      }`,
      { touchAction: 'pan-x' },
    ],
  };

  return { styles: mapStyles(styles) };
}
