/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { __DEV__ } from 'sajari-react-sdk-utils';

import { LogoSajariColor, LogoSajariMono } from '../assets/logos';
import Box from '../Box';
import usePoweredByStyles from './styles';
import { PoweredByProps } from './types';

const PoweredBy = React.forwardRef((props: PoweredByProps, ref?: React.Ref<HTMLDivElement>) => {
  const styles = usePoweredByStyles(props);
  const { appearance } = props;

  return (
    <Box ref={ref} css={styles.container} {...props}>
      <Box as="span" css={styles.label}>
        Powered by
      </Box>
      {appearance === 'color' ? <LogoSajariColor css={styles.logo} /> : <LogoSajariMono css={styles.logo} />}
    </Box>
  );
});

if (__DEV__) {
  PoweredBy.displayName = 'PoweredBy';
}

export default PoweredBy;
export type { PoweredByProps };
