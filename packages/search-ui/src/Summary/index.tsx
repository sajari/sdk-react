/* eslint-disable react/jsx-one-expression-per-line */
import { Box, Button, Text } from '@sajari/react-components';
import { useAutocomplete, useSearchContext } from '@sajari/react-hooks';
import { pluralize } from '@sajari/react-sdk-utils';
import React from 'react';
import { LiveMessage } from 'react-aria-live';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import { SummaryProps } from './types';

const Summary = (props: SummaryProps) => {
  const { latency, totalResults, search, queryValues, searched } = useSearchContext();
  const { disableDefaultStyles } = useSearchUIContext();
  const { showOverride = true, showLatency = false, ...rest } = props;
  const query = queryValues?.get('q') ?? '';
  const { completion } = useAutocomplete();
  const { t } = useTranslation();

  if (!searched) {
    return null;
  }

  return (
    <React.Fragment>
      <LiveMessage
        message={t('summary.results', {
          count: totalResults,
          object: pluralize(totalResults, t('texts.result'), t('texts.results')),
          query,
        })}
        aria-live="polite"
      />

      <Text {...rest} disableDefaultStyles={disableDefaultStyles}>
        <Box
          as="span"
          dangerouslySetInnerHTML={{
            __html: t('summary.results', {
              count: totalResults.toLocaleString(),
              object: pluralize(totalResults, t('texts.result'), t('texts.results')).toLowerCase(),
              query: `<strong>${query}</strong>`,
            } as Record<string, string>),
          }}
        />
        {showLatency ? ` ${t('summary.latency', { time: latency })}` : ''}
        {completion && completion !== query.trim() && showOverride ? (
          <React.Fragment>
            {`. ${t('summary.alternative')} `}
            <Button
              onClick={() => search(completion)}
              spacing="none"
              appearance="link"
              disableDefaultStyles={disableDefaultStyles}
            >
              {completion}
            </Button>
            .
          </React.Fragment>
        ) : null}
      </Text>
    </React.Fragment>
  );
};

export default Summary;
export type { SummaryProps };
