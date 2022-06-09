import { __DEV__ } from '@sajari/react-sdk-utils';
import * as React from 'react';

import { LogoSearchioColor, LogoSearchioMono } from '../assets/logos';
import Box from '../Box';
import Link from '../Link';
import usePoweredByStyles from './styles';
import { PoweredByProps } from './types';

const PoweredBy = React.forwardRef((props: PoweredByProps, ref?: React.Ref<HTMLAnchorElement>) => {
  const { appearance } = props;
  const styles = usePoweredByStyles();

  return (
    <Link
      href="https://www.search.io/?utm_source=react&amp;utm_medium=referral&amp;utm_campaign=poweredby"
      target="_blank"
      ref={ref}
      css={[styles.container]}
      {...props}
    >
      <Box as="span" css={styles.label}>
        Site search by
      </Box>
      {appearance === 'color' ? <LogoSearchioColor css={styles.logo} /> : <LogoSearchioMono css={styles.logo} />}
    </Link>
  );
});

if (__DEV__) {
  PoweredBy.displayName = 'PoweredBy';
}

export default PoweredBy;
export type { PoweredByProps };
