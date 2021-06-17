import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function useMessageStyles() {
  const styles = {
    container: [tw`w-full px-6 py-20 text-center md:py-40 md:px-12`],
    loadingWrapper: [tw`text-gray-500`],
    loadingSpinner: [tw`inline-block w-6 h-6`],
    loadingText: [tw`mt-3`],
    defaultText: [tw`text-gray-500`],
  };

  return mapStyles(styles);
}
