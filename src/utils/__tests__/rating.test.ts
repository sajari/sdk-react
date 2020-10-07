import {
  ItemType,
  RatingMaxmiumExceededError
} from "../../components/Rating/types";
import { toRatingArray } from "../rating";

test.each([
  // valid
  // [value, max, throw, isValid, expected]
  [1, 2, false, true, [ItemType.Filled, ItemType.Empty]],
  [1.3, 2, false, true, [ItemType.Filled, ItemType.HalfFilled]],
  [1.5, 2, false, true, [ItemType.Filled, ItemType.HalfFilled]],
  [2, 2, false, true, [ItemType.Filled, ItemType.Filled]],
  [0, 2, false, true, [ItemType.Empty, ItemType.Empty]],
  // invalid,
  [1, 2, false, false, [ItemType.Filled, ItemType.Filled]],
  [2, 2, false, false, [ItemType.Filled, ItemType.HalfFilled]],
  [1.5, 2, false, false, [ItemType.HalfFilled, ItemType.Empty]],
  [1.5, 2, false, false, [ItemType.HalfFilled, ItemType.Filled]],
  [1.5, 2, false, false, [ItemType.Empty, ItemType.Filled]],
  [4, 3, true, false, [ItemType.Empty, ItemType.Filled]]
])("value: %d, max: %d", (value, max, willThrow, isValid, expected) => {
  if (willThrow) {
    expect(() => {
      toRatingArray(value, max);
    }).toThrowError(new RatingMaxmiumExceededError());
  } else {
    if (isValid) {
      expect(toRatingArray(value, max)).toEqual(expected);
    } else {
      expect(toRatingArray(value, max)).not.toEqual(expected);
    }
  }
});
