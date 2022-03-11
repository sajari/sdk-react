/* eslint-disable react/jsx-no-target-blank */
import { Box, Heading, Image, ImageProps, Link, Rating, Text } from '@sajari/react-components';
import {
  __DEV__,
  decodeHTML,
  getStylesObject,
  isArray,
  isEmpty,
  isNumber,
  isString,
  isValidURL,
} from '@sajari/react-sdk-utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../../../ContextProvider';
import { useProductStatus } from '../../useProductStatus';
import { useRenderPrice } from '../../useRenderPrice';
import useResultStyles from './styles';
import { ResultProps } from './types';

dayjs.extend(utc);

const Result = React.memo(
  (props: ResultProps) => {
    const {
      appearance = 'list',
      imageAspectRatio: imageAspectRatioProp = 1,
      imageObjectFit: imageObjectFitProp = 'contain',
      result: { values, token },
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
      styles: stylesProp,
      showImage: showImageProp = true,
      showVariantImage = false,
      showStatus: showStatusProp = false,
      openNewTab = false,
      isPinned,
      ...rest
    } = props;
    const { t } = useTranslation('result');
    const { currency, language, ratingMax, tracking } = useSearchUIContext();
    const href = tracking.getResultHref(values, token);
    const onClick = () => tracking.onResultClick(values, token);
    const mouseDownHandler = (e: React.MouseEvent<HTMLElement>) => {
      if (e.button === 1) {
        onClick();
      }
    };
    const { title, description, subtitle, image: imageProp } = values;
    const image = imageProp && isArray(imageProp[0]) ? imageProp.slice(1) : imageProp;
    const [imageSrc, setImageSrc] = useState(isArray(image) ? image[0] : image);
    const [hoverImageSrc] = useState(isArray(image) && !showVariantImage ? image[1] : undefined);
    const rating = Number(values.rating);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const newTabProps = openNewTab ? { target: '_blank', rel: 'noopener' } : {};
    const { onSale, outOfStock, newArrival, onSaleText, newArrivalText, outOfStockText } = useProductStatus({
      activeImageIndex,
      values,
    });
    const productPrice = useRenderPrice({ values, onSale, currency, language, activeImageIndex });

    const styles = getStylesObject(
      useResultStyles({ ...props, appearance, onSale, newArrival, outOfStock }),
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
        <Link
          href={href}
          onClick={onClick}
          onContextMenu={onClick}
          onMouseDown={mouseDownHandler}
          css={styles.link}
          {...newTabProps}
        >
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
            onContextMenu={onClick}
            onMouseDown={mouseDownHandler}
            css={styles.subtitle}
            disableDefaultStyles={disableDefaultStyles}
            className={subTitleClassName}
            {...newTabProps}
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
      return (
        <Box css={styles.priceContainer}>
          <Text css={styles.price} className={priceClassName} disableDefaultStyles={disableDefaultStyles}>
            {productPrice?.displayPrice}
          </Text>

          {productPrice?.originalPrice && (
            <Text
              css={styles.originalPrice}
              className={originalPriceClassName}
              disableDefaultStyles={disableDefaultStyles}
            >
              {productPrice.originalPrice}
            </Text>
          )}
        </Box>
      );
    };

    const showStatus = showStatusProp && (outOfStock || onSale || newArrival);
    const renderStatus = () => {
      if (!showStatus) return null;
      let text = '';
      let css = styles.status;
      let className: string | undefined;
      switch (true) {
        case outOfStock:
          if (!isEmpty(outOfStockStatusClassName)) {
            className = outOfStockStatusClassName;
            css = undefined;
          }
          text = outOfStockText;
          break;
        case newArrival:
          if (!isEmpty(newArrivalStatusClassName)) {
            className = newArrivalStatusClassName;
            css = undefined;
          }
          text = newArrivalText;
          break;
        case onSale:
          if (!isEmpty(onSaleStatusClassName)) {
            className = onSaleStatusClassName;
            css = undefined;
          }
          text = onSaleText;
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

    return (
      <Box as="article" {...rest} css={[styles.container, stylesProp]} data-pinned={isPinned}>
        {showImage && (
          <Box css={styles.wrapper}>
            <Link
              href={href}
              onClick={onClick}
              onContextMenu={onClick}
              onMouseDown={mouseDownHandler}
              css={styles.imageContainer}
              disableDefaultStyles={disableDefaultStyles}
              {...newTabProps}
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
