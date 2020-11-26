/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';
import tw from 'twin.macro';

import Box from '../Box';
import { UseInputStyleProps, useInputStyles } from '../hooks';
import Label from '../Label';
import { SelectProps } from './types';

const Select = React.forwardRef((props: SelectProps, ref?: React.Ref<HTMLSelectElement>) => {
  const { id = `select-${useId()}`, children, disabled, invalid, placeholder, label, size, ...rest } = props;
  const { styles, focusRingStyles, focusProps } = useInputStyles({
    block: true,
    type: 'select',
    size,
    ...props,
  } as UseInputStyleProps);

  return (
    <Box css={[tw`relative`, focusRingStyles]}>
      {label && (
        <Label visuallyHidden htmlFor={id}>
          {label}
        </Label>
      )}

      <Box
        as="select"
        ref={ref}
        id={id}
        dir="auto"
        disabled={disabled}
        aria-invalid={invalid}
        css={[tw`form-select`, styles]}
        {...focusProps}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </Box>
    </Box>
  );
});

if (__DEV__) {
  Select.displayName = 'Select';
}

export default Select;
export type { SelectProps };
