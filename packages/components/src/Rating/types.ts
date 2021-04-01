import * as React from 'react';

import { BoxProps } from '../Box';

export interface RatingProps extends BoxProps {
  /** The rating value, accepts decimal to represent half rating */
  value: number;
  /** Maxium level, used to fill in the empty stars */
  max: number;
  /** Associated text */
  children?: React.ReactNode;
  /** The icon to show, defaults to star icon */
  character?: React.ReactNode | React.FC<RatingItemProps>;
  /** Direction */
  direction?: 'ltr' | 'rtl';
  /** Unit, used for labeling, default to "stars" */
  unit?: string;
  ratingItemClassName?: string;
  activeRatingItemClassName?: string;
  activeHalfRatingItemClassName?: string;
}

export interface InternalRatingItemProps extends BoxProps {
  /** Index */
  index: number;
  /** Total count */
  count: number;
  /** The icon to show, defaults to star icon */
  character: RatingProps['character'];
  /** Is half */
  half?: boolean;
  /** Is the current item active */
  active: boolean;
  /** Flip the half side around */
  flipped?: boolean;
}

export interface RatingItemProps {
  /** Its self pos */
  index: number;
  /** Total count */
  count: number;
}

export enum ItemType {
  Filled = 1,
  HalfFilled,
  Empty,
}

export class RatingMaxmiumExceededError extends Error {
  constructor() {
    super('Rating value exceeded the maximum threshold. Please specify a higher max value or lower the input value.');
  }
}
