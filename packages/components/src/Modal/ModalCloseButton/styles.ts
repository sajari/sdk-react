import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export default function useModalCloseButtonStyles() {
  const styles = {
    container: [
      tw`inline-flex relative items-center justify-center m-0 ml-auto -mr-4 px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 focus:text-gray-700 no-underline bg-transparent hover:bg-gray-100 focus:bg-gray-100 rounded-md border border-transparent transition duration-150 ease-in-out cursor-pointer focus:outline-none select-none`,
    ],
    icon: [tw`inline-block align-middle transition-all duration-200 ease-in-out transform fill-current`],
  };

  return mapStyles(styles);
}
