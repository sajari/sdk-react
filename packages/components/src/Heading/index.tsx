/** @jsx jsx */
import { jsx } from '@emotion/core';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';

import Box from '../Box';
import useHeadingStyles from './styles';
import { HeadingProps } from './types';

const Heading = React.forwardRef((props: HeadingProps, ref?: React.Ref<HTMLHeadingElement>) => {
  const { as = 'h1', size, truncate, ...rest } = props;
  const styles = useHeadingStyles({ size, as, truncate });

  return <Box ref={ref} as={as} css={styles} {...rest} />;
});

if (__DEV__) {
  Heading.displayName = 'Heading';
}

export default Heading;
export type { HeadingProps };
