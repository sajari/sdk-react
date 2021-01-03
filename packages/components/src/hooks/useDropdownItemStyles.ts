import { inferStylesObjectKeys, mapStyles, useTheme } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

interface UseDropdownItemStylesParams {
  highlighted?: boolean;
}

export function useDropdownItemStyles(params: UseDropdownItemStylesParams) {
  const { highlighted } = params;
  const theme = useTheme();

  const styles = inferStylesObjectKeys({
    root: [
      tw`flex items-center w-full px-2 py-1 leading-5 text-left transition-all duration-75 rounded cursor-pointer`,
    ],
    label: [tw`pl-4 ml-auto text-xs text-gray-400`],
  });

  if (highlighted) {
    styles.root.push(`color: ${theme.color.primary.text}; background: ${theme.color.primary.active};`);
    styles.label.push(`color: ${theme.color.primary.text};`);
  } else {
    styles.root.push(tw`text-gray-600`);
  }

  return mapStyles(styles);
}
