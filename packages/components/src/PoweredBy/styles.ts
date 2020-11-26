import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function usePoweredByStyles() {
  const styles = {
    container: [tw`flex items-center m-2 text-xs text-gray-400`],
    logo: [tw`inline-block align-middle`],
    label: [tw`pr-1`],
  };

  return mapStyles(styles);
}
