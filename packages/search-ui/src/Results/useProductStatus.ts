import { isArray, isEmpty, isNumber } from '@sajari/react-sdk-utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { ResultValues } from './types';

dayjs.extend(utc);

type Input = {
  activeImageIndex?: number;
  values: ResultValues;
};

export type UseProductStatusOutput = {
  // To know if the selected product is on sale
  variantOnSale: boolean;
  // Whether there is at least one product in the list of variants is on sale
  onSale: boolean;
  outOfStock: boolean;
  newArrival: boolean;
  onSaleText: string;
  newArrivalText: string;
  outOfStockText: string;
};

export function useProductStatus({ activeImageIndex = 0, values }: Input): UseProductStatusOutput {
  const { quantity, price, originalPrice, salePrice, createdAt } = values;
  const { t } = useTranslation('result');

  const isNewArrival = useMemo(() => {
    if (!createdAt) {
      return false;
    }

    const parsedCreatedAt = dayjs(createdAt);
    const current = dayjs();

    return current.diff(parsedCreatedAt, 'day') <= 30 && activeImageIndex === 0;
  }, [createdAt, activeImageIndex]);

  const { isOnSale, isCurrentOnSale } = useMemo(() => {
    const sale = {
      isOnSale: false,
      isCurrentOnSale: false,
    };
    if (!price || (!originalPrice && !salePrice)) {
      return sale;
    }

    const parsePrices = (input: string | Array<string>) => (isArray(input) ? input : [input]).map(Number);
    // Check for the first element being an array - meaning this product has variant images - so we exclude the first one
    const prices = parsePrices(isArray(price[0]) ? price.slice(1) : price);
    const originalPrices = !originalPrice
      ? false
      : parsePrices(isArray(originalPrice[0]) ? originalPrice.slice(1) : originalPrice);
    const salePrices = !salePrice ? false : parsePrices(isArray(salePrice[0]) ? salePrice.slice(1) : salePrice);

    if (originalPrices) {
      if (originalPrices.length >= prices.length) {
        const atLeastOnSale = prices.some(
          (p, index) => isNumber(p) && isNumber(originalPrices[index]) && p < originalPrices[index],
        );
        sale.isOnSale = atLeastOnSale;

        sale.isCurrentOnSale = prices[activeImageIndex] < originalPrices[activeImageIndex];
        return sale;
      }
      if (originalPrices && originalPrices.length === 1 && prices.length > 1) {
        const [original] = originalPrices;
        const result = isNumber(original) && prices.some((p) => isNumber(p) && p < original);
        sale.isCurrentOnSale = result;
        sale.isOnSale = result;
        return sale;
      }
    }

    if (salePrices) {
      if (!salePrices.some((p) => p !== 0)) {
        return sale;
      }
      if (salePrices.length >= prices.length) {
        const atLeastOnSale = prices.some(
          (p, index) => isNumber(p) && isNumber(salePrices[index]) && p > salePrices[index],
        );
        sale.isOnSale = atLeastOnSale;
        sale.isCurrentOnSale = prices[activeImageIndex] > salePrices[activeImageIndex];
        return sale;
      }
      if (salePrices && salePrices.length === 1 && prices.length > 1) {
        const [localSalePrice] = salePrices;
        const result = isNumber(localSalePrice) && prices.some((p) => isNumber(p) && p > localSalePrice);
        sale.isOnSale = result;
        sale.isCurrentOnSale = result;
        return sale;
      }
    }

    return sale;
  }, [activeImageIndex]);

  const isOutOfStock = useMemo(() => {
    if (isEmpty(quantity)) {
      return false;
    }
    const parseQuantities = (input: string | Array<string>) => (isArray(input) ? input : [input]).map(Number);
    const quantities = parseQuantities(isArray(quantity[0]) ? quantity.slice(0) : quantity);

    return quantities.every((q) => q === 0);
  }, []);

  return {
    newArrival: isNewArrival,
    outOfStock: isOutOfStock,
    onSale: isOnSale,
    variantOnSale: isCurrentOnSale,
    outOfStockText: t('status.outOfStock'),
    onSaleText: t('status.onSale'),
    newArrivalText: t('status.newArrival'),
  };
}
