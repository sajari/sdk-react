/* eslint-disable no-console */
import { css, SerializedStyles } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';

import { ItemProps } from './types';

type Styles = {
  item: SerializedStyles[];
  highlight: SerializedStyles[];
  label: SerializedStyles[];
};

export function useItemStyles(props: ItemProps) {
  const { selected } = props;
  const styles: Record<string, (string | TwStyle)[]> = {
    item: [
      tw`flex items-center w-full px-3 py-2 leading-5 text-left transition-all duration-150 rounded cursor-pointer`,
    ],
    highlight: [tw`font-semibold`],
    label: [tw`flex items-center ml-auto text-sm text-gray-400 transition-opacity duration-150`],
  };

  if (selected) {
    styles.item.push(tw`text-gray-700 bg-gray-100`);
  } else {
    styles.item.push(tw`text-gray-500`);
    styles.highlight.push(tw`text-gray-900`);
  }

  return Object.entries(styles).reduce((obj, [key, value]) => Object.assign(obj, { [key]: css(value) }), {}) as Styles;
}
