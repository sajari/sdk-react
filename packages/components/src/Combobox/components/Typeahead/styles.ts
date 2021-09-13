import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { getInputSpacingStyles } from '../../styles';
import { ComboboxSize } from '../../types';

interface TypeaheadStylesProps {
  size?: ComboboxSize;
}

export function useTypeaheadStyles(props: TypeaheadStylesProps) {
  const { size } = props;
  const styles = {
    container: [tw`text-gray-400`, getInputSpacingStyles(size)],
    hidden: [tw`opacity-0`],
  };

  return mapStyles(styles);
}
