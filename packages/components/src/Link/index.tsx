/* eslint-disable jsx-a11y/anchor-has-content */

import { mergeProps } from '@react-aria/utils';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';

import { useFocusRingStyles } from '../hooks';
import useLinkStyles from './styles';
import { LinkProps } from './types';

const Link = React.forwardRef((props: LinkProps, ref?: React.Ref<HTMLAnchorElement>) => {
  const { focusProps } = useFocusRingStyles();
  const { disableDefaultStyles = false, styles: stylesProp, ...rest } = props;
  const styles = getStylesObject(useLinkStyles(), disableDefaultStyles);

  return <a {...mergeProps(rest, focusProps)} ref={ref} css={[styles.container, stylesProp]} />;
});

if (__DEV__) {
  Link.displayName = 'Link';
}

export default Link;
export type { LinkProps };
