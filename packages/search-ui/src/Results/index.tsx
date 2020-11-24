/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ResizeObserver } from '@sajari/react-components';
import { useSearchContext } from '@sajari/react-hooks';
import { isEmpty, useDebounce } from '@sajari/react-sdk-utils';
import { useState } from 'react';

import Result from './components/Result';
import useResultsStyles from './styles';
import { ResultsProps, ResultValues } from './types';

const Results = (props: ResultsProps) => {
  const { appearance = 'list', className, ...rest } = props;
  const { results } = useSearchContext<ResultValues>();
  const [width, setWidth] = useState(0);
  const styles = useResultsStyles({ ...props, width });
  const setDebounced = useDebounce(setWidth, 50);

  // TODO: No results view
  if (isEmpty(results)) {
    return null;
  }

  return (
    <ResizeObserver onResize={(rect) => setDebounced(rect.width)} css={[styles.container]} className={className}>
      {results?.map(({ values, token }, i) => (
        <Result
          token={token}
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
