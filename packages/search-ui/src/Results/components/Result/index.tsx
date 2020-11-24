/* eslint-disable react/jsx-no-target-blank */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Heading, Image, Rating, Text } from '@sajari/react-components';
import { useTracking } from '@sajari/react-hooks';
import { __DEV__, decodeHTML, formatPrice, isNumber, isValidURL } from '@sajari/react-sdk-utils';
import React from 'react';
import tw from 'twin.macro';

import useResultStyles from './styles';
import { ResultProps } from './types';

const Result = React.memo(
  (props: ResultProps) => {
    const {
      appearance = 'list',
      ratingMax = 5,
      imageAspectRatio = 1,
      imageObjectFit = 'contain',
      currencyCode = 'USD',
      values,
      token,
      ...rest
    } = props;
    const { title, description, subtitle, image, url, price } = values;
    const rating = Number(values.rating);
    const styles = useResultStyles({ ...props, appearance });
    const { handleResultClicked } = useTracking();
    let clickToken: string | undefined;
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
          <a href={clickToken || url} target="_blank" onClick={resultClicked} css={styles.imageContainer}>
            <Image src={image} css={styles.image} aspectRatio={imageAspectRatio} objectFit={imageObjectFit} />
          </a>
        )}

        <div css={tw`flex-1 min-w-0`}>
          <div css={tw`flex items-start`}>
            <Heading as="h1" size="base" css={tw`flex-1 font-medium`}>
              <a href={clickToken || url} target="_blank" onClick={resultClicked}>
                {decodeHTML(title)}
              </a>
            </Heading>

            {price && appearance === 'list' && (
              <div css={tw`ml-6`}>
                <Text>{formatPrice(price, currencyCode)}</Text>
              </div>
            )}
          </div>

          {(subtitle || isNumber(rating)) && appearance === 'list' && (
            <div css={tw`flex items-baseline mt-1`}>
              {subtitle &&
                (isValidURL(subtitle) ? (
                  <a
                    href={clickToken || url}
                    target="_blank"
                    onClick={resultClicked}
                    css={tw`mr-3 text-xs text-gray-400`}
                  >
                    {subtitle}
                  </a>
                ) : (
                  <Text css={tw`mr-3 text-xs text-gray-400`}>{subtitle}</Text>
                ))}
              {isNumber(rating) && <Rating value={rating} max={ratingMax} />}
            </div>
          )}

          {description && appearance === 'list' && (
            <Text truncate={2} css={tw`mt-1 text-sm text-gray-500`}>
              {decodeHTML(description)}
            </Text>
          )}

          {(price || isNumber(rating)) && appearance === 'grid' && (
            <div css={tw`mt-1 space-y-1 text-center`}>
              {isNumber(rating) && <Rating value={rating} max={ratingMax} />}
              {price && <Text>{formatPrice(price, currencyCode)}</Text>}
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
