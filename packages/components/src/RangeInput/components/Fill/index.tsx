import { getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';

import Box from '../../../Box';
import useFillStyles from './styles';
import { FillProps } from './types';

const Fill = React.forwardRef((props: FillProps, ref?: React.Ref<HTMLDivElement>) => {
  const { index, disableDefaultStyles = false, styles: stylesProp, ...rest } = props;
  const styles = getStylesObject(useFillStyles(props), disableDefaultStyles);

  return <Box css={[styles.container, stylesProp]} ref={ref} {...rest} />;
});

export default Fill;
