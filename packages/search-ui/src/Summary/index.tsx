/* eslint-disable react/jsx-one-expression-per-line */
import { Box, Button, Text } from '@sajari/react-components';
import { useAutocomplete, useSearchContext } from '@sajari/react-hooks';
import { pluralize } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { LiveMessage } from 'react-aria-live';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { useSearchUIContext } from '../ContextProvider';
import { SummaryProps } from './types';

const Summary = (props: SummaryProps) => {
  const { latency, totalResults, search, queryValues, searched } = useSearchContext();
  const { disableDefaultStyles, language } = useSearchUIContext();
  const { suggest = false, showLatency = false, ...rest } = props;
  const query = queryValues?.get('q') ?? '';
  const { completion } = useAutocomplete();
  const { t } = useTranslation(['common', 'summary']);

  if (!searched) {
    return null;
  }

  return (
    <React.Fragment>
      <LiveMessage
        message={
          query === ''
            ? t('summary:noQueryResults', {
                count: totalResults,
                object: pluralize(totalResults, t('common:item'), t('common:items')),
              })
            : t('summary:results', {
                count: totalResults,
                object: pluralize(totalResults, t('common:result'), t('common:results')),
                query,
              })
        }
        aria-live="polite"
      />

      <Text {...rest} disableDefaultStyles={disableDefaultStyles}>
        <Box
          as="span"
          dangerouslySetInnerHTML={{
            __html:
              query === ''
                ? t('summary:noQueryResults', {
                    count: totalResults.toLocaleString(language),
                    object: pluralize(totalResults, t('common:item'), t('common:items')).toLowerCase(),
                  } as Record<string, string>)
                : t('summary:results', {
                    count: totalResults.toLocaleString(language),
                    object: pluralize(totalResults, t('common:result'), t('common:results')).toLowerCase(),
                    query: `<strong>${query}</strong>`,
                  } as Record<string, string>),
          }}
        />
        {showLatency ? ` ${t('summary:latency', { time: latency })}` : ''}
        {completion && completion !== query.trim() && suggest ? (
          <React.Fragment>
            {`. ${t('summary:alternative')} `}
            <Button
              onClick={() => search(completion)}
              spacing="none"
              appearance="link"
              disableDefaultStyles={disableDefaultStyles}
              css={tw`m-0`}
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
