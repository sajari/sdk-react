import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

export interface UseDropdownStylesParams {
  shown?: boolean;
}

export function useDropdownStyles({ shown = true }: UseDropdownStylesParams) {
  const styles = {
    container: [
      tw`absolute left-0 right-0 top-auto z-20 mt-1 bg-white rounded-md shadow-menu backdrop-blur-1 bg-opacity-95`,
      !shown ? tw`hidden` : tw``,
    ],
    heading: [tw`px-4 pt-2 text-xs text-gray-400 font-normal`],
    items: [tw`m-0 py-1 px-2 list-none`],
    footer: [
      tw`flex items-center justify-between px-4 py-2 text-xs text-gray-400 border-0 border-t border-gray-200 border-solid rounded-b bg-gray-50 rounded-b-inherit`,
    ],
    footerItem: [tw`flex items-center`],
    footerItems: [tw`flex items-center space-x-4`],
    footerIcon: [tw`mr-1.5 flex-shrink-0`],
    footerEscHint: [tw`mr-1 font-medium`],
    poweredBy: [tw`ml-auto`],
  };

  return mapStyles(styles);
}
