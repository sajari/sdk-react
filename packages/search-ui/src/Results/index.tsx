/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSearchContext } from '@sajari/react-hooks';
import React from 'react';

import Result from './Result';
import useResultsStyles from './styles';
import { ResultsProps, ResultValues } from './types';

const Results = (props: ResultsProps) => {
  const { results } = useSearchContext<ResultValues>();
  const styles = useResultsStyles(props);
  const { appearance = 'list' } = props;

  return (
    <div css={[styles.container]}>
      {results?.map(({ values: { category, description, image, _id, price, rating, title, url } }) => (
        <Result
          key={_id}
          title={title}
          url={url}
          category={category.toString()}
          description={description}
          image={image}
          price={price.toString()}
          rating={Number(rating)}
          appearance={appearance}
          css={styles.item}
        />
      ))}
    </div>
  );
};

export default Results;
export type { ResultsProps };
