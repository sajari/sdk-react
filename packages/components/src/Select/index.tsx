/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import React from 'react';
import tw from 'twin.macro';
import { __DEV__ } from '../utils/assertion';

import useInputStyle, { UseInputStyleProps } from '../hooks/use-input-styles';
import Label from '../Label';
import { SelectProps } from './types';
import Box from '../Box';

const Select = React.forwardRef((props: SelectProps, ref?: React.Ref<HTMLSelectElement>) => {
  const { id = `select-${useId()}`, children, disabled, invalid, placeholder, label, ...rest } = props;
  const styleProps = useInputStyle({ block: true, type: 'select', ...props } as UseInputStyleProps);

  return (
    <React.Fragment>
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
        css={[tw`form-select`, styleProps]}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </Box>
    </React.Fragment>
  );
});

if (__DEV__) {
  Select.displayName = 'Select';
}

export default Select;
export type { SelectProps };
