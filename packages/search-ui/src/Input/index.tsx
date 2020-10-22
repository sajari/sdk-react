import { Combobox } from '@sajari/react-components';
// import { useCombobox } from 'downshift';
import React from 'react';
import { __DEV__ } from 'sajari-react-sdk-utils';

import { InputProps } from './types';

const Input = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
  const { placeholder = 'Search', ...rest } = props;

  return <Combobox ref={ref} placeholder={placeholder} {...rest} />;
});

if (__DEV__) {
  Input.displayName = 'Input';
}

export default Input;
export type { InputProps };
