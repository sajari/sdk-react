import { css } from '@emotion/core';
import { useTheme } from '@sajari/react-sdk-utils';
import tw, { TwStyle } from 'twin.macro';

import { useTabContext } from '../context';
import { TabProps } from './types';

export default function useTabStyles(props: TabProps) {
  const { selected, disabled } = props;
  const { fitted } = useTabContext();
  const theme = useTheme();
  const styles: (TwStyle | string)[] = [];

  styles.push(
    tw`relative flex items-center justify-center px-4 py-3 m-0 -mb-px text-base text-gray-500 bg-transparent border-2 border-transparent border-solid outline-none font-inherit`,
    `&:focus { border-color: ${theme.color.primary.base} }`,
  );

  if (!selected) {
    styles.push(tw`hover:text-gray-700 focus:text-gray-700`);
  }

  if (fitted) {
    styles.push(tw`flex-1`);
  }

  if (disabled) {
    styles.push(tw`text-gray-400 cursor-not-allowed`);
  }

  if (selected) {
    styles.push(`color: ${theme.color.primary.base}; border-bottom-color: ${theme.color.primary.base};`);
  }

  return { styles: [css(styles)] };
}
