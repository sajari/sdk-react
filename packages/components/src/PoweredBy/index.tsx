import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';

import { LogoSajariColor, LogoSajariMono } from '../assets/logos';
import Box from '../Box';
import Link from '../Link';
import usePoweredByStyles from './styles';
import { PoweredByProps } from './types';

const PoweredBy = React.forwardRef((props: PoweredByProps, ref?: React.Ref<HTMLAnchorElement>) => {
  const { appearance } = props;
  const styles = usePoweredByStyles();

  return (
    <Link
      href="https://www.sajari.com/?utm_source=react&amp;utm_medium=referral&amp;utm_campaign=poweredby"
      target="_blank"
      ref={ref}
      css={[styles.container]}
      {...props}
    >
      <Box as="span" css={styles.label}>
        Powered by
      </Box>
      {appearance === 'color' ? <LogoSajariColor css={styles.logo} /> : <LogoSajariMono css={styles.logo} />}
    </Link>
  );
});

if (__DEV__) {
  PoweredBy.displayName = 'PoweredBy';
}

export default PoweredBy;
export type { PoweredByProps };
