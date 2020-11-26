import { createContext } from '@sajari/react-sdk-utils';
import { PropGetters } from 'downshift';

import { ComboboxMode, ComboboxProps } from './types';

interface ComboboxContextProps<T = any> {
  mode: ComboboxMode;
  inputValue: string;
  open: boolean;
  items: ComboboxProps<T>['items'];
  completion: string;
  getItemProps: PropGetters<any>['getItemProps'];
  getMenuProps: PropGetters<any>['getMenuProps'];
  highlightedIndex: number;
  selectedItem: T;
  showDropdownTips: boolean;
  showPoweredBy: boolean;
  typedInputValue: string;
  renderItem?: ComboboxProps<T>['renderItem'];
  itemToString: Required<ComboboxProps<T>>['itemToString'];
  itemToUrl: Required<ComboboxProps<T>>['itemToUrl'];
  onSelect: ComboboxProps<T>['onSelect'];
}

const [ComboboxContextProvider, useComboboxContext] = createContext<ComboboxContextProps>({
  strict: true,
  name: 'ComboboxContext',
});

export default ComboboxContextProvider;
export { useComboboxContext };
