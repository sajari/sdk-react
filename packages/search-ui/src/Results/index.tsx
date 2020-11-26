/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Heading, ResizeObserver, Spinner, Text } from '@sajari/react-components';
import { useQuery, useSearchContext, useTracking } from '@sajari/react-hooks';
import { isEmpty, isNullOrUndefined } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useState } from 'react';
import tw from 'twin.macro';

import { useSearchUIContext } from '../ContextProvider';
import Result from './components/Result';
import useResultsStyles from './styles';
import { ResultsProps, ResultValues } from './types';

const Results = (props: ResultsProps) => {
  const { results, setViewType, viewType, searching } = useSearchContext<ResultValues>();
  const { query } = useQuery();
  const { defaultAppearance, appearance = viewType, className, ...rest } = props;
  const [width, setWidth] = useState(0);
  const styles = useResultsStyles({ ...props, appearance, width });
  const { handleResultClicked } = useTracking();
  const { ratingMax } = useSearchUIContext();

  React.useEffect(() => {
    if (defaultAppearance) {
      setViewType(defaultAppearance);
    }
  }, []);

  // We've not searched yet
  if (isNullOrUndefined(results)) {
    return null;
  }

  // There's genuinely no results
  // Show a loader if we're refreshing from no results
  if (isEmpty(results)) {
    return (
      <Box css={tw`w-full p-40 text-center`}>
        {searching ? (
          <Box css={tw`text-gray-500`}>
            <Spinner css={tw`inline-block w-6 h-6`} />
            <Text css={tw`mt-3`}>Loading...</Text>
          </Box>
        ) : (
          <React.Fragment>
            <Heading>No results</Heading>
            <Text css={tw`text-gray-500`}>
              {'No matches were found for '}
              <Text as="strong" css={tw`font-medium`}>
                {`"${query}"`}
              </Text>
              .
            </Text>
          </React.Fragment>
        )}
      </Box>
    );
  }

  return (
    <ResizeObserver onResize={(rect) => setWidth(rect.width)} css={[styles.container]} className={className}>
      {results?.map(({ values, token }, i) => (
        <Result
          handleResultClicked={handleResultClicked}
          token={token}
          ratingMax={ratingMax}
          // eslint-disable-next-line no-underscore-dangle
          key={values._id ?? i}
          values={values}
          appearance={appearance}
          {...rest}
        />
      ))}
    </ResizeObserver>
  );
};

export default Results;
export type { ResultsProps };
