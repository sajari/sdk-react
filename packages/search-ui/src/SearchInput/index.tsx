import { TextInput } from '@sajari/react-components';
import React from 'react';
import { __DEV__ } from 'sajari-react-sdk-utils';

import { SearchInputProps } from './types';

const SearchInput = React.forwardRef((props: SearchInputProps, ref: React.Ref<HTMLInputElement>) => {
  return <TextInput ref={ref} {...props} />;
});

if (__DEV__) {
  SearchInput.displayName = 'SearchInput';
}

export default SearchInput;
export type { SearchInputProps };
