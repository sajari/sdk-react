/* eslint-disable jsx-a11y/label-has-associated-control */
import { useTextField } from '@react-aria/textfield';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';
import tw from 'twin.macro';

import Box from '../../../Box';
import useRangeInputStyles from './styles';
import { RangeInputInputProps } from './types';

const Input = (props: RangeInputInputProps) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps, labelProps } = useTextField({ ...props, type: 'number' }, ref);
  const { label, min, max, disableDefaultStyles = false, styles: stylesProp, className } = props;
  const { styles: inputStyles, focusProps } = useRangeInputStyles(props);
  const styles = getStylesObject(inputStyles, disableDefaultStyles);

  return (
    <Box css={[styles.container, stylesProp]} className={className}>
      <Box as="label" css={tw`sr-only`} {...labelProps}>
        {label}
      </Box>
      <Box as="input" css={styles.input} {...inputProps} {...focusProps} min={min} max={max} ref={ref} />
    </Box>
  );
};

export default Input;
