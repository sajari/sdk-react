import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

interface UseVoicesStylesParams {
  active?: boolean;
}

export default function useVoiceStyles({ active }: UseVoicesStylesParams) {
  const styles = {
    container: [
      tw`transition duration-200 bg-transparent border-0 outline-none cursor-pointer m-0`,
      active ? tw`text-red-500` : tw`hover:text-gray-600 focus:text-gray-600`,
    ],
  };

  return mapStyles(styles);
}
