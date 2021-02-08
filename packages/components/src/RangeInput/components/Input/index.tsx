/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTextField } from '@react-aria/textfield';
import { mergeProps } from '@react-aria/utils';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';
import tw from 'twin.macro';

import Box from '../../../Box';
import useRangeInputStyles from './styles';
import { RangeInputInputProps } from './types';

const Input = (props: RangeInputInputProps) => {
  const { label, min, max, step, disableDefaultStyles = false, styles: stylesProp, className } = props;
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps, labelProps } = useTextField(props, ref);
  const { styles: inputStyles, focusProps } = useRangeInputStyles(props);
  const styles = getStylesObject(inputStyles, disableDefaultStyles);

  return (
    <Box css={[styles.container, stylesProp]} className={className}>
      <Box as="label" css={tw`sr-only`} {...labelProps}>
        {label}
      </Box>
      <input css={styles.input} {...mergeProps(inputProps, focusProps)} min={min} max={max} step={step} ref={ref} />
    </Box>
  );
};

export default Input;
