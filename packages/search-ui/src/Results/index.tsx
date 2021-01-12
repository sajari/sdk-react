import { ResizeObserver } from '@sajari/react-components';
import { useQuery, useSearchContext, useTracking } from '@sajari/react-hooks';
import { getStylesObject, isEmpty, isNullOrUndefined } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import mapResultFields from '../utils/mapResultFields';
import Message from './components/Message';
import Result from './components/Result';
import useResultsStyles from './styles';
import { ResultsProps, ResultValues } from './types';

const Results = (props: ResultsProps) => {
  const { results: rawResults, searching, fields, error } = useSearchContext();
  const results = React.useMemo(() => (rawResults ? mapResultFields<ResultValues>(rawResults, fields) : undefined), [
    rawResults,
  ]);
  const { disableDefaultStyles = false, customClassNames, viewType, setViewType } = useSearchUIContext();
  const { query } = useQuery();
  const { defaultAppearance, appearance = viewType, styles: stylesProp, ...rest } = props;
  const [width, setWidth] = React.useState(0);
  const { handleResultClicked } = useTracking();
  const hasImages = React.useMemo(() => results?.some((r) => r.values?.image), [results]);
  const styles = getStylesObject(useResultsStyles({ ...props, appearance, width }), disableDefaultStyles);
  const { t } = useTranslation(['common', 'errors', 'result']);

  React.useEffect(() => {
    if (defaultAppearance) {
      setViewType(defaultAppearance);
    }
  }, []);

  if (error) {
    let body = t('errors:generic');

    if (error.statusCode === 403) {
      body = t('errors:authorization');
    } else if (error.name === 'NetworkError' || error.message.startsWith('NetworkError')) {
      body = t('errors:connection');
    }

    return <Message title={t('common:error')} body={body} className={customClassNames.results?.errorMessage} />;
  }

  // We've not searched yet
  if (isNullOrUndefined(results)) {
    return (
      <Message
        title={t('common:loading')}
        appearance="loading"
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.results?.searchingMessage}
      />
    );
  }

  // There's genuinely no results
  // Show a loader if we're refreshing from no results
  if (isEmpty(results)) {
    if (searching) {
      return (
        <Message
          title={t('common:loading')}
          appearance="loading"
          disableDefaultStyles={disableDefaultStyles}
          className={customClassNames.results?.searchingMessage}
        />
      );
    }

    return (
      <Message
        title={t('results:empty.title')}
        body={t('results:empty.body', { query: `<strong>${query}</strong>` })}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.results?.emptyMessage}
      />
    );
  }

  return (
    <ResizeObserver
      onResize={(rect) => setWidth(rect.width)}
      css={[styles.container, stylesProp]}
      className={customClassNames.results?.container}
    >
      {results?.map(({ values, token }, i) => (
        <Result
          onClick={handleResultClicked}
          token={token}
          // eslint-disable-next-line no-underscore-dangle
          key={values._id ?? i}
          values={values}
          appearance={appearance}
          forceImage={hasImages}
          disableDefaultStyles={disableDefaultStyles}
          className={customClassNames.results?.item}
          headingClassName={customClassNames.results?.heading}
          descriptionClassName={customClassNames.results?.description}
          priceClassName={customClassNames.results?.price}
          ratingClassName={customClassNames.results?.rating}
          subTitleClassName={customClassNames.results?.subTitle}
          {...rest}
        />
      ))}
    </ResizeObserver>
  );
};

export default Results;
export type { ResultsProps };
