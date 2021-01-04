import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useJustifyContent } from '../hooks';
import { PaginationProps } from './types';

export default function usePaginationStyles(props: PaginationProps) {
  const { align = 'center' } = props;
  const justifyContentStyles = useJustifyContent({ align });
  const spacerStyles = tw`py-2 border border-gray-200 border-solid rounded-none select-none`;

  const styles = {
    container: [tw`flex`, justifyContentStyles],
    spacerEllipsis: [tw`px-2 bg-gray-50`, spacerStyles],
    compactStatus: [tw`px-4 bg-white`, spacerStyles],
    compactStatusCount: [tw`text-gray-400`],
  };

  return mapStyles(styles);
}
