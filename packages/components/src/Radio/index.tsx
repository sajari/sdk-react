/* eslint-disable jsx-a11y/role-supports-aria-props */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import React from 'react';
import tw from 'twin.macro';
import useInputStyle, { UseInputStyleProps } from '../hooks/use-input-styles';
import { __DEV__ } from '../utils/assersion';
import Label from '../Label';
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

  const inputStyles = useInputStyle({
    block: true,
    type: 'radio',
    ...props,
  } as UseInputStyleProps);

  const comp = (
    <div css={tw`items-center inline-flex`} {...(!children ? rest : {})}>
      &#8203;
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
        className="form-radio"
        css={inputStyles}
      />
    </div>
  );

  if (!children) {
    return comp;
  }

  return (
    <div css={tw`flex items-center`} {...rest}>
      {comp}

      <Label htmlFor={id} css={[tw`ml-2`, invalid ? tw`text-red-500` : []]}>
        {children}
      </Label>
    </div>
  );
});

if (__DEV__) {
  Radio.displayName = 'Radio';
}

export default Radio;
export type { RadioProps };
