/* eslint-disable react/jsx-no-target-blank */
import { Box, Heading, Image, ImageProps, Link, Rating, Text } from '@sajari/react-components';
import {
  __DEV__,
  decodeHTML,
  formatPrice,
  getStylesObject,
  isArray,
  isEmpty,
  isEmptyObject,
  isNullOrUndefined,
  isNumber,
  isString,
  isValidURL,
} from '@sajari/react-sdk-utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../../../ContextProvider';
import { useClickTracking } from '../../../hooks';
import useResultStyles from './styles';
import { ResultProps } from './types';

dayjs.extend(utc);

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
      onSaleStatusClassName,
      outOfStockStatusClassName,
      newArrivalStatusClassName,
      disableDefaultStyles = false,
      onClick: onClickProp,
      styles: stylesProp,
      showImage: showImageProp = true,
      showVariantImage = false,
      showStatus: showStatusProp = false,
      template,
      ...rest
    } = props;
    const { t } = useTranslation('result');
    const { currency, language, ratingMax, tracking } = useSearchUIContext();
    const { href, onClick } = useClickTracking({ token, tracking, values, onClick: onClickProp });
    const { title, description, subtitle, image, price, originalPrice, salePrice, quantity, createdAt } = values;
    const [imageSrc, setImageSrc] = useState(isArray(image) ? image[0] : image);
    const [hoverImageSrc] = useState(isArray(image) && !showVariantImage ? image[1] : undefined);
    const rating = Number(values.rating);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    // Determine if the result is on sale
    const isOnSale = React.useMemo(() => {
      if (!price || (!originalPrice && !salePrice)) {
        return false;
      }

      const parsePrices = (input: string | Array<string>) => (isArray(input) ? input : [input]).map(Number);
      const prices = parsePrices(price);
      const originalPrices = !originalPrice ? false : parsePrices(originalPrice);
      const salePrices = !salePrice ? false : parsePrices(salePrice);

      if (originalPrices) {
        if (originalPrices.length >= prices.length) {
          return prices.some((p, index) => isNumber(p) && isNumber(originalPrices[index]) && p < originalPrices[index]);
        }
        if (originalPrices && originalPrices.length === 1 && prices.length > 1) {
          const [original] = originalPrices;
          return isNumber(original) && prices.some((p) => isNumber(p) && p < original);
        }
      }

      if (salePrices) {
        if (!salePrices.some((p) => p !== 0)) {
          return false;
        }
        if (salePrices.length >= prices.length) {
          return prices.some((p, index) => isNumber(p) && isNumber(salePrices[index]) && p > salePrices[index]);
        }
        if (salePrices && salePrices.length === 1 && prices.length > 1) {
          const [sale] = salePrices;
          return isNumber(sale) && prices.some((p) => isNumber(p) && p > sale);
        }
      }

      return false;
    }, []);

    const isOutOfStock = React.useMemo(() => {
      if (isEmpty(quantity)) {
        return false;
      }
      const parseQuantities = (input: string | Array<string>) => (isArray(input) ? input : [input]).map(Number);
      const quantities = parseQuantities(quantity);

      return quantities[activeImageIndex] === 0;
    }, [activeImageIndex]);

    const isNewArrival = React.useMemo(() => {
      if (!createdAt) {
        return false;
      }

      const parsedCreatedAt = dayjs(createdAt);
      const current = dayjs();

      return current.diff(parsedCreatedAt, 'day') > 30 && activeImageIndex === 0;
    }, [createdAt, activeImageIndex]);

    const styles = getStylesObject(
      useResultStyles({ ...props, appearance, isOnSale, isNewArrival, isOutOfStock }),
      disableDefaultStyles,
    );

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
      if (isEmpty(price)) return null;
      const activePrice = isArray(price) ? price[activeImageIndex] ?? price : price;
      if (isEmpty(activePrice)) return null;
      let priceToDisplay: string;
      let markedDownFromPriceToDisplay: string | undefined;

      if (originalPrice && isOnSale) {
        // show `originalPrice` with strikethrough
        const activeOriginalPrice = isArray(originalPrice)
          ? originalPrice[activeImageIndex] ?? originalPrice
          : originalPrice ?? '';
        priceToDisplay = formatPrice(activePrice, { currency, language });
        markedDownFromPriceToDisplay = formatPrice(activeOriginalPrice, { currency, language });
      } else if (salePrice && isOnSale) {
        // show `price` with strikethrough
        const activeSalePrice = isArray(salePrice) ? salePrice[activeImageIndex] ?? salePrice : salePrice ?? '';
        if (activeSalePrice !== '0') {
          priceToDisplay = formatPrice(activeSalePrice, { currency, language });
          markedDownFromPriceToDisplay = formatPrice(activePrice, { currency, language });
        } else {
          // Sajari engine coerces nullish doubles to 0. We need to check for '0' salePrice and
          // print the ordinary price instead to avoid showing the product on sale for free.
          priceToDisplay = formatPrice(activePrice, { currency, language });
        }
      } else {
        // Standard price, show `price` and with no sale styling.
        priceToDisplay = formatPrice(activePrice, { currency, language });
      }

      return (
        <Box css={styles.priceContainer}>
          <Text css={styles.price} className={priceClassName} disableDefaultStyles={disableDefaultStyles}>
            {priceToDisplay}
          </Text>

          {markedDownFromPriceToDisplay && (
            <Text
              css={styles.originalPrice}
              className={originalPriceClassName}
              disableDefaultStyles={disableDefaultStyles}
            >
              {markedDownFromPriceToDisplay}
            </Text>
          )}
        </Box>
      );
    };

    const showStatus = showStatusProp && (isOutOfStock || isOnSale || isNewArrival);
    const renderStatus = () => {
      if (!showStatus) return null;
      let text = '';
      let css = styles.status;
      let className: string | undefined;
      switch (true) {
        case isOutOfStock:
          if (!isEmpty(outOfStockStatusClassName)) {
            className = outOfStockStatusClassName;
            css = undefined;
          }
          text = t('status.outOfStock');
          break;
        case isNewArrival:
          if (!isEmpty(newArrivalStatusClassName)) {
            className = newArrivalStatusClassName;
            css = undefined;
          }
          text = t('status.newArrival');
          break;
        case isOnSale:
          if (!isEmpty(onSaleStatusClassName)) {
            className = onSaleStatusClassName;
            css = undefined;
          }
          text = t('status.onSale');
          break;
        default:
          break;
      }
      return (
        <Text className={className} css={css}>
          {text}
        </Text>
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
          {isArray(image) &&
            image.map((url, i) => {
              const setActive = getSetActive(url, i);
              return (
                <Box
                  role="img"
                  // eslint-disable-next-line react/no-array-index-key
                  key={`product-image-${url}-${i}`}
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

    if (!isNullOrUndefined(template) && !isEmptyObject(template)) {
      try {
        const handlebarTemplate = Handlebars.compile(template.html);
        const rendered = handlebarTemplate(values);
        return <div dangerouslySetInnerHTML={{ __html: rendered }} />;
      } catch (error) {
        return null;
      }
    }

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
                hoverSrc={hoverImageSrc}
                aspectRatio={imageAspectRatio}
                objectFit={imageObjectFit}
                disableDefaultStyles={disableDefaultStyles}
              />
            </Link>
            {isArray(image) && showVariantImage && appearance === 'grid' ? renderPreviewImages() : null}
          </Box>
        )}

        <Box css={styles.content}>
          {appearance === 'list' && (
            <Box css={styles.header}>
              <Box>
                {renderTitle()}
                {renderSubtitle()}
              </Box>

              <Box css={styles.statusWrapper}>
                {renderPrice()}
                {renderStatus()}
              </Box>
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
              {isArray(image) && showVariantImage ? renderPreviewImages() : null}
              <Text truncate={2} css={styles.description} className={descriptionClassName}>
                {decodeHTML(description)}
              </Text>
            </Box>
          )}

          {appearance === 'grid' && (
            <Box>
              {renderPrice()}
              {renderStatus()}
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
