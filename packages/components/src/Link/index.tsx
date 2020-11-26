/* eslint-disable jsx-a11y/anchor-has-content */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mergeProps } from '@react-aria/utils';
import { __DEV__, useTheme } from '@sajari/react-sdk-utils';
import React from 'react';
import tw from 'twin.macro';

import { useFocusRingStyles } from '../hooks';
import { LinkProps } from './types';

const Link = React.forwardRef((props: LinkProps, ref?: React.Ref<HTMLAnchorElement>) => {
  const { focusProps, focusRingStyles } = useFocusRingStyles();
  const theme = useTheme();

  return (
    <a
      {...mergeProps(props, focusProps)}
      ref={ref}
      css={[tw`relative`, focusRingStyles, `&:hover, &:focus { color: ${theme.color.primary.base} }`]}
    />
  );
});

if (__DEV__) {
  Link.displayName = 'Link';
}

export default Link;
export type { LinkProps };
