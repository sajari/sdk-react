import { Pagination as PurePagination } from '@sajari/react-components';
import { usePagination } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import { PaginationProps } from './types';

const Pagination = (props: PaginationProps) => {
  const { t } = useTranslation();
  const { align, styles } = props;
  const { page, setPage, pageSize, pageCount, totalResults } = usePagination('search');
  const { customClassNames, disableDefaultStyles } = useSearchUIContext();

  return (
    <PurePagination
      page={page}
      pageSize={pageSize}
      totalResults={totalResults}
      pageCount={pageCount}
      onChange={setPage}
      align={align}
      i18n={{
        label: t('pagination.label'),
        previous: t('pagination.previous'),
        next: t('pagination.next'),
        page: t('pagination.page'),
        current: t('pagination.current'),
      }}
      styles={styles}
      className={customClassNames?.pagination?.container}
      buttonClassName={customClassNames?.pagination?.button}
      pressedClassName={customClassNames?.pagination?.pressed}
      prevClassName={customClassNames?.pagination?.prev}
      nextClassName={customClassNames?.pagination?.next}
      disableDefaultStyles={disableDefaultStyles}
    />
  );
};

if (__DEV__) {
  Pagination.displayName = 'Pagination';
}

export default Pagination;
