/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import React from 'react';
import { __DEV__ } from '../../utils/assertion';

import tw from 'twin.macro';
import useInputStyle, { UseInputStyleProps } from '../../hooks/use-input-styles';
import Label from '../Label';
import { SelectProps } from './types';

export const Select = React.forwardRef((props: SelectProps, ref?: React.Ref<HTMLSelectElement>) => {
  const { id = `select-${useId()}`, children, disabled, invalid, placeholder, label, ...rest } = props;
  const styleProps = useInputStyle({ block: true, type: 'select', ...props } as UseInputStyleProps);

  return (
    <React.Fragment>
      {label && (
        <Label visuallyHidden={true} htmlFor={id}>
          {label}
        </Label>
      )}

      <select
        ref={ref}
        id={id}
        dir="auto"
        disabled={disabled}
        aria-invalid={invalid}
        css={css(styleProps, tw`form-select`)}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
    </React.Fragment>
  );
});

if (__DEV__) {
  Select.displayName = 'Select';
}

export type { SelectProps };
