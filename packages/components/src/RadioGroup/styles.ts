import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useSpacing } from '../hooks';
import { RadioGroupProps } from './types';

export default function useRadioGroupStyles(props: RadioGroupProps) {
  const { inline = false, spacing = inline ? '4' : '1' } = props;
  const spacingStyles = useSpacing({ spacing, inline });
  const styles = {
    container: [tw`flex`, inline ? tw`flex-row` : tw`flex-col`, spacingStyles],
  };

  return mapStyles(styles);
}
