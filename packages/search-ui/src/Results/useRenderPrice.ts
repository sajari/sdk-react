// TODO(tuand): rename this into something else (current name is confusing - this is not a hook)
import { formatPrice, isArray, isEmpty, isNullOrUndefined } from '@sajari/react-sdk-utils';

import type { ResultValues } from './types';

export type UseRenderPriceInput = {
  activeImageIndex?: number;
  values: ResultValues;
  onSale: boolean;
  currency: string;
  language?: string;
};

export type UseRenderPriceOutput = {
  displayPrice: string;
  originalPrice?: string;
};

const defaultReturnValue: UseRenderPriceOutput = {
  displayPrice: '',
};

export function useRenderPrice({
  values,
  activeImageIndex = 0,
  onSale,
  currency,
  language,
}: UseRenderPriceInput): UseRenderPriceOutput {
  const { price: priceProp, salePrice, originalPrice: originalPriceProp } = values;
  let price = priceProp;
  let dataOriginalPrice = originalPriceProp;

  if (isEmpty(price) || isEmpty(priceProp) || isEmpty(originalPriceProp)) {
    const nonEmptyPrice = [priceProp, originalPriceProp].find((p) => !isEmpty(p));

    // If everything is empty then just return empty string
    if (isNullOrUndefined(nonEmptyPrice)) {
      return defaultReturnValue;
    }

    return {
      displayPrice: formatPrice(nonEmptyPrice, { language, currency }),
    };
  }

  const hasVariantImages = isArray(price[0]);

  if (hasVariantImages) {
    price = priceProp.slice(1);
    dataOriginalPrice = originalPriceProp.slice(1);
  }
  const activePrice = isArray(price) ? price[activeImageIndex] ?? price : price;
  if (isEmpty(activePrice)) {
    return defaultReturnValue;
  }
  let displayPrice: string;
  let originalPrice: string | undefined;

  if (dataOriginalPrice && onSale) {
    // show `originalPrice` with strikethrough
    const activeOriginalPrice = isArray(dataOriginalPrice)
      ? dataOriginalPrice[activeImageIndex] ?? dataOriginalPrice
      : dataOriginalPrice ?? '';
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
