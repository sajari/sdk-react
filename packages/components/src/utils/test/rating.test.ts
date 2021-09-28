import { ItemType } from '../../Rating/types';
import { toRatingArray } from '../rating';

test.each([
  // valid
  // [value, max, isValid, expected]
  [1, 2, true, [ItemType.Filled, ItemType.Empty]],
  [1.3, 2, true, [ItemType.Filled, ItemType.HalfFilled]],
  [1.5, 2, true, [ItemType.Filled, ItemType.HalfFilled]],
  [2, 2, true, [ItemType.Filled, ItemType.Filled]],
  [0, 2, true, [ItemType.Empty, ItemType.Empty]],
  // invalid,
  [1, 2, false, [ItemType.Filled, ItemType.Filled]],
  [2, 2, false, [ItemType.Filled, ItemType.HalfFilled]],
  [1.5, 2, false, [ItemType.HalfFilled, ItemType.Empty]],
  [1.5, 2, false, [ItemType.HalfFilled, ItemType.Filled]],
  [1.5, 2, false, [ItemType.Empty, ItemType.Filled]],
  [4, 3, false, [ItemType.Empty, ItemType.Filled]],
])('value: %d, max: %d', (value, max, isValid, expected) => {
  if (isValid) {
    expect(toRatingArray(value, max)).toEqual(expected);
  } else {
    expect(toRatingArray(value, max)).not.toEqual(expected);
  }
});
