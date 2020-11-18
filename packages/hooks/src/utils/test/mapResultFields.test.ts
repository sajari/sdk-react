import { mapFields } from '../mapResultFields';

test.each([
  [{ brand: 'Sajari', title: 'Lorem' }, { category: 'brand' }, { brand: 'Sajari', category: 'Sajari', title: 'Lorem' }],
  [{ title: 'Ipsum', cost: '12.3' }, { price: 'cost' }, { title: 'Ipsum', price: '12.3', cost: '12.3' }],
  [{ desc: 'Lorem ipsum' }, {}, { desc: 'Lorem ipsum' }],
  [{ max_price: 10 }, { price: ['variant_price', 'max_price'] }, { price: 10, max_price: 10 }],
  [
    { handle: 'a-sample-slug' },
    // eslint-disable-next-line no-template-curly-in-string
    { url: '`/products/${handle}`' },
    { url: '/products/a-sample-slug', handle: 'a-sample-slug' },
  ],
  [
    { level2: 'category_1 > category_2', level1: 'category_1' },
    { category: (data) => data.level4 || data.level3 || data.level2 || data.level1 },
    { category: 'category_1 > category_2', level2: 'category_1 > category_2', level1: 'category_1' },
  ],
  [
    {},
    {
      category: "!function return 'the category'",
    },
    { category: 'the category' },
  ],
])('mapFields(%o, %o)', (values, fields, expected) => {
  expect(mapFields(values, fields)).toStrictEqual(expected);
});
