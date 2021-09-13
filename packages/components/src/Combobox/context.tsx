/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from '@sajari/react-sdk-utils';
import { PropGetters } from 'downshift';

import { ComboboxCustomClassNames, ComboboxMode, ComboboxProps, ComboboxSize } from './types';

interface ComboboxContextProps<T = any> {
  mode: ComboboxMode;
  inputValue: string;
  open: boolean;
  items: ComboboxProps<T>['items'];
  completion: string;
  getItemProps: PropGetters<T>['getItemProps'];
  getMenuProps: PropGetters<T>['getMenuProps'];
  highlightedIndex: number;
  selectedItem: T;
  showDropdownTips: boolean;
  showPoweredBy: boolean;
  typedInputValue: string;
  renderItem?: ComboboxProps<T>['renderItem'];
  itemToString: Required<ComboboxProps<T>>['itemToString'];
  itemToUrl: Required<ComboboxProps<T>>['itemToUrl'];
  onSelect: ComboboxProps<T>['onSelect'];
  disableDefaultStyles: ComboboxProps<T>['disableDefaultStyles'];
  customClassNames: ComboboxCustomClassNames;
  inAttachMode?: boolean;
  inputElement?: React.RefObject<HTMLInputElement>;
  size?: ComboboxSize;
}

const [ComboboxContextProvider, useComboboxContext] = createContext<ComboboxContextProps>({
  strict: true,
  name: 'ComboboxContext',
});

export default ComboboxContextProvider;
export { useComboboxContext };
