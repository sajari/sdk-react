import { css, Global } from '@emotion/core';
import React, { useMemo } from 'react';
import { compile } from 'tempura';

import { useSearchUIContext } from '../../../ContextProvider';
import { checkValidResultTemplate } from '../../checkValidResultTemplate';
import { isBanner } from '../../utils';
import BannerItem from '../BannerItem';
import TemplateResult from '../TemplateResult';
import { Result, TemplateResultsProps } from './types';

const TemplateResults = (props: TemplateResultsProps) => {
  const { customClassNames } = useSearchUIContext();
  const { results, bannersByPosition, resultTemplate, resultContainerTemplateElement, numberOfCols, ...rest } = props;
  // Get the keys of a result, using Set to eliminate dups
  const keys = Array.from(
    results
      .map((r) => (r as Result).values)
      .reduce((acc, cur) => {
        Object.keys(cur).forEach((k) => acc.add(k));
        return acc;
      }, new Set<string>()),
  );
  keys.push('productStatus');
  keys.push('productPrice');
  keys.push('variantIndex');
  const keysStringified = keys.join(',');
  const render = useMemo(() => compile(resultTemplate.html, { async: false, props: keys }), [
    resultTemplate.html,
    keysStringified,
  ]);

  return (
    <div className={customClassNames.results?.template?.container}>
      {checkValidResultTemplate(resultTemplate) && resultTemplate.css ? (
        // We inject here (once) instead of mutliple times in each result component
        <Global
          styles={css`
            ${resultTemplate.css}
          `}
        />
      ) : null}
      {results.map((result, i) => {
        const banner = bannersByPosition[i];

        if (banner && isBanner(banner)) {
          return <BannerItem key={`banner-${banner.id}`} banner={banner} numberOfCols={numberOfCols} />;
        }

        return (
          <TemplateResult
            // eslint-disable-next-line no-underscore-dangle
            key={result.values._id ?? i}
            result={result as Result}
            render={render}
            as={resultContainerTemplateElement}
            {...rest}
          />
        );
      })}
    </div>
  );
};

export default TemplateResults;
