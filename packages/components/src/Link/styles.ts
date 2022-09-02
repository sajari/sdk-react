import { mapStyles, useTheme } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function useLinkStyles() {
  const theme = useTheme();

  const styles = {
    container: [
      tw`relative no-underline transition-colors duration-150 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current`,
      `&:hover, &:focus { color: ${theme.color.primary.base} }`,
    ],
  };

  return { styles: mapStyles(styles) };
}
