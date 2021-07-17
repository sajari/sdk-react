import { css, Global } from '@emotion/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { compile } from 'tempura';

import { useSearchUIContext } from '../../../ContextProvider';
import { checkValidTemplate } from '../../checkValidTemplate';
import Message from '../Message';
import TemplateResult from '../TemplateResult';
import { TemplateResultsProps } from './types';

const TemplateResults = (props: TemplateResultsProps) => {
  const { t } = useTranslation(['common', 'errors']);
  const { customClassNames } = useSearchUIContext();
  const { results, template, resultContainerTemplateElement } = props;
  try {
    // Get the keys of result
    const keys = Array.from(
      results?.reduce((acc, cur) => {
        Object.keys(cur).forEach((k) => acc.add(k));
        return acc;
      }, new Set<string>()),
    );
    const render = compile(template.html, { async: false, props: keys });
    render({});

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
