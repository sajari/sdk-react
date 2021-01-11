import { Pagination as PurePagination } from '@sajari/react-components';
import { usePagination } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import { PaginationProps } from './types';

const Pagination = (props: PaginationProps) => {
  const { t } = useTranslation('pagination');
  const { page, setPage, pageCount, resultsPerPage, totalResults } = usePagination('search');
  const { customClassNames, disableDefaultStyles, language } = useSearchUIContext();

  return (
    <PurePagination
      language={language}
      page={page}
      resultsPerPage={resultsPerPage}
      totalResults={totalResults}
      pageCount={pageCount}
      onChange={setPage}
      i18n={{
        label: t('label'),
        previous: t('previous'),
        next: t('next'),
        page: (params) => t('page', params),
        current: (params) => t('current', params),
      }}
      className={customClassNames?.pagination?.container}
      buttonClassName={customClassNames?.pagination?.button}
      activeClassName={customClassNames?.pagination?.active}
      prevClassName={customClassNames?.pagination?.prev}
      nextClassName={customClassNames?.pagination?.next}
      statusClassName={customClassNames?.pagination?.status}
      disableDefaultStyles={disableDefaultStyles}
      {...props}
    />
  );
};

if (__DEV__) {
  Pagination.displayName = 'Pagination';
}

export default Pagination;
export type { PaginationProps };
