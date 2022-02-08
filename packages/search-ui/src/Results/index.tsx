import { ResizeObserver } from '@sajari/react-components';
import { usePagination, useQuery, useSearchContext } from '@sajari/react-hooks';
import { escapeHTML, getStylesObject, isEmpty, isNullOrUndefined } from '@sajari/react-sdk-utils';
import { Banner, TextPosition } from '@sajari/sdk-js';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import mapResultFields from '../utils/mapResultFields';
import { checkValidResultTemplate } from './checkValidResultTemplate';
import BannerItem from './components/BannerItem';
import Message from './components/Message';
import Result from './components/Result';
import TemplateResults from './components/TemplateResults';
import { filterBannersPerPage } from './filterBannersPerPage';
import useResultsStyles, { getNumberOfCols } from './styles';
import { ResultsProps, ResultValues } from './types';
import { isBanner } from './utils';

const Results = (props: ResultsProps) => {
  const { results: rawResults, searching, fields, error, banners } = useSearchContext();
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
    resultTemplate,
    onResetTemplate,
    openNewTab = false,
    allowBanner = false,
    ...rest
  } = props;
  const [width, setWidth] = React.useState(0);
  const hasImages = React.useMemo(() => results?.some((r) => r.values?.image), [results]);
  const styles = getStylesObject(useResultsStyles({ ...props, appearance, width }), disableDefaultStyles);
  const { t } = useTranslation(['common', 'errors', 'result']);
  const numberOfCols = getNumberOfCols({ ...props, width });
  const { resultsPerPage, page } = usePagination();

  // TODO(tuan): remove this
  const sampleBanners: Banner[] = [
    {
      id: '0',
      width: 2,
      height: 2,
      title: 'Title One',
      description: 'This is an example description text.',
      imageUrl:
        'https://ik.imagekit.io/j7pm1g0d0uh/staging/1617265323067869891/tuandaosajari/24JjXXUTLX1yAc5v73DoNbWZa35',
      position: 1,
      textColor: '#1a181c',
      targetUrl: 'https://example.com',
      textPosition: TextPosition.BottomLeft,
    },
    {
      id: '1',
      width: 2,
      height: 1,
      title: 'Title Two',
      description: 'Another example description but this time this text is purposely written in a longer form.',
      imageUrl:
        'https://ik.imagekit.io/j7pm1g0d0uh/staging/1617265323067869891/tuandaosajari/24JjXZb89U453ij8PqycN33od4p',
      position: 4,
      textColor: '#5c627b',
      targetUrl: 'https://example.com',
      textPosition: TextPosition.BottomLeft,
    },
  ];

  const renderBanners = filterBannersPerPage(sampleBanners, resultsPerPage, page);

  const bannersExpanded = React.useMemo(() => {
    if ((appearance === 'list' && !checkValidResultTemplate(resultTemplate)) || !allowBanner)
      return (results ?? []).map(() => undefined);

    return (results ?? []).map((_, i) => {
      const matchingBanner = renderBanners.find((b) => b.position - 1 === i);

      return matchingBanner;
    });
  }, [results, appearance, allowBanner]);

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

    const safeQuery = escapeHTML(query);
    return (
      <Message
        appearance="default"
        title={t('results:empty.title')}
        dangerouslySetHTMLBody={t('results:empty.body', { query: `<strong>${safeQuery}</strong>` })}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.results?.emptyMessage}
      />
    );
  }

  if (checkValidResultTemplate(resultTemplate)) {
    const TemplateErrorMessage = () => (
      <Message
        appearance="default"
        title={t('errors:template:title')}
        dangerouslySetHTMLBody={t('errors:template:body')}
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
          results={results}
          bannersExpanded={bannersExpanded}
          resultTemplate={resultTemplate}
          resultContainerTemplateElement={resultContainerTemplateElement}
          numberOfCols={numberOfCols}
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
      {results?.map((result, i) => {
        const banner = bannersExpanded[i];

        if (banner && isBanner(banner)) {
          return <BannerItem key={`banner-${banner.id}`} banner={banner} numberOfCols={numberOfCols} />;
        }
        return (
          <Result
            // eslint-disable-next-line no-underscore-dangle
            key={result.values._id ?? i}
            result={result}
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
            isPinned={result.promotionPinned}
            {...rest}
          />
        );
      })}
    </ResizeObserver>
  );
};

export default Results;
export type { ResultsProps, ResultValues };
