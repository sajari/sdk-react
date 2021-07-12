import { css, Global } from '@emotion/core';
import { ResizeObserver } from '@sajari/react-components';
import { useQuery, useSearchContext, useTracking } from '@sajari/react-hooks';
import { getStylesObject, isEmpty, isEmptyObject, isNullOrUndefined } from '@sajari/react-sdk-utils';
import Handlebars from 'handlebars';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import mapResultFields from '../utils/mapResultFields';
import Message from './components/Message';
import Result from './components/Result';
import TemplateResult from './components/TemplateResult';
import useResultsStyles from './styles';
import { ResultsProps, ResultValues, Template } from './types';

export function checkValidTemplate(
  template?: Omit<Template, 'css'> | null | Record<string, never>,
): template is Template {
  return !isNullOrUndefined(template) && !isEmptyObject(template) && !isEmpty(template?.html);
}

const Results = (props: ResultsProps) => {
  const { results: rawResults, searching, fields, error } = useSearchContext();
  const results = React.useMemo(() => (rawResults ? mapResultFields<ResultValues>(rawResults, fields) : undefined), [
    rawResults,
  ]);
  const { disableDefaultStyles = false, customClassNames, viewType, setViewType } = useSearchUIContext();
  const { query } = useQuery();
  const {
    defaultAppearance,
    appearance = viewType,
    styles: stylesProp,
    resultContainerTemplateElement,
    template,
    ...rest
  } = props;
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

  // Just to see if the template can not be parsed correctly
  if (checkValidTemplate(template)) {
    try {
      const compiled = Handlebars.compile(template.html);
      compiled({});

      return (
        <div className={customClassNames.results?.template?.container}>
          {checkValidTemplate(template) && template.css ? (
            // We inject here (once) instead of mutliple times in each result component
            <Global
              styles={css`
                ${template.css}
              `}
            />
          ) : null}
          {results?.map(({ values }, i) => (
            <TemplateResult
              // eslint-disable-next-line no-underscore-dangle
              key={values._id ?? i}
              values={values}
              template={template}
              as={resultContainerTemplateElement}
            />
          ))}
        </div>
      );
    } catch (e) {
      console.error(e);
      const body = t('errors:template');
      return <Message title={t('common:error')} body={body} showReset />;
    }
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
          onSaleStatusClassName={customClassNames.results?.onSaleStatus}
          outOfStockStatusClassName={customClassNames.results?.outOfStockStatus}
          newArrivalStatusClassName={customClassNames.results?.newArrivalStatus}
          template={template}
          template={template}
          {...rest}
        />
      ))}
    </ResizeObserver>
  );
};

export default Results;
export type { ResultsProps, ResultValues };
