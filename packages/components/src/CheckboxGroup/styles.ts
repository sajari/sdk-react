import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useSpacing } from '../hooks';
import { CheckboxGroupProps } from './types';

export function useCheckboxGroupStyles(props: CheckboxGroupProps) {
  const { inline, spacing = inline ? '4' : '1' } = props;
  const spacingStyles = useSpacing({ spacing, inline });
  const styles = {
    container: [tw`flex`, inline ? tw`flex-row` : tw`flex-col`, spacingStyles],
  };

  return mapStyles(styles);
}
