import { mapStyles } from '@sajari/react-sdk-utils';
import Color from 'color';
import tw, { theme as twTheme } from 'twin.macro';

import { useFocusRingStyles } from '../../../hooks';
import { HandleProps } from './types';

export default function useHandleStyles(props: HandleProps) {
  const { active } = props;
  const { focusRingStyles, focusProps } = useFocusRingStyles({ rounded: 'full' });
  const colorShadow = new Color(twTheme`colors.gray.900`);

  const styles = {
    container: [
      tw`w-4 h-4 transition duration-200 bg-white border-none rounded-full outline-none appearance-none cursor-pointer before:(absolute transform -translate-x-1/2 text-xs px-1 rounded mb-1 bg-gray-900 bg-opacity-75 text-white text-center transition-opacity duration-200)`,
      {
        boxShadow: `inset 0 0 0 1px ${colorShadow.alpha(0.15).hsl()},
            inset 0 -1px 0 ${colorShadow.alpha(0.15).hsl()},
            0 1px 1px ${colorShadow.alpha(0.1).hsl()}`,
      },
      `&::before {
        content: attr(data-value);
        bottom: 100%;
        left: 50%;
        opacity: ${active ? 1 : 0};
      }
      &:hover::before,
      &:focus::before {
        opacity: 1;
      }`,
      { touchAction: 'pan-x' },
      focusRingStyles,
    ],
  };

  return { styles: mapStyles(styles), focusProps };
}
