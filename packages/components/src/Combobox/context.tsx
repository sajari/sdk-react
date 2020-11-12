import { createContext } from '@sajari/react-sdk-utils';
import { PropGetters } from 'downshift';

import { ComboboxMode, ComboboxProps } from './types';

interface ComboboxContextProps {
  mode: ComboboxMode;
  inputValue: string;
  open: boolean;
  items: ComboboxProps['items'];
  completion: string;
  getItemProps: PropGetters<any>['getItemProps'];
  getMenuProps: PropGetters<any>['getMenuProps'];
  highlightedIndex: number;
  selectedItem: any;
  showDropdownTips: boolean;
  showPoweredBy: boolean;
  typedInputValue: string;
}

const [ComboboxContextProvider, useComboboxContext] = createContext<ComboboxContextProps>({
  strict: true,
  name: 'ComboboxContext',
});

export default ComboboxContextProvider;
export { useComboboxContext };
