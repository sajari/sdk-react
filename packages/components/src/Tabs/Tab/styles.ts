import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';
import { useTheme } from '../../styles/theming';
import { useTabContext } from '../context';
import { TabProps } from './types';

export default function useTabStyles(props: TabProps) {
  const { selected, disabled } = props;
  const { fitted } = useTabContext();
  const theme = useTheme();

  const styles: (TwStyle | string)[] = [];

  styles.push(
    tw`-mb-px border-0 border-solid border-b-2 m-0 border-transparent px-4 py-3 text-gray-500 focus:outline-none bg-transparent`,
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

  return css(styles);
}
