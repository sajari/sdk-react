import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

interface UseViewOptionStyleParams {
  inline?: boolean;
}

export default function useViewOptionStyles(params: UseViewOptionStyleParams) {
  const { inline } = params;
  const styles = {
    container: [tw`min-w-0`, inline ? tw`flex items-center space-x-2` : tw`space-y-1`],
    label: [
      tw`text-gray-500`,
      inline ? undefined : tw`text-gray-400 font-medium tracking-wide leading-snug text-xs uppercase`,
    ].filter(Boolean),
  };

  return mapStyles(styles);
}
