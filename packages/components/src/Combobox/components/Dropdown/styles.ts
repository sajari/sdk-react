import tw from 'twin.macro';

import { mapStyles } from '../../../utils/style-props';

export function useDropdownStyles({ shown = true }) {
  const styles = {
    container: [
      tw`absolute left-0 right-0 top-auto z-20 mt-2 bg-white border border-gray-300 rounded-lg shadow`,
      !shown ? tw`hidden` : tw``,
    ],
    heading: [tw`px-4 pt-2 text-xs text-gray-400`],
    items: [tw`p-1`],
    footer: [
      tw`flex items-center justify-between px-4 text-sm text-gray-400 border-t border-gray-200 rounded-b bg-gray-50 rounded-b-inherit`,
    ],
    footerItem: [tw`flex items-center`],
    footerItems: [tw`flex items-center py-2 space-x-4`],
    footerIcon: [tw`mr-1.5`],
  };

  return mapStyles(styles);
}
