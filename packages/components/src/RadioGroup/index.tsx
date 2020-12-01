/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { cleanChildren, getStylesObject } from '@sajari/react-sdk-utils';
import React, { cloneElement, forwardRef, useImperativeHandle, useRef, useState } from 'react';

import useRadioGroupStyles from './styles';
import { RadioGroupProps } from './types';

const RadioGroup = forwardRef((props: RadioGroupProps, ref) => {
  const {
    onChange,
    name,
    defaultValue,
    value: valueProp,
    children,
    styles: stylesProp,
    disableDefaultStyles = false,
    ...rest
  } = props;
  const { current: isControlled } = useRef(valueProp != null);
  const [value, setValue] = useState(defaultValue || null);
  const internalValue = isControlled ? valueProp : value;
  const rootRef = useRef<HTMLDivElement | null>(null);

  const internalOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setValue(event.target.value);
    }
    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `radio-${useId()}`;
  const internalName = name || fallbackName;
  const validChildren = cleanChildren(children);

  const clones = validChildren.map((child, index) =>
    cloneElement(child, {
      key: `${internalName}-${index}`,
      name: internalName,
      onChange: internalOnChange,
      checked: child.props.value === internalValue,
      disableDefaultStyles,
    }),
  );

  // Calling focus() on the radiogroup should focus on the selected option or first enabled option
  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        let input = rootRef?.current?.querySelector<HTMLDivElement>('input:not(:disabled):checked');

        if (!input) {
          input = rootRef?.current?.querySelector('input:not(:disabled)');
        }

        if (input) {
          input.focus();
        }
      },
    }),
    [],
  );

  const styles = getStylesObject(useRadioGroupStyles(props), disableDefaultStyles);

  return (
    <div {...rest} ref={rootRef} role="radiogroup" css={[styles.container, stylesProp]}>
      {clones}
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
export type { RadioGroupProps };
