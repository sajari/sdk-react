/* eslint-disable jsx-a11y/role-supports-aria-props */

import { useId } from '@react-aria/utils';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import Box from '../Box';
import Label from '../Label';
import useRadioStyles from './styles';
import { RadioProps } from './types';

const Radio = React.forwardRef((props: RadioProps, ref?: React.Ref<HTMLInputElement>) => {
  const {
    id = `radio-${useId()}`,
    name,
    value,
    color,
    defaultChecked,
    checked,
    disabled,
    invalid,
    readOnly,
    onChange,
    onBlur,
    onFocus,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    labelClassName,
    styles: stylesProp,
    disableDefaultStyles = false,
    ...rest
  } = props;

  const [privateChecked, setPrivateChecked] = React.useState(defaultChecked ?? false);
  const { current: controlled } = React.useRef(typeof checked !== 'undefined');
  const internalChecked = (controlled ? checked : privateChecked) ?? false;
  const { styles: radioStyles } = useRadioStyles(props);
  const styles = getStylesObject(radioStyles, disableDefaultStyles);

  const internalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!controlled) {
      setPrivateChecked(event.target.checked);
    }
    if (onChange) {
      onChange(event);
    }
  };

  const comp = (
    <Box css={[styles.componentWrapper, !children && stylesProp]} {...(!children ? rest : {})}>
      <input
        ref={ref}
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={internalChange}
        onBlur={onBlur}
        onFocus={onFocus}
        checked={internalChecked}
        disabled={disabled}
        readOnly={readOnly}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={invalid}
        aria-checked={internalChecked}
        css={styles.input}
      />
    </Box>
  );

  if (!children) {
    return comp;
  }

  return (
    <Box css={[styles.container, stylesProp]} {...rest}>
      {comp}

      <Label htmlFor={id} css={styles.label} className={labelClassName}>
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
