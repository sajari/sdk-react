import { formatPrice, isArray, isEmpty } from '@sajari/react-sdk-utils';

import type { ResultValues } from './types';

type Input = {
  activeImageIndex?: number;
  values: ResultValues;
  isOnSale: boolean;
  currency: string;
  language?: string;
};

export type UseRenderPriceOutput = {
  priceToDisplay: string;
  markedDownFromPriceToDisplay?: string;
} | null;

export function useRenderPrice({
  values,
  activeImageIndex = 0,
  isOnSale,
  currency,
  language,
}: Input): UseRenderPriceOutput {
  const { price, salePrice, originalPrice } = values;
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

  return {
    priceToDisplay,
    markedDownFromPriceToDisplay,
  };
}
