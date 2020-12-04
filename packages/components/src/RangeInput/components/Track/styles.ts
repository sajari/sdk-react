import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function useTrackStyles() {
  const styles = {
    container: [tw`relative flex-1 h-1`, 'touch-action: none;'],
  };

  return mapStyles(styles);
}
