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

export type UseProductStatusesOutput = {
  isOnSale: boolean;
  isOutOfStock: boolean;
  isNewArrival: boolean;
  onSaleText: string;
  newArrivalText: string;
  outOfStockText: string;
};

export function useProductStatuses({ activeImageIndex = 0, values }: Input): UseProductStatusesOutput {
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

  const isOnSale = useMemo(() => {
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

  const isOutOfStock = useMemo(() => {
    if (isEmpty(quantity)) {
      return false;
    }
    const parseQuantities = (input: string | Array<string>) => (isArray(input) ? input : [input]).map(Number);
    const quantities = parseQuantities(quantity);

    return quantities[activeImageIndex] === 0;
  }, [activeImageIndex]);

  return {
    isNewArrival,
    isOutOfStock,
    isOnSale,
    outOfStockText: t('status.outOfStock'),
    onSaleText: t('status.onSale'),
    newArrivalText: t('status.newArrival'),
  };
}
