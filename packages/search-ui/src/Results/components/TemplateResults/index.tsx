import { css, Global } from '@emotion/core';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { compile } from 'tempura';

import { useSearchUIContext } from '../../../ContextProvider';
import { checkValidResultTemplate } from '../../checkValidResultTemplate';
import Message from '../Message';
import TemplateResult from '../TemplateResult';
import { TemplateResultsProps } from './types';

const TemplateResults = (props: TemplateResultsProps) => {
  const { t } = useTranslation(['common', 'errors']);
  const { customClassNames } = useSearchUIContext();
  const { results, resultTemplate, resultContainerTemplateElement } = props;
  try {
    // Get the keys of a result, using Set to eliminate dups
    const keys = Array.from(
      results?.reduce((acc, cur) => {
        Object.keys(cur).forEach((k) => acc.add(k));
        return acc;
      }, new Set<string>()),
    );
    const keysStringified = keys.join(',');
    const render = useMemo(() => compile(resultTemplate.html, { async: false, props: keys }), [
      resultTemplate.html,
      keysStringified,
    ]);
    render({});

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
        {results?.map((values, i) => (
          <TemplateResult
            // eslint-disable-next-line no-underscore-dangle
            key={values._id ?? i}
            values={values}
            render={render}
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
};

export default TemplateResults;