/* eslint-disable */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTextField } from '@react-aria/textfield';
import React from 'react';
import tw from 'twin.macro';
import { RangeInputInputProps } from './types';

export const Input = (props: RangeInputInputProps) => {
  const ref = React.useRef<any>();
  const { inputProps, labelProps } = useTextField({ ...props, type: 'number' }, ref);
  return (
    <div css={tw`flex`}>
      <label css={tw`sr-only`} {...labelProps}>
        {props.label}
      </label>
      <input
        css={tw`block w-full text-gray-600 border border-gray-300 border-solid focus:shadow-outline-blue outline-none transition-shadow duration-200 ease-in-out rounded px-3 py-2`}
        {...inputProps}
        min={props.min}
        max={props.max}
        ref={ref}
      />
    </div>
  );
};
