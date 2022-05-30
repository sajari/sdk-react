import { css, Global } from '@emotion/core';
import React, { useMemo } from 'react';
import { compile } from 'tempura';

import { useSearchUIContext } from '../../../ContextProvider';
import { checkValidResultTemplate } from '../../checkValidResultTemplate';
import blocks from '../../resultTemplateHelpers';
import { isBanner, mergeBannersWithResults } from '../../utils';
import BannerItem from '../BannerItem';
import TemplateResult from '../TemplateResult';
import { Result, TemplateResultsProps } from './types';

const TemplateResults = (props: TemplateResultsProps) => {
  const { customClassNames } = useSearchUIContext();
  const {
    results,
    banners,
    resultTemplate,
    resultContainerTemplateElement,
    numberOfCols,
    containerStyle,
    ...rest
  } = props;
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
  const render = useMemo(
    () => compile(resultTemplate.html, { async: false, props: keys, blocks, loose: resultTemplate.loose ?? false }),
    [resultTemplate.html, keysStringified],
  );

  const list = useMemo(() => mergeBannersWithResults<Result>(banners, results || []), [banners, results]);

  return (
    <div css={containerStyle} className={customClassNames.results?.template?.container}>
      {checkValidResultTemplate(resultTemplate) && resultTemplate.css ? (
        // We inject here (once) instead of mutliple times in each result component
        <Global
          styles={css`
            ${resultTemplate.css}
          `}
        />
      ) : null}
      {list.map((item, i) => {
        if (isBanner(item)) {
          return <BannerItem key={`banner-${item.id}`} banner={item} numberOfCols={numberOfCols} />;
        }

        return (
          <TemplateResult // eslint-disable-next-line no-underscore-dangle
            key={item.values._id ?? i}
            result={item as Result}
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
