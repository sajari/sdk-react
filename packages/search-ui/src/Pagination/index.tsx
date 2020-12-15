import { Pagination as PurePagination } from '@sajari/react-components';
import { usePagination } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import { PaginationProps } from './types';

const Pagination = (props: PaginationProps) => {
  const { t } = useTranslation('pagination');
  const { align, styles, scrollTarget, scrollToTop } = props;
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
      align={align}
      i18n={{
        label: t('label'),
        previous: t('previous'),
        next: t('next'),
        page: t('page', { page }),
        current: t('current', { page }),
      }}
      styles={styles}
      className={customClassNames?.pagination?.container}
      buttonClassName={customClassNames?.pagination?.button}
      activeClassName={customClassNames?.pagination?.active}
      prevClassName={customClassNames?.pagination?.prev}
      nextClassName={customClassNames?.pagination?.next}
      disableDefaultStyles={disableDefaultStyles}
      scrollToTop={scrollToTop}
      scrollTarget={scrollTarget}
    />
  );
};

if (__DEV__) {
  Pagination.displayName = 'Pagination';
}

export default Pagination;
export type { PaginationProps };
