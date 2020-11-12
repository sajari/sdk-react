/* eslint-disable jsx-a11y/role-supports-aria-props */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import React from 'react';
import tw from 'twin.macro';

import Box from '../Box';
import useInputStyle, { UseInputStyleProps } from '../hooks/useInputStyles';
import Label from '../Label';
import { __DEV__ } from '../utils/assertion';
import { RadioProps } from './types';

const Radio = React.forwardRef((props: RadioProps, ref?: React.Ref<HTMLInputElement>) => {
  const {
    id = `checkbox-${useId()}`,
    name,
    value,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    color,
    defaultChecked,
    checked,
    disabled,
    invalid,
    readOnly,
    onChange,
    onBlur,
    onFocus,
    children,
    ...rest
  } = props;

  const { styles, focusRingStyles, focusProps } = useInputStyle({
    block: true,
    type: 'radio',
    ...props,
  } as UseInputStyleProps);

  const comp = (
    <Box css={tw`inline-flex items-center`} {...(!children ? rest : {})}>
      &#8203;
      <Box as="span" css={[tw`relative`, focusRingStyles]}>
        <input
          ref={ref}
          type="radio"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          defaultChecked={defaultChecked}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={invalid}
          css={[tw`form-radio`, styles]}
          {...focusProps}
        />
      </Box>
    </Box>
  );

  if (!children) {
    return comp;
  }

  return (
    <Box css={tw`flex items-center`} {...rest}>
      {comp}

      <Label htmlFor={id} css={[tw`ml-2`, invalid ? tw`text-red-500` : []]}>
        {children}
      </Label>
    </Box>
  );
});

if (__DEV__) {
  Radio.displayName = 'Radio';
}

export default Radio;
export type { RadioProps };
