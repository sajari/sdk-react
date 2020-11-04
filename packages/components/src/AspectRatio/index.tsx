/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Children, cloneElement, isValidElement } from 'react';

import Box from '../Box';
import { __DEV__ } from '../utils/assertion';
import { useAspectRatioStyles } from './styles';
import { AspectRatioProps } from './types';

const AspectRatio = React.forwardRef((props: AspectRatioProps, ref?: React.Ref<HTMLElement>) => {
  const { as = 'div', ratio = 16 / 9, children, ...rest } = props;
  const child = Children.only<React.ReactChild>(children);

  if (!isValidElement(child)) {
    return null;
  }

  const styles = useAspectRatioStyles({ ...props, ratio });

  return (
    <Box ref={ref} as={as} {...rest} css={styles.parent}>
      {cloneElement(child)}
    </Box>
  );
});

if (__DEV__) {
  AspectRatio.displayName = 'AspectRatio';
}

export default AspectRatio;

export type { AspectRatioProps };
