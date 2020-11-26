import { Pagination as PurePagination } from '@sajari/react-components';
import { usePagination } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';

import { PaginationProps } from './types';

const Pagination = (props: PaginationProps) => {
  const { align } = props;
  const { page, setPage, pageSize, pageCount, totalResults } = usePagination('search');

  return (
    <PurePagination
      page={page}
      pageSize={pageSize}
      totalResults={totalResults}
      pageCount={pageCount}
      onChange={setPage}
      align={align}
    />
  );
};

if (__DEV__) {
  Pagination.displayName = 'Pagination';
}

export default Pagination;
