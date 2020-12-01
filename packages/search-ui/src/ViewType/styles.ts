import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function useViewTypeStyles() {
  const styles = {
    container: [tw`flex items-center space-x-4`],
    label: [tw`text-gray-500`],
  };

  return mapStyles(styles);
}
