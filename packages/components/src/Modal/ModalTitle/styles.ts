import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function useModalTitleStyles() {
  const styles = {
    container: [tw`font-medium flex-1`],
  };

  return mapStyles(styles);
}
