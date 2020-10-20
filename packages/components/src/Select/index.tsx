/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import React from 'react';
import tw from 'twin.macro';

import Box from '../Box';
import useInputStyle, { UseInputStyleProps } from '../hooks/useInputStyles';
import Label from '../Label';
import { __DEV__ } from '../utils/assertion';
import { SelectProps } from './types';

const Select = React.forwardRef((props: SelectProps, ref?: React.Ref<HTMLSelectElement>) => {
  const { id = `select-${useId()}`, children, disabled, invalid, placeholder, label, ...rest } = props;
  const styles = useInputStyle({ block: true, type: 'select', ...props } as UseInputStyleProps);

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
        css={[tw`form-select`, styles]}
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
