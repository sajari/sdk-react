/** @jsx jsx */
import { jsx } from '@emotion/core';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React, { Children, cloneElement, isValidElement } from 'react';

import Box from '../Box';
import { useAspectRatioStyles } from './styles';
import { AspectRatioProps } from './types';

const AspectRatio = React.forwardRef((props: AspectRatioProps, ref?: React.Ref<HTMLElement>) => {
  const { as = 'div', ratio = 16 / 9, children, ...rest } = props;
  let child;

  if (children) {
    child = Children.only<React.ReactChild>(children);

    if (!isValidElement(child)) {
      return null;
    }
  }

  const styles = useAspectRatioStyles({ ...props, ratio });

  return (
    <Box ref={ref} as={as} {...rest} css={styles}>
      {child ? cloneElement(child) : null}
    </Box>
  );
});

if (__DEV__) {
  AspectRatio.displayName = 'AspectRatio';
}

export default AspectRatio;

export type { AspectRatioProps };
