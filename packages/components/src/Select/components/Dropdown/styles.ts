import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useDropdownStyles as useCoreDropdownStyles, useFocusRingStyles } from '../../../hooks';

interface UseDropdownStylesParams {
  shown: boolean;
}

export function useDropdownStyles(params: UseDropdownStylesParams) {
  const { shown } = params;
  const { container } = useCoreDropdownStyles({ shown });
  const { focusProps: focusRingProps, focusRingStyles } = useFocusRingStyles();
  const styles = {
    container: [
      tw`p-1 pb-0 overflow-auto list-none focus:outline-none max-h-80 min-w-max-content`,
      container,
      focusRingStyles,
    ],
  };

  return { styles: mapStyles(styles), focusRingProps };
}
