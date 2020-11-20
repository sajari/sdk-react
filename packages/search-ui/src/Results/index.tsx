/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSearchContext } from '@sajari/react-hooks';

import Result from './components/Result';
import useResultsStyles from './styles';
import { ResultsProps, ResultValues } from './types';

const Results = (props: ResultsProps) => {
  const { results } = useSearchContext<ResultValues>();
  const styles = useResultsStyles(props);
  const { appearance = 'list', ...rest } = props;

  return (
    <div css={[styles.container]}>
      {results?.map(({ values: { category, description, image, _id, price, rating, title, url }, token }) => (
        <Result
          token={token}
          key={_id}
          title={title}
          url={url}
          category={category?.toString()}
          description={description}
          image={image}
          price={price}
          rating={Number(rating)}
          appearance={appearance}
          css={styles.item}
          {...rest}
        />
      ))}
    </div>
  );
};

export default Results;
export type { ResultsProps };
