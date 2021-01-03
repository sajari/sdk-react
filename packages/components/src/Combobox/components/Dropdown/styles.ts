import { mapStyles } from '@sajari/react-sdk-utils';

import { useDropdownStyles as useCoreDropdownStyles, UseDropdownStylesParams } from '../../../hooks';

export function useDropdownStyles(params: UseDropdownStylesParams) {
  const styles = useCoreDropdownStyles(params);
  return mapStyles(styles);
}
