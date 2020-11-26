import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function usePoweredByStyles() {
  const styles = {
    container: [tw`inline-flex items-center text-xs text-gray-400`],
    logo: [tw`inline-block align-middle`],
    label: [tw`pr-2`],
  };

  return mapStyles(styles);
}
