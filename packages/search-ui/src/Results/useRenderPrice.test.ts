import { ResultValues } from '@sajari/react-hooks';

import { useRenderPrice, UseRenderPriceInput, UseRenderPriceOutput } from './useRenderPrice';

const defaultValues: ResultValues = {
  _id: 'random-id',
  title: 'random-title',
  url: 'random-url',
};

test.each<[UseRenderPriceInput, UseRenderPriceOutput]>([
  [{ onSale: false, values: defaultValues, currency: 'USD' }, { displayPrice: '' }],
  [{ onSale: false, values: { ...defaultValues, price: '10.99' }, currency: 'USD' }, { displayPrice: '$10.99' }],
  [{ onSale: true, values: { ...defaultValues, price: '11.99' }, currency: 'USD' }, { displayPrice: '$11.99' }],
  [
    { onSale: true, values: { ...defaultValues, price: '8.99', originalPrice: '11.99' }, currency: 'USD' },
    { displayPrice: '$8.99', originalPrice: '$11.99' },
  ],
  [
    { onSale: true, values: { ...defaultValues, price: '11.99', salePrice: '8.99' }, currency: 'USD' },
    { displayPrice: '$11.99' },
  ],
  [
    {
      onSale: true,
      values: { ...defaultValues, price: '8.99', originalPrice: '11.99', salePrice: '8.99' },
      currency: 'AUD',
    },
    { displayPrice: 'A$8.99', originalPrice: 'A$11.99' },
  ],
  [
    {
      onSale: true,
      values: { ...defaultValues, price: '100000', originalPrice: '120000', salePrice: '100000' },
      currency: 'VND',
    },
    { displayPrice: '₫100,000', originalPrice: '₫120,000' },
  ],
])('useRenderPrice(%o)', (input, output) => {
  expect(useRenderPrice(input)).toEqual(output);
});
