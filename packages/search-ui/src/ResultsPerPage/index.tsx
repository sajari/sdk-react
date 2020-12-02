/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Label, Select } from '@sajari/react-components';
import { useResultsPerPage, useSearchContext } from '@sajari/react-hooks';
import { getStylesObject } from '@sajari/react-sdk-utils';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import useResultsPerPageStyles from './styles';
import { ResultsPerPageProps } from './types';

const defaultSizes = [15, 25, 50, 100];

const ResultsPerPage = (props: ResultsPerPageProps) => {
  const { t } = useTranslation();
  const { customClassNames, disableDefaultStyles = false } = useSearchUIContext();
  const { label = t('resultsPerPage.label'), sizes = defaultSizes, styles: stylesProp, size, ...rest } = props;
  const { resultsPerPage, setResultsPerPage } = useResultsPerPage();
  const { searched, totalResults } = useSearchContext();
  const id = `page-size-${useId()}`;
  const sizesSorted = sizes.sort((a, b) => a - b);
  const [min] = sizesSorted;

  if (!searched || totalResults === 0 || min > totalResults) {
    return null;
  }

  const styles = getStylesObject(useResultsPerPageStyles(), disableDefaultStyles);

  return (
    <div css={[styles.container, stylesProp]} {...rest} className={customClassNames.resultsPerPage?.container}>
      <Label
        htmlFor={id}
        css={styles.label}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.resultsPerPage?.label}
      >
        {label}
      </Label>
      <Select
        id={id}
        value={`${resultsPerPage}`}
        onChange={(e) => setResultsPerPage(parseInt(e.target.value, 10))}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.resultsPerPage?.select}
      >
        {sizes.map((s, i) => (
          <option key={`${id}-option-${i}`} value={s}>
            {s}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ResultsPerPage;
export type { ResultsPerPageProps };
