import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

interface UseRangeInputStylesParams {
  isSingleHandle?: boolean;
}

export default function useRangeInputStyles(props: UseRangeInputStylesParams) {
  const { isSingleHandle } = props;
  const styles = {
    container: [tw`flex flex-col px-2`],
    wrapper: [tw`w-full mt-8 mb-3`],
    ticks: [tw`relative`],
    tickItem: [
      tw`mb-2.5 text-xs text-center text-gray-400 after:(content w-0 border-r border-gray-300 border-solid h-1.5 absolute)`,
      { bottom: '100%' },
      '&::after { left: 50%; top: 100% }',
    ],
    input: [tw`flex flex-col items-center sm:flex-row`, isSingleHandle ? tw`justify-end` : tw`justify-between`],
  };

  return mapStyles(styles);
}
