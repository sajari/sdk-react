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
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../../../ContextProvider';
import { useClickTracking } from '../../../hooks';
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
      forceImage,
      headingClassName,
      priceClassName,
      originalPriceClassName,
      subTitleClassName,
      ratingClassName,
      descriptionClassName,
      disableDefaultStyles = false,
      onClick: onClickProp,
      styles: stylesProp,
      showImage: showImageProp = true,
      ...rest
    } = props;
    const { t } = useTranslation('result');
    const { currency, language, ratingMax, tracking } = useSearchUIContext();
    const { href, onClick } = useClickTracking({ token, tracking, values, onClick: onClickProp });
    const { title, description, subtitle, image, price, originalPrice } = values;
    const [imageSrc, setImageSrc] = useState(isArray(image) ? image[0] : image);
    const rating = Number(values.rating);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    // Determine if the result is on sale
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

    const imageAspectRatio: ImageProps['aspectRatio'] = useMemo(() => {
      const aspectRatio = imageAspectRatioProp;

      if (isNumber(aspectRatio) || aspectRatio === null) {
        return aspectRatio;
      }

      return aspectRatio[appearance];
    }, [appearance, imageAspectRatioProp]);

    const imageObjectFit: ImageProps['objectFit'] = useMemo(() => {
      const objectFit = imageObjectFitProp;

      if (isString(objectFit) || objectFit === null) {
        return objectFit;
      }

      return objectFit[appearance];
    }, [appearance, imageObjectFitProp]);

    const renderTitle = () => (
      <Heading as="h3" size="base" css={styles.title} className={headingClassName}>
        <Link href={href} onClick={onClick}>
          {decodeHTML(title)}
        </Link>
      </Heading>
    );

    const renderSubtitle = () => {
      if (!subtitle) return null;

      if (isValidURL(subtitle)) {
        return (
          <Link
            href={href}
            onClick={onClick}
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
      const priceDisplay = isArray(price) ? price[activeImageIndex] ?? price : price ?? '';
      return (
        <Box css={styles.priceContainer}>
          <Text css={styles.price} className={priceClassName} disableDefaultStyles={disableDefaultStyles}>
            {formatPrice(priceDisplay, { currency, language })}
          </Text>

          {originalPrice && isOnSale && (
            <Text
              css={styles.originalPrice}
              className={originalPriceClassName}
              disableDefaultStyles={disableDefaultStyles}
            >
              {formatPrice(
                isArray(originalPrice)
                  ? originalPrice
                      .map(Number)
                      .filter((p) => isNumber(p) && p !== 0)
                      .map(String)
                  : originalPrice,
                {
                  currency,
                  language,
                },
              )}
            </Text>
          )}
        </Box>
      );
    };

    const renderPreviewImages = () => {
      const getSetActive = useCallback(
        (url: string, i: number) => () => {
          setImageSrc(url);
          setActiveImageIndex(i);
        },
        [],
      );
      return (
        <Box
          css={styles.previewImagesContainer}
          aria-label={t('previewImagesContainer', { product: decodeHTML(title) })}
        >
          {image &&
            isArray(image) &&
            image.map((url, i) => {
              const setActive = getSetActive(url, i);
              return (
                <Box
                  role="img"
                  key={`product-image-${url}`}
                  css={styles.previewImageContainer}
                  aria-label={t('previewImage', { product: decodeHTML(title), number: i + 1 })}
                  onMouseEnter={setActive}
                  tabIndex={0}
                  onKeyPress={(e) => {
                    e.preventDefault();
                    if (e.key === 'Enter' || e.key.trim() === '') {
                      setActive();
                    }
                  }}
                >
                  <Image src={url} aspectRatio={1} objectFit="cover" objectPosition="top" />
                </Box>
              );
            })}
        </Box>
      );
    };

    const showImage = showImageProp && (isValidURL(imageSrc, true) || forceImage);

    return (
      <Box as="article" {...rest} css={[styles.container, stylesProp]}>
        {showImage && (
          <Box css={styles.wrapper}>
            <Link
              href={href}
              onClick={onClick}
              onContextMenu={onClick}
              css={styles.imageContainer}
              disableDefaultStyles={disableDefaultStyles}
            >
              <Image
                src={imageSrc}
                aspectRatio={imageAspectRatio}
                objectFit={imageObjectFit}
                disableDefaultStyles={disableDefaultStyles}
              />
            </Link>
            {isArray(image) && image.length > 1 && appearance === 'grid' ? renderPreviewImages() : null}
          </Box>
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
            <Box css={styles.wrapper}>
              {isArray(image) && image.length > 1 ? renderPreviewImages() : null}
              <Text truncate={2} css={styles.description} className={descriptionClassName}>
                {decodeHTML(description)}
              </Text>
            </Box>
          )}

          {appearance === 'grid' && renderPrice()}
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
