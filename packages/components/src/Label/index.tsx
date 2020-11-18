/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';

import useLabelStyles from './styles';
import { LabelProps } from './types';

const Label = React.forwardRef((props: LabelProps, ref?: React.Ref<HTMLLabelElement>) => {
  const styles = useLabelStyles(props);

  return <label {...props} ref={ref} css={styles} />;
});

if (__DEV__) {
  Label.displayName = 'Label';
}

export default Label;
export type { LabelProps };
