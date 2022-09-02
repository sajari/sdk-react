import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { UseInputStyleProps, useInputStyles } from '../../../hooks';
import { SelectProps } from '../../types';

export type UseButtonStylesParams = Required<Pick<SelectProps, 'size' | 'invalid' | 'disabled'>> & { open: boolean };

export function useButtonStyles(params: UseButtonStylesParams) {
  const { styles: inputStyles } = useInputStyles({
    type: 'select',
    ...params,
  } as UseInputStyleProps);

  const styles = { container: [tw`h-auto m-0`, inputStyles] };

  if (params.open) {
    styles.container.push(tw`ring-2 ring-offset-1 ring-current`);
  }

  return { styles: mapStyles(styles) };
}
