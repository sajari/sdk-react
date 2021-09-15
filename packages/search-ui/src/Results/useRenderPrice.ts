import { formatPrice, isArray, isEmpty } from '@sajari/react-sdk-utils';

import type { ResultValues } from './types';

type Input = {
  activeImageIndex?: number;
  values: ResultValues;
  onSale: boolean;
  currency: string;
  language?: string;
};

export type UseRenderPriceOutput = {
  displayPrice: string;
  originalPrice?: string;
} | null;

export function useRenderPrice({
  values,
  activeImageIndex: activeImageIndexProp = 0,
  onSale,
  currency,
  language,
}: Input): UseRenderPriceOutput {
  const { price: priceProp, salePrice, originalPrice: originalPriceProp } = values;
  let price = priceProp;
  let activeImageIndex = activeImageIndexProp;

  if (isEmpty(price) || isEmpty(priceProp)) return null;

  const hasVariantImages = isArray(price[0]);

  if (hasVariantImages && activeImageIndexProp === 0)
    return { displayPrice: formatPrice(price[0], { currency, language }) };

  if (hasVariantImages) {
    activeImageIndex = activeImageIndexProp - 1;
    price = priceProp.slice(1);
  }
  const activePrice = isArray(price) ? price[activeImageIndex] ?? price : price;
  if (isEmpty(activePrice)) return null;
  let displayPrice: string;
  let originalPrice: string | undefined;

  if (originalPriceProp && onSale) {
    // show `originalPrice` with strikethrough
    const activeOriginalPrice = isArray(originalPriceProp)
      ? originalPriceProp[activeImageIndex] ?? originalPriceProp
      : originalPriceProp ?? '';
    displayPrice = formatPrice(activePrice, { currency, language });
    originalPrice = formatPrice(activeOriginalPrice, { currency, language });
  } else if (salePrice && onSale) {
    // show `price` with strikethrough
    const activeSalePrice = isArray(salePrice) ? salePrice[activeImageIndex] ?? salePrice : salePrice ?? '';
    if (activeSalePrice !== '0') {
      displayPrice = formatPrice(activeSalePrice, { currency, language });
      originalPrice = formatPrice(activePrice, { currency, language });
    } else {
      // Sajari engine coerces nullish doubles to 0. We need to check for '0' salePrice and
      // print the ordinary price instead to avoid showing the product on sale for free.
      displayPrice = formatPrice(activePrice, { currency, language });
    }
  } else {
    // Standard price, show `price` and with no sale styling.
    displayPrice = formatPrice(activePrice, { currency, language });
  }

  return {
    displayPrice,
    originalPrice,
  };
}
