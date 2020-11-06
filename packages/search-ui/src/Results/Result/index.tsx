/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Image, Rating, Text } from '@sajari/react-components';
import React from 'react';
import { __DEV__ } from 'sajari-react-sdk-utils';
import tw, { styled } from 'twin.macro';

import { formatNumber } from '../../utils/number';
import useResultStyles from './styles';
import { ResultProps } from './types';

const Heading = styled(Text)`
  ${tw`font-medium text-gray-900`}
`;

const Result = React.forwardRef((props: ResultProps, ref?: React.Ref<HTMLDivElement>) => {
  const {
    appearance = 'list',
    title,
    description,
    rating,
    category,
    image,
    url,
    price,
    ratingMax = 5,
    imageAspectRatio = 1,
    imageObjectFit = 'contain',
    ...rest
  } = props;
  const styles = useResultStyles({ ...props, appearance });

  return (
    <article {...rest} ref={ref} css={styles.container}>
      {image && (
        <a href={url} target="_blank" rel="noreferrer noopener" css={styles.imageContiner}>
          <Image src={image} css={styles.image} aspectRatio={imageAspectRatio} objectFit={imageObjectFit} />
        </a>
      )}

      <div css={tw`flex-1 min-w-0`}>
        <div css={tw`flex items-start`}>
          <Heading as="h1" css={tw`flex-1`}>
            <a href={url} target="_blank" rel="noreferrer noopener">
              {title}
            </a>
          </Heading>

          {price && appearance === 'list' && (
            <div css={tw`ml-6`}>
              <Text>{formatNumber(Number(price), 'USD')}</Text>
            </div>
          )}
        </div>

        {(category || rating) && appearance === 'list' && (
          <div css={tw`flex items-baseline mt-1`}>
            {category && <Text css={tw`mr-3 text-xs text-gray-400`}>{category}</Text>}
            {rating && <Rating value={rating} max={ratingMax} />}
          </div>
        )}

        {description && appearance === 'list' && (
          <Text truncate={2} css={tw`mt-1 text-sm text-gray-500`}>
            {description}
          </Text>
        )}

        {(price || rating) && appearance === 'grid' && (
          <div css={tw`mt-1 space-y-1 text-center`}>
            {rating && <Rating value={rating} max={ratingMax} />}
            {price && <Text>{formatNumber(Number(price), 'USD')}</Text>}
          </div>
        )}
      </div>
    </article>
  );
});

if (__DEV__) {
  Result.displayName = 'Result';
}

export default Result;
export type { ResultProps };
