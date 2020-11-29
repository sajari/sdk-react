/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRefWithAs, PropsWithAs } from '@sajari/react-sdk-utils';
import React, { Children, cloneElement, isValidElement } from 'react';

import Box from '../Box';
import { useAspectRatioStyles } from './styles';
import { AspectRatioProps } from './types';

type DefaultElement = 'div';

const Component = (props: PropsWithAs<AspectRatioProps, DefaultElement>, ref: React.Ref<HTMLDivElement>) => {
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
};

const AspectRatio = forwardRefWithAs<AspectRatioProps, DefaultElement>(Component);

export default AspectRatio;

export type { AspectRatioProps };
