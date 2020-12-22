/* eslint-disable jsx-a11y/anchor-has-content */

import { mergeProps } from '@react-aria/utils';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import useLinkStyles from './styles';
import { LinkProps } from './types';

const Link = React.forwardRef((props: LinkProps, ref?: React.Ref<HTMLAnchorElement>) => {
  const { disableDefaultStyles = false, styles: stylesProp, ...rest } = props;
  const { styles, focusRingProps } = useLinkStyles();

  return (
    <a
      {...mergeProps(rest, focusRingProps)}
      ref={ref}
      css={[getStylesObject(styles.container, disableDefaultStyles), stylesProp]}
    />
  );
});

if (__DEV__) {
  Link.displayName = 'Link';
}

export default Link;
export type { LinkProps };
