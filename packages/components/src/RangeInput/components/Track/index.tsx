/** @jsx jsx */
import { jsx } from '@emotion/core';
import { getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';

import Box, { BoxProps } from '../../../Box';
import useTrackStyles from './styles';

const Track = React.forwardRef((props: BoxProps, ref?: React.Ref<HTMLDivElement>) => {
  const { disableDefaultStyles = false, styles: stylesProps, ...rest } = props;
  const styles = getStylesObject(useTrackStyles(), disableDefaultStyles);

  return <Box css={[styles.container, stylesProps]} ref={ref} {...rest} />;
});

export default Track;
