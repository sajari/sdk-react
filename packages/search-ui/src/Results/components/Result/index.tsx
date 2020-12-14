/* eslint-disable react/jsx-no-target-blank */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Heading, Image, ImageProps, Link, Rating, Text } from '@sajari/react-components';
import {
  __DEV__,
  decodeHTML,
  formatPrice,
  getStylesObject,
  isNumber,
  isString,
  isValidURL,
} from '@sajari/react-sdk-utils';
import React, { useMemo } from 'react';

import { useSearchUIContext } from '../../../ContextProvider';
import useResultStyles from './styles';
import { ResultProps } from './types';

const Result = React.memo(
  (props: ResultProps) => {
    const {
      appearance = 'list',
      imageAspectRatio: imageAspectRatioProp = 1,
      imageObjectFit: imageObjectFitProp = 'contain',
      values,
      token,
      onClick = () => {},
      forceImage,
      headingClassName,
      priceClassName,
      subTitleClassName,
      ratingClassName,
      descriptionClassName,
      disableDefaultStyles = false,
      styles: stylesProp,
      ...rest
    } = props;
    const { currencyCode, ratingMax } = useSearchUIContext();
    const { title, description, subtitle, image, url, price } = values;
    const rating = Number(values.rating);
    const styles = getStylesObject(useResultStyles({ ...props, appearance }), disableDefaultStyles);
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
      <Box as="article" {...rest} css={[styles.container, stylesProp]}>
        {(isValidURL(image, true) || forceImage) && (
          <Link
            href={clickToken || url}
            target="_blank"
            onClick={resultClicked}
            css={styles.imageContainer}
            disableDefaultStyles={disableDefaultStyles}
          >
            <Image
              src={image}
              css={styles.image}
              aspectRatio={imageAspectRatio}
              objectFit={imageObjectFit}
              disableDefaultStyles={disableDefaultStyles}
            />
          </Link>
        )}

        <Box css={styles.content}>
          <Box css={styles.head}>
            <Heading as="h1" size="base" css={styles.title} className={headingClassName}>
              <Link href={clickToken || url} target="_blank" onClick={resultClicked}>
                {decodeHTML(title)}
              </Link>
            </Heading>

            {price && appearance === 'list' && (
              <Box css={styles.listPrice} className={priceClassName}>
                <Text>{formatPrice(price, currencyCode)}</Text>
              </Box>
            )}
          </Box>

          {(subtitle || isNumber(rating)) && appearance === 'list' && (
            <Box css={styles.listRating} className={subTitleClassName}>
              {subtitle &&
                (isValidURL(subtitle) ? (
                  <Link
                    href={clickToken || url}
                    target="_blank"
                    onClick={resultClicked}
                    css={styles.listLinkSubtitle}
                    disableDefaultStyles={disableDefaultStyles}
                  >
                    {subtitle}
                  </Link>
                ) : (
                  <Text css={styles.listSubtitle} disableDefaultStyles={disableDefaultStyles}>
                    {subtitle}
                  </Text>
                ))}
              {isNumber(rating) && (
                <Rating
                  value={rating}
                  max={ratingMax}
                  className={ratingClassName}
                  disableDefaultStyles={disableDefaultStyles}
                />
              )}
            </Box>
          )}

          {description && appearance === 'list' && (
            <Text truncate={2} css={styles.listDesc} className={descriptionClassName}>
              {decodeHTML(description)}
            </Text>
          )}

          {(price || isNumber(rating)) && appearance === 'grid' && (
            <Box css={styles.gridRating}>
              {isNumber(rating) && (
                <Rating
                  value={rating}
                  max={ratingMax}
                  className={ratingClassName}
                  disableDefaultStyles={disableDefaultStyles}
                />
              )}
              {price && (
                <Text css={styles.gridPrice} className={priceClassName} disableDefaultStyles={disableDefaultStyles}>
                  {formatPrice(price, currencyCode)}
                </Text>
              )}
            </Box>
          )}
        </Box>
      </Box>
    );
  },
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
);

if (__DEV__) {
  Result.displayName = 'Result';
}

export default Result;
export type { ResultProps };
