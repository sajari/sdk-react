/* eslint-disable jsx-a11y/label-has-associated-control */

import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';

import Box from '../Box';
import useLabelStyles from './styles';
import { LabelProps } from './types';

const Label = React.forwardRef((props: LabelProps, ref?: React.Ref<HTMLLabelElement>) => {
  const { disableDefaultStyles = false, visuallyHidden, styles: stylesProp, ...rest } = props;
  const styles = getStylesObject(useLabelStyles(props), disableDefaultStyles && !visuallyHidden);

  return <Box as="label" {...rest} ref={ref} css={[styles.container, stylesProp]} />;
});

if (__DEV__) {
  Label.displayName = 'Label';
}

export default Label;
export type { LabelProps };
