import { PropGetters } from 'downshift';
import { createContext } from 'sajari-react-sdk-utils';

import { ComboboxMode } from './types';

interface ComboboxContextProps {
  mode: ComboboxMode;
  inputValue: string;
  open: boolean;
  items: Array<string>;
  completion: string;
  getItemProps: PropGetters<any>['getItemProps'];
  getMenuProps: PropGetters<any>['getMenuProps'];
  highlightedIndex: number;
  selectedItem: any;
}

const [ComboboxContextProvider, useComboboxContext] = createContext<ComboboxContextProps>({
  strict: true,
  name: 'ComboboxContext',
});

export default ComboboxContextProvider;
export { useComboboxContext };
