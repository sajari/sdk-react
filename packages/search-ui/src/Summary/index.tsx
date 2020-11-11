/* eslint-disable react/jsx-one-expression-per-line */
import { Text } from '@sajari/react-components';
import { useSearchContext } from '@sajari/react-hooks';
import React, { HTMLAttributes } from 'react';

const Summary = (props: HTMLAttributes<HTMLElement>) => {
  const { latency, totalResults } = useSearchContext();

  if (!totalResults) {
    return null;
  }

  return (
    <Text {...props}>
      {totalResults.toLocaleString()} result{totalResults > 1 ? 's' : ''} ({latency} secs)
    </Text>
  );
};

export default Summary;
