import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { useJustifyContent } from '../hooks';
import { PaginationProps } from './types';

export default function usePaginationStyles(props: PaginationProps) {
  const { align = 'center' } = props;
  const justifyContentStyles = useJustifyContent({ align });

  const styles = {
    container: [tw`flex`, justifyContentStyles],
  };

  return mapStyles(styles);
}
