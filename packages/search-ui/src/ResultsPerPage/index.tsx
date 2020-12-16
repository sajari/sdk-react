import { useId } from '@react-aria/utils';
import { Select } from '@sajari/react-components';
import { useResultsPerPage, useSearchContext } from '@sajari/react-hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import ViewOption from '../ViewOption';
import { ResultsPerPageProps } from './types';

const defaultOptions = [15, 25, 50, 100];

const ResultsPerPage = (props: ResultsPerPageProps) => {
  const { t } = useTranslation('resultsPerPage');
  const { customClassNames, disableDefaultStyles = false } = useSearchUIContext();
  const { label = t('label'), options = defaultOptions, styles: stylesProp, size, ...rest } = props;
  const { resultsPerPage, setResultsPerPage } = useResultsPerPage();
  const { totalResults } = useSearchContext();
  const id = `page-size-${useId()}`;
  const optionsSorted = options.sort((a, b) => a - b);
  const [min] = optionsSorted;

  if (totalResults === 0 || min > totalResults) {
    return null;
  }

  return (
    <ViewOption
      id={id}
      label={label}
      size={size}
      containerClassName={customClassNames.sorting?.container}
      labelClassName={customClassNames.sorting?.label}
      renderAsLabel
      {...rest}
    >
      <Select
        id={id}
        value={`${resultsPerPage}`}
        onChange={(e) => setResultsPerPage(parseInt(e.target.value, 10))}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.resultsPerPage?.select}
      >
        {optionsSorted.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>
    </ViewOption>
  );
};

export default ResultsPerPage;
export type { ResultsPerPageProps };
