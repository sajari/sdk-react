/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTextField } from '@react-aria/textfield';
import React from 'react';
import tw from 'twin.macro';

import Box from '../../../Box';
import useInputStyle, { UseInputStyleProps } from '../../../hooks/useInputStyles';
import { RangeInputInputProps } from './types';

const Input = (props: RangeInputInputProps) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps, labelProps } = useTextField({ ...props, type: 'number' }, ref);
  const { styles, focusRingStyles, focusProps } = useInputStyle({
    block: true,
    type: 'text',
    ...props,
  } as UseInputStyleProps);
  const { label, min, max } = props;
  // TODO: Replace the magic numbers
  const widthStyles = { width: `${38 + max.toString().length * 12}px` };

  return (
    <Box css={[tw`relative`, focusRingStyles]}>
      <label css={tw`sr-only`} {...labelProps}>
        {label}
      </label>
      <input
        css={[tw`form-input`, styles, tw`text-sm`, widthStyles]}
        {...inputProps}
        {...focusProps}
        min={min}
        max={max}
        ref={ref}
      />
    </Box>
  );
};

export default Input;
