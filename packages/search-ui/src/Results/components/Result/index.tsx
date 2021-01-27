/* eslint-disable react/jsx-no-target-blank */
import { Box, Heading, Image, ImageProps, Link, Rating, Text } from '@sajari/react-components';
import {
  __DEV__,
  decodeHTML,
  formatPrice,
  getStylesObject,
  isArray,
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
      originalPriceClassName,
      subTitleClassName,
      ratingClassName,
      descriptionClassName,
      disableDefaultStyles = false,
      styles: stylesProp,
      ...rest
    } = props;
    const { currency, language, ratingMax } = useSearchUIContext();
    const { title, description, subtitle, image, url, price, originalPrice } = values;
    const rating = Number(values.rating);
    const isOnSale = React.useMemo(() => {
      if (!price || !originalPrice) {
        return false;
      }

      const parsePrices = (input: string | Array<string>) => (isArray(input) ? input : [input]).map(Number);
      const prices = parsePrices(price);
      const originalPrices = parsePrices(originalPrice);

      if (originalPrices.length >= prices.length) {
        return prices.some((p, index) => isNumber(p) && isNumber(originalPrices[index]) && p < originalPrices[index]);
      }

      if (originalPrices.length === 1 && prices.length > 1) {
        const [original] = originalPrices;

        if (!isNumber(original)) {
          return false;
        }

        return prices.some((p) => isNumber(p) && p < original);
      }

      return false;
    }, [JSON.stringify(price), JSON.stringify(originalPrice)]);

    const styles = getStylesObject(useResultStyles({ ...props, appearance, isOnSale }), disableDefaultStyles);
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

    const imageSrc = isArray(image) ? image[0] : image;
    const imageHoverSrc = isArray(image) ? image[1] : undefined;

    const renderTitle = () => (
      <Heading as="h1" size="base" css={styles.title} className={headingClassName}>
        <Link href={clickToken || url} target="_blank" onClick={resultClicked}>
          {decodeHTML(title)}
        </Link>
      </Heading>
    );

    const renderSubtitle = () => {
      if (!subtitle) return null;

      if (isValidURL(subtitle)) {
        return (
          <Link
            href={clickToken || url}
            target="_blank"
            onClick={resultClicked}
            css={styles.subtitle}
            disableDefaultStyles={disableDefaultStyles}
            className={subTitleClassName}
          >
            {subtitle}
          </Link>
        );
      }

      return (
        <Text css={styles.subtitle} disableDefaultStyles={disableDefaultStyles} className={subTitleClassName}>
          {subtitle}
        </Text>
      );
    };

    const renderPrice = () => {
      if (!price) return null;

      return (
        <Box css={styles.priceContainer}>
          <Text css={styles.price} className={priceClassName} disableDefaultStyles={disableDefaultStyles}>
            {formatPrice(price, { currency, language })}
          </Text>

          {originalPrice && isOnSale && (
            <Text
              css={styles.originalPrice}
              className={originalPriceClassName}
              disableDefaultStyles={disableDefaultStyles}
            >
              {formatPrice(originalPrice, { currency, language })}
            </Text>
          )}
        </Box>
      );
    };

    return (
      <Box as="article" {...rest} css={[styles.container, stylesProp]}>
        {(isValidURL(imageSrc, true) || forceImage) && (
          <Link
            href={clickToken || url}
            target="_blank"
            onClick={resultClicked}
            css={styles.imageContainer}
            disableDefaultStyles={disableDefaultStyles}
          >
            <Image
              src={imageSrc}
              hoverSrc={imageHoverSrc}
              css={styles.image}
              aspectRatio={imageAspectRatio}
              objectFit={imageObjectFit}
              disableDefaultStyles={disableDefaultStyles}
            />
          </Link>
        )}

        <Box css={styles.content}>
          {appearance === 'list' && (
            <Box css={styles.header}>
              <Box>
                {renderTitle()}
                {renderSubtitle()}
              </Box>

              <Box>{renderPrice()}</Box>
            </Box>
          )}

          {appearance === 'grid' && (
            <>
              {renderTitle()}
              {renderSubtitle()}
            </>
          )}

          {isNumber(rating) && (
            <Rating
              value={rating}
              max={ratingMax}
              className={ratingClassName}
              disableDefaultStyles={disableDefaultStyles}
            />
          )}

          {appearance === 'list' && description && (
            <Text truncate={2} css={styles.description} className={descriptionClassName}>
              {decodeHTML(description)}
            </Text>
          )}

          {appearance === 'grid' && renderPrice()}
        </Box>
      </Box>
    );
  },
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
);

export default Result;
export type { ResultProps };
