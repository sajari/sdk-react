import {
  ItemType,
  RatingMaxmiumExceededError
} from "../../components/Rating/types";
import { toRatingArray } from "../rating";

test.each([
  // valid
  // [value, max, throw, isValid, expected]
  [1, 2, false, true, [ItemType.FILLED, ItemType.EMPTY]],
  [1.3, 2, false, true, [ItemType.FILLED, ItemType.HALF_FILLED]],
  [1.5, 2, false, true, [ItemType.FILLED, ItemType.HALF_FILLED]],
  [2, 2, false, true, [ItemType.FILLED, ItemType.FILLED]],
  [0, 2, false, true, [ItemType.EMPTY, ItemType.EMPTY]],
  // invalid,
  [1, 2, false, false, [ItemType.FILLED, ItemType.FILLED]],
  [2, 2, false, false, [ItemType.FILLED, ItemType.HALF_FILLED]],
  [1.5, 2, false, false, [ItemType.HALF_FILLED, ItemType.EMPTY]],
  [1.5, 2, false, false, [ItemType.HALF_FILLED, ItemType.FILLED]],
  [1.5, 2, false, false, [ItemType.EMPTY, ItemType.FILLED]],
  [4, 3, true, false, [ItemType.EMPTY, ItemType.FILLED]]
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
