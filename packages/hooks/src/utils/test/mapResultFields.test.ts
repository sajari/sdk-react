import { mapFields } from '../mapResultFields';

test.each([
  [{ brand: 'Sajari', title: 'Lorem' }, { category: 'brand' }, { category: 'Sajari', title: 'Lorem' }],
  [{ title: 'Ipsum', cost: '12.3' }, { price: 'cost' }, { title: 'Ipsum', price: '12.3' }],
  [{ desc: 'Lorem ipsum' }, {}, { desc: 'Lorem ipsum' }],
])('mapFields(%o, %o)', (values, fields, expected) => {
  expect(mapFields(values, fields)).toStrictEqual(expected);
});
