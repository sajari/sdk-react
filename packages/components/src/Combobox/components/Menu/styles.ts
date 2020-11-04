/* eslint-disable no-console */
import { css, SerializedStyles } from '@emotion/core';
import tw from 'twin.macro';

type Styles = {
  container: SerializedStyles[];
  heading: SerializedStyles[];
  items: SerializedStyles[];
  footer: SerializedStyles[];
  footerItem: SerializedStyles[];
  footerIcon: SerializedStyles[];
};

export function useItemsStyles({ shown = true }) {
  const styles = {
    container: [
      tw`absolute left-0 right-0 z-20 mt-2 bg-white border border-gray-300 rounded-lg shadow`,
      !shown ? tw`hidden` : null,
    ],
    heading: [tw`px-4 pt-2 text-xs text-gray-400`],
    items: [tw`p-1`],
    footer: [
      tw`flex items-center px-4 py-2 space-x-4 text-sm text-gray-400 border-t border-gray-200 rounded-b bg-gray-50 rounded-b-inherit`,
    ],
    footerItem: [tw`flex items-center`],
    footerIcon: [tw`mr-1.5`],
  };

  return Object.entries(styles).reduce((obj, [key, value]) => Object.assign(obj, { [key]: css(value) }), {}) as Styles;
}
