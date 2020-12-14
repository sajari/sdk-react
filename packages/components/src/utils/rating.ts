import { ItemType, RatingMaximumExceededError } from '../Rating/types';

export const toRatingArray: (value: number, max: number) => ItemType[] = (value, max) => {
  const isHalf = Math.round(value) - value !== 0;

  if (max - value < 0) {
    throw new RatingMaximumExceededError();
  }

  return [
    ...Array.from<ItemType.Filled>(Array(Math.floor(value))).fill(ItemType.Filled),
    ...Array.from<ItemType.HalfFilled>(Array(isHalf ? 1 : 0)).fill(ItemType.HalfFilled),
    ...Array.from<ItemType.Empty>(Array(max - Math.ceil(value))).fill(ItemType.Empty),
  ];
};
