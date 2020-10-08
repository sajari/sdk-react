/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { __DEV__ } from '../utils/assersion';
import { LabelProps } from './types';
import useLabelStyles from './styles';

const Label = React.forwardRef((props: LabelProps, ref?: React.Ref<HTMLLabelElement>) => {
  const styles = useLabelStyles(props);

  return <label {...props} ref={ref} css={styles} />;
});

if (__DEV__) {
  Label.displayName = 'Label';
}

export default Label;
export type { LabelProps };
