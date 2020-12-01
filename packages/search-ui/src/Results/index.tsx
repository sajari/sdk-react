/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ResizeObserver } from '@sajari/react-components';
import { useQuery, useSearchContext, useTracking } from '@sajari/react-hooks';
import { isEmpty, isNullOrUndefined } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import mapResultFields from '../utils/mapResultFields';
import Message from './components/Message';
import Result from './components/Result';
import useResultsStyles from './styles';
import { ResultsProps, ResultValues } from './types';

const Results = (props: ResultsProps) => {
  const { results: rawResults, setViewType, viewType, searching, fields, error } = useSearchContext();
  const results = React.useMemo(() => (rawResults ? mapResultFields<ResultValues>(rawResults, fields) : undefined), [
    rawResults,
  ]);
  const { query } = useQuery();
  const {
    defaultAppearance,
    appearance = viewType,
    className,
    disableDefaultStyles = false,
    styles: stylesProp,
    ...rest
  } = props;
  const [width, setWidth] = React.useState(0);
  const { handleResultClicked } = useTracking();
  const { ratingMax } = useSearchUIContext();
  const hasImages = React.useMemo(() => results?.some((r) => r.values?.image), [results]);
  const styles = useResultsStyles({ ...props, appearance, width });
  const { t } = useTranslation();

  React.useEffect(() => {
    if (defaultAppearance) {
      setViewType(defaultAppearance);
    }
  }, []);

  if (error) {
    let body = t('errors.generic');

    if (error.statusCode === 403) {
      body = t('errors.authorization');
    } else if (error.name === 'NetworkError' || error.message.startsWith('NetworkError')) {
      body = t('errors.connection');
    }

    return <Message title={t('texts.error')} body={body} />;
  }

  // We've not searched yet
  if (isNullOrUndefined(results)) {
    return null;
  }

  // There's genuinely no results
  // Show a loader if we're refreshing from no results
  if (isEmpty(results)) {
    if (searching) {
      return <Message title={t('texts.loading')} appearance="loading" />;
    }

    return (
      <Message
        title={t('results.empty.title')}
        body={t('results.empty.body', { query: `<strong>${query}</strong>` })}
      />
    );
  }

  return (
    <ResizeObserver
      onResize={(rect) => setWidth(rect.width)}
      css={[styles.container, stylesProp]}
      className={className}
    >
      {results?.map(({ values, token }, i) => (
        <Result
          onClick={handleResultClicked}
          token={token}
          ratingMax={ratingMax}
          // eslint-disable-next-line no-underscore-dangle
          key={values._id ?? i}
          values={values}
          appearance={appearance}
          forceImage={hasImages}
          disableDefaultStyles={disableDefaultStyles}
          {...rest}
        />
      ))}
    </ResizeObserver>
  );
};

export default Results;
export type { ResultsProps };
