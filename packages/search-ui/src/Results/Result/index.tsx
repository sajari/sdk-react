/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Image, Rating, Text } from '@sajari/react-components';
import { useTracking } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';
import tw, { styled } from 'twin.macro';

import { isValidURL } from '../../utils/assertion';
import { formatNumber } from '../../utils/number';
import { decodeHTML } from '../../utils/string';
import useResultStyles from './styles';
import { ResultProps } from './types';

const Heading = styled(Text)`
  ${tw`font-medium text-gray-900`}
`;

const Result = React.memo(
  (props: ResultProps) => {
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
      token,
      ...rest
    } = props;
    const styles = useResultStyles({ ...props, appearance });
    const { handleResultClicked } = useTracking();
    let clickToken;
    if (token && 'click' in token) {
      clickToken = token.click;
    }

    const resultClicked = React.useCallback(() => {
      if (url) {
        handleResultClicked(url);
      }
    }, []);

    return (
      <article {...rest} css={styles.container}>
        {isValidURL(image, true) && (
          <a
            href={clickToken || url}
            target="_blank"
            rel="noreferrer"
            onClick={resultClicked}
            css={styles.imageContiner}
          >
            <Image src={image} css={styles.image} aspectRatio={imageAspectRatio} objectFit={imageObjectFit} />
          </a>
        )}

        <div css={tw`flex-1 min-w-0`}>
          <div css={tw`flex items-start`}>
            <Heading as="h1" css={tw`flex-1`}>
              <a href={clickToken || url} target="_blank" rel="noreferrer" onClick={resultClicked}>
                {decodeHTML(title)}
              </a>
            </Heading>

            {price && appearance === 'list' && (
              <div css={tw`ml-6`}>
                <Text>{formatNumber(Number(price), 'USD')}</Text>
              </div>
            )}
          </div>

          {(category || typeof rating === 'number') && appearance === 'list' && (
            <div css={tw`flex items-baseline mt-1`}>
              {category && <Text css={tw`mr-3 text-xs text-gray-400`}>{category}</Text>}
              {typeof rating === 'number' && <Rating value={rating} max={ratingMax} />}
            </div>
          )}

          {description && appearance === 'list' && (
            <Text truncate={2} css={tw`mt-1 text-sm text-gray-500`}>
              {decodeHTML(description)}
            </Text>
          )}

          {(price || typeof rating === 'number') && appearance === 'grid' && (
            <div css={tw`mt-1 space-y-1 text-center`}>
              {typeof rating === 'number' && <Rating value={rating} max={ratingMax} />}
              {price && <Text>{formatNumber(Number(price), 'USD')}</Text>}
            </div>
          )}
        </div>
      </article>
    );
  },
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
);

if (__DEV__) {
  Result.displayName = 'Result';
}

export default Result;
export type { ResultProps };
