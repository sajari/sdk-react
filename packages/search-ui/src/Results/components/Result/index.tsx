/* eslint-disable react/jsx-no-target-blank */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Heading, Image, ImageProps, Link, Rating, Text } from '@sajari/react-components';
import { __DEV__, decodeHTML, formatPrice, isNumber, isString, isValidURL } from '@sajari/react-sdk-utils';
import React, { useMemo } from 'react';
import tw from 'twin.macro';

import useResultStyles from './styles';
import { ResultProps } from './types';

const Result = React.memo(
  (props: ResultProps) => {
    const {
      appearance = 'list',
      ratingMax = 5,
      imageAspectRatio: imageAspectRatioProp = 1,
      imageObjectFit: imageObjectFitProp = 'contain',
      currencyCode = 'USD',
      values,
      token,
      onClick = () => {},
      forceImage,
      ...rest
    } = props;
    const { title, description, subtitle, image, url, price } = values;
    const rating = Number(values.rating);
    const styles = useResultStyles({ ...props, appearance });
    let clickToken: string | undefined;
    if (token && 'click' in token) {
      clickToken = token.click;
    }

    const resultClicked = React.useCallback(() => {
      if (url) {
        onClick(url);
      }
    }, [url]);

    const imageAspectRatio: ImageProps['aspectRatio'] = useMemo(() => {
      const aspectRatio = imageAspectRatioProp;

      if (isNumber(aspectRatio) || aspectRatio === null) {
        return aspectRatio;
      }

      return aspectRatio[appearance];
    }, [appearance]);

    const imageObjectFit: ImageProps['objectFit'] = useMemo(() => {
      const objectFit = imageObjectFitProp;

      if (isString(objectFit) || objectFit === null) {
        return objectFit;
      }

      return objectFit[appearance];
    }, [appearance]);

    return (
      <article {...rest} css={styles.container}>
        {(isValidURL(image, true) || forceImage) && (
          <Link href={clickToken || url} target="_blank" onClick={resultClicked} css={styles.imageContainer}>
            <Image src={image} css={styles.image} aspectRatio={imageAspectRatio} objectFit={imageObjectFit} />
          </Link>
        )}

        <div css={tw`flex-1 min-w-0`}>
          <div css={tw`flex items-start`}>
            <Heading as="h1" size="base" css={[tw`flex-1 font-medium`]}>
              <Link href={clickToken || url} target="_blank" onClick={resultClicked}>
                {decodeHTML(title)}
              </Link>
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
                  <Link
                    href={clickToken || url}
                    target="_blank"
                    onClick={resultClicked}
                    css={tw`mr-3 text-xs text-gray-400`}
                  >
                    {subtitle}
                  </Link>
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
              {price && <Text css={tw`text-gray-500`}>{formatPrice(price, currencyCode)}</Text>}
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
