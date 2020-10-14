/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { __DEV__ } from 'sajari-react-sdk-utils';
import { PoweredByProps } from './types';
import usePoweredByStyles from './styles';
import { LogoSajariColor, LogoSajariMono } from '../assets/logos';

const PoweredBy = React.forwardRef((props: PoweredByProps, ref?: React.Ref<HTMLDivElement>) => {
  const styles = usePoweredByStyles(props);
  const { appearance } = props;

  return (
    <div {...props} ref={ref} css={styles.container}>
      <span css={styles.label}>Powered by</span>
      {appearance === 'color' ? <LogoSajariColor css={styles.logo} /> : <LogoSajariMono css={styles.logo} />}
    </div>
  );
});

if (__DEV__) {
  PoweredBy.displayName = 'PoweredBy';
}

export default PoweredBy;
export type { PoweredByProps };
