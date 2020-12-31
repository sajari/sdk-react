import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useDropdownItemStyles as useCoreDropdownItemStyles, useFontSize } from '../../../hooks';
import { SelectProps } from '../../types';
import { OptionProps } from './types';

interface UseOptionStylesParams extends Omit<OptionProps, 'size'> {
  highlighted: boolean;
  selected: boolean;
  size: SelectProps['size'];
}

export function useOptionStyles(params: UseOptionStylesParams) {
  const { size, highlighted, selected, disabled } = params;
  const fontSizeStyles = useFontSize({ size });
  const { root, label } = useCoreDropdownItemStyles({ highlighted });
  const styles = {
    option: [root, disabled ? tw`text-gray-400 cursor-not-allowed` : null],
    children: [tw`flex-1`, selected ? tw`pl-1` : tw`pl-4`, fontSizeStyles],
    label: [label],
  };

  return { styles: mapStyles(styles) };
}
