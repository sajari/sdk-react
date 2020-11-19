/* eslint-disable react/jsx-one-expression-per-line */
import { Button, Text } from '@sajari/react-components';
import { useAutocomplete, useSearchContext } from '@sajari/react-hooks';
import React from 'react';

import { SummaryProps } from './types';

const Summary = (props: SummaryProps) => {
  const { latency, totalResults, search, queryValues } = useSearchContext();
  const { showOverride = true, ...rest } = props;
  const query = queryValues?.get('q') ?? '';
  const { completion } = useAutocomplete();

  return (
    <Text {...rest}>
      {totalResults.toLocaleString()} result{totalResults > 1 ? 's' : ''}{' '}
      {query ? (
        <>
          for &quot;<strong>{query}</strong>&quot;
        </>
      ) : null}{' '}
      ({latency} secs)
      {completion && completion !== query.trim() && showOverride ? (
        <React.Fragment>
          . Search instead for{' '}
          <Button onClick={() => search(completion)} spacing="none" appearance="link">
            {completion}
          </Button>
        </React.Fragment>
      ) : null}
    </Text>
  );
};

export default Summary;
