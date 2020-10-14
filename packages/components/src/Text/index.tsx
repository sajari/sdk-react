/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { __DEV__ } from '../utils/assertion';
import Box from '../Box';

import { Props as TextProps } from './types';
import useTextStyles from './useTextStyles';

const Text = React.forwardRef((props: TextProps, ref?: React.Ref<HTMLElement>) => {
  const { as = 'p', truncate, ...rest } = props;
  const styles = useTextStyles(as, truncate);

  // TODO: handle as === "kbd" as it depends on Badge component

  return <Box ref={ref} as={as} css={styles} {...rest} />;
});

if (__DEV__) {
  Text.displayName = 'Text';
}

export default Text;
export type { TextProps };
