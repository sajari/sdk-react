import { useId } from '@react-aria/utils';
import { cleanChildren, getStylesObject } from '@sajari/react-sdk-utils';
import React, { cloneElement, useRef, useState } from 'react';

import Box from '../Box';
import { useCheckboxGroupStyles } from './styles';
import { CheckboxGroupProps } from './types';

const CheckboxGroup = (props: CheckboxGroupProps) => {
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

  const [values, setValues] = useState(defaultValue || []);
  const { current: isControlled } = useRef(valueProp != null);
  const internalValues = (isControlled ? valueProp : values) || [];
  const styles = getStylesObject(useCheckboxGroupStyles(props), disableDefaultStyles);

  const internalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    let newValues: Array<any>;

    if (checked) {
      newValues = [...internalValues, value];
    } else {
      newValues = internalValues.filter((val) => val !== value);
    }
    if (!isControlled) {
      setValues(newValues);
    }
    if (onChange) {
      onChange(newValues);
    }
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `checkbox-${useId()}`;
  const internalName = name || fallbackName;
  const validChildren = cleanChildren(children);

  const clones = validChildren.map((child, index) =>
    cloneElement(child, {
      key: `${internalName}-${index}`,
      name: `${internalName}-${index}`,
      onChange: internalChange,
      checked: internalValues.includes(child.props.value),
      disableDefaultStyles,
    }),
  );

  return (
    <Box {...rest} role="group" css={[styles.container, stylesProp]}>
      {clones}
    </Box>
  );
};

export default CheckboxGroup;
export type { CheckboxGroupProps };
