/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRefWithAs, PropsWithAs } from '@sajari/react-sdk-utils';
import React from 'react';

import Box from '../Box';
import { TextSizes, useTextSize } from '../hooks';
import useHeadingStyles from './styles';
import { HeadingElements, HeadingProps } from './types';

type DefaultElement = 'h1';

const mapElementToSize = (element: HeadingElements): TextSizes => {
  switch (element) {
    case 'h6':
      return 'xs';
    case 'h5':
      return 'sm';
    case 'h4':
      return 'base';
    case 'h3':
      return 'lg';
    case 'h2':
      return 'xl';
    case 'h1':
      return '2xl';
    default:
      return 'base';
  }
};

const HeadingComponent = (props: PropsWithAs<HeadingProps, DefaultElement>, ref: React.Ref<HTMLHeadingElement>) => {
  const { as = 'h1', size = mapElementToSize(as), truncate, ...rest } = props;
  const styles = useHeadingStyles({ size, as, truncate });
  const sizeStyles = useTextSize({ size });

  return <Box ref={ref} as={as} css={[styles, sizeStyles]} {...rest} />;
};

const Heading = forwardRefWithAs<HeadingProps, DefaultElement>(HeadingComponent);

export default Heading;
export type { HeadingProps };
