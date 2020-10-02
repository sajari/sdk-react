import {
  ItemType,
  RatingMaxmiumExceededError
} from "../components/Rating/types";

export const toRatingArray: (value: number, max: number) => ItemType[] = (
  value,
  max
) => {
  const isHalf = Math.round(value) - value !== 0;
  if (max - value < 0) {
    throw new RatingMaxmiumExceededError();
  }
  return [
    ...Array.from<ItemType.FILLED>(Array(Math.floor(value))).fill(
      ItemType.FILLED
    ),
    ...Array.from<ItemType.HALF_FILLED>(Array(isHalf ? 1 : 0)).fill(
      ItemType.HALF_FILLED
    ),
    ...Array.from<ItemType.EMPTY>(Array(max - Math.ceil(value))).fill(
      ItemType.EMPTY
    )
  ];
};
