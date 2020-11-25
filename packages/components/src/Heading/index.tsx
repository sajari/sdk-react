/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRefWithAs } from '@sajari/react-sdk-utils';
import React from 'react';

import Box from '../Box';
import useHeadingStyles from './styles';
import { HeadingProps } from './types';

type DefaultElement = 'h1';

const HeadingComponent = (props: HeadingProps, ref: React.Ref<HTMLHeadingElement>) => {
  const { as = 'h1', size, truncate, ...rest } = props;
  const styles = useHeadingStyles({ size, as, truncate });

  return <Box ref={ref} as={as} css={styles} {...rest} />;
};

const Heading = forwardRefWithAs<HeadingProps, DefaultElement>(HeadingComponent);

export default Heading;
export type { HeadingProps };
