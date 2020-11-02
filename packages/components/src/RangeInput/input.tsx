/* eslint-disable */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTextField } from '@react-aria/textfield';
import useInputStyle, { UseInputStyleProps } from '../hooks/useInputStyles';
import React from 'react';
import tw from 'twin.macro';
import { RangeInputInputProps } from './types';

export const Input = (props: RangeInputInputProps) => {
  const ref = React.useRef<any>();
  const { inputProps, labelProps } = useTextField({ ...props, type: 'number' }, ref);
  const styles = useInputStyle({ block: true, type: 'text', ...props } as UseInputStyleProps);

  return (
    <div css={tw`flex`}>
      <label css={tw`sr-only`} {...labelProps}>
        {props.label}
      </label>
      <input css={[tw`form-input`, styles]} {...inputProps} min={props.min} max={props.max} ref={ref} />
    </div>
  );
};
