import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function useModalFooterStyles() {
  const styles = {
    container: [tw`space-x-4 p-4 border-t border-gray-200 justify-end`],
  };

  return mapStyles(styles);
}
