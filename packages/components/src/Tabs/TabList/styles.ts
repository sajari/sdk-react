import { mapStyles } from '@sajari/react-sdk-utils';
import tw, { theme as twTheme } from 'twin.macro';

import { useTabContext } from '../context';

export default function useTabListStyles() {
  const { align } = useTabContext();
  const styles = {
    container: [
      tw`overflow-auto whitespace-nowrap`,
      { boxShadow: `inset 0 -1px 0 ${twTheme`colors.gray.200`.toString()}` },
    ],
    innerContainer: [tw`flex border-0 border-b border-gray-200 border-solid`],
  };

  switch (align) {
    case 'center':
      styles.innerContainer.push(tw`justify-center`);
      break;

    case 'end':
      styles.innerContainer.push(tw`justify-end`);
      break;

    default:
    case 'start':
      styles.innerContainer.push(tw`justify-start`);
      break;
  }

  return mapStyles(styles);
}
