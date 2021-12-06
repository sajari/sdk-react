import { ItemType, RatingMaxmiumExceededError } from '../Rating/types';

export const toRatingArray: (value: number, max: number) => ItemType[] | null = (value, max) => {
  const isHalf = Math.round(value) - value !== 0;

  if (max - value < 0) {
    // eslint-disable-next-line no-console
    console.error(new RatingMaxmiumExceededError());
    return null;
  }

  return [
    ...Array.from<ItemType.Filled>(Array(Math.floor(value))).fill(ItemType.Filled),
    ...Array.from<ItemType.HalfFilled>(Array(isHalf ? 1 : 0)).fill(ItemType.HalfFilled),
    ...Array.from<ItemType.Empty>(Array(max - Math.ceil(value))).fill(ItemType.Empty),
  ];
};
