import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function useModalHeader() {
  const styles = {
    container: [tw`py-2 px-6 relative flex h-15 items-center border-b border-gray-200`],
  };

  return mapStyles(styles);
}
