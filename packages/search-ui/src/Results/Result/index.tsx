/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Image, Rating, Text } from '@sajari/react-components';
import React from 'react';
import { __DEV__ } from 'sajari-react-sdk-utils';
import tw, { styled } from 'twin.macro';

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
      <a href={url} target="_blank" rel="noreferrer noopener" css={styles.imageContiner}>
        <Image src={image} css={styles.image} aspectRatio={imageAspectRatio} objectFit={imageObjectFit} />
      </a>

      <div css={tw`flex-1 min-w-0`}>
        <Heading as="h1">
          <a href={url} target="_blank" rel="noreferrer noopener">
            {title}
          </a>
        </Heading>

        <div>{price}</div>

        <div css={tw`flex items-baseline mt-1`}>
          {category && appearance === 'list' && <Text css={tw`mr-3 text-xs text-gray-400`}>{category}</Text>}
          {rating && <Rating value={rating} max={ratingMax} />}
        </div>

        {description && appearance === 'list' && (
          <Text truncate={2} css={tw`mt-1 text-sm text-gray-500`}>
            {description}
          </Text>
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
