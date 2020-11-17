import { mapStyles } from '@sajari/react-sdk-utils';
import tw, { TwStyle } from 'twin.macro';

export default function useInputStyles({ selected }: { selected: boolean }) {
  const styles: Record<string, TwStyle[]> = {
    item: [tw`p-2 text-left transition-all duration-75 rounded cursor-pointer`],
  };

  if (selected) {
    styles.item.push(tw`bg-gray-100`);
  }

  return mapStyles(styles);
}
