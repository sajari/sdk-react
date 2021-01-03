import { mapStyles, useTheme } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useFocusRingStyles } from '../hooks';

export default function useLinkStyles() {
  const theme = useTheme();
  const { focusRingStyles, focusProps: focusRingProps } = useFocusRingStyles();

  const styles = {
    container: [
      tw`relative transition-colors duration-150`,
      focusRingStyles,
      `&:hover, &:focus { color: ${theme.color.primary.base} }`,
    ],
  };

  return { styles: mapStyles(styles), focusRingProps };
}
