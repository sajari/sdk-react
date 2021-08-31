import { ResizeObserver } from '@sajari/react-components';
import { useQuery, useSearchContext, useTracking } from '@sajari/react-hooks';
import { getStylesObject, isEmpty, isNullOrUndefined } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import { useClickTracking } from '../hooks';
import mapResultFields from '../utils/mapResultFields';
import { checkValidResultTemplate } from './checkValidResultTemplate';
import Message from './components/Message';
import Result from './components/Result';
import TemplateResults from './components/TemplateResults';
import useResultsStyles from './styles';
import { ResultsProps, ResultValues } from './types';

const Results = (props: ResultsProps) => {
  const { results: rawResults, searching, fields, error } = useSearchContext();
  const untrackedResults = React.useMemo(
    () => (rawResults ? mapResultFields<ResultValues>(rawResults, fields) : undefined),
    [rawResults],
  );
  const { disableDefaultStyles = false, customClassNames, viewType, setViewType, tracking } = useSearchUIContext();
  const { handleResultClicked } = useTracking();
  const results = React.useMemo(() => {
    return untrackedResults?.map((data) => {
      const { values, token } = data;
      const { onClick, href } = useClickTracking({ token, values, tracking, onClick: handleResultClicked });
      return {
        ...data,
        onClick,
        href,
      };
    });
  }, [tracking, handleResultClicked, untrackedResults]);
  const { query } = useQuery();
  const {
    defaultAppearance,
    appearance = viewType,
    styles: stylesProp,
    resultContainerTemplateElement,
    resultTemplate,
    onResetTemplate,
    openNewTab = false,
    ...rest
  } = props;
  const [width, setWidth] = React.useState(0);
  const { handleResultClicked, posNegLocalStorageManager } = useTracking();
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

    return (
      <Message title={t('common:error')} body={body} showReset className={customClassNames.results?.errorMessage} />
    );
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

  if (checkValidResultTemplate(resultTemplate)) {
    const TemplateErrorMessage = () => (
      <Message
        title={t('errors:template:title')}
        body={t('errors:template:body')}
        showReset
        onReset={onResetTemplate}
      />
    );
    return (
      <ErrorBoundary
        FallbackComponent={TemplateErrorMessage}
        resetKeys={[`${resultTemplate.html}${resultTemplate.css}`]}
      >
        <TemplateResults
          showVariantImage={rest.showVariantImage}
          // Automatically reassign the url of the result value to be the tracked url
          results={results.map((r) => ({ ...r, values: { ...r.values, url: r.href ?? r.values.url } }))}
          resultTemplate={resultTemplate}
          resultContainerTemplateElement={resultContainerTemplateElement}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ResizeObserver
      onResize={(rect) => setWidth(rect.width)}
      css={[styles.container, stylesProp]}
      className={customClassNames.results?.container}
    >
      {results?.map(({ values, onClick, href }, i) => (
        <Result
          posNegLocalStorageManager={posNegLocalStorageManager}
          onClick={onClick}
          href={href}
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
          onSaleStatusClassName={customClassNames.results?.onSaleStatus}
          outOfStockStatusClassName={customClassNames.results?.outOfStockStatus}
          newArrivalStatusClassName={customClassNames.results?.newArrivalStatus}
          openNewTab={openNewTab}
          {...rest}
        />
      ))}
    </ResizeObserver>
  );
};

export default Results;
export type { ResultsProps, ResultValues };
