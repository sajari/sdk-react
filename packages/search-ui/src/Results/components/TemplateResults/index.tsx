import { css, Global } from '@emotion/core';
import { Banner } from '@sajari/sdk-js';
import React, { useMemo } from 'react';
import { compile } from 'tempura';

import { useSearchUIContext } from '../../../ContextProvider';
import { checkValidResultTemplate } from '../../checkValidResultTemplate';
import { isBanner, mergeBannersWithResults } from '../../utils';
import BannerItem from '../BannerItem';
import TemplateResult from '../TemplateResult';
import { Result, TemplateResultsProps } from './types';

const TemplateResults = (props: TemplateResultsProps) => {
  const { customClassNames } = useSearchUIContext();
  const { results, banners, resultTemplate, resultContainerTemplateElement, ...rest } = props;
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

  const list = mergeBannersWithResults<Result>(banners, results || []);

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
      {list.map((item, i) => {
        const banner = item as Banner;
        const result = item as Result;

        if (isBanner(banner)) {
          return <BannerItem key={`banner-${banner.id}`} templateMode banner={banner} />;
        }

        return (
          <TemplateResult // eslint-disable-next-line no-underscore-dangle
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
