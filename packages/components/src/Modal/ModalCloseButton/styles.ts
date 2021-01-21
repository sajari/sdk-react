import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function useModalCloseButtonStyles() {
  const styles = {
    container: [tw`ml-auto -mr-4`],
  };

  return mapStyles(styles);
}
