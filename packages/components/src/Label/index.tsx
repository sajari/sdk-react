/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';

import useTextSize from '../hooks/useTextSize';
import useLabelStyles from './styles';
import { LabelProps } from './types';

const Label = React.forwardRef((props: LabelProps, ref?: React.Ref<HTMLLabelElement>) => {
  const { size } = props;
  const styles = useLabelStyles(props);
  const sizeStyles = useTextSize({ size });

  return <label {...props} ref={ref} css={[styles, sizeStyles]} />;
});

if (__DEV__) {
  Label.displayName = 'Label';
}

export default Label;
export type { LabelProps };
