/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import tw, { styled } from 'twin.macro';

import { IconStar } from '../assets/icons';
import { __DEV__ } from '../utils/assertion';
import { toRatingArray } from '../utils/rating';
import { RatingItem } from './RatingItem';
import { ItemType, RatingItemProps, RatingProps } from './types';

const StyledBox = styled.div<{ flipped: boolean }>`
  ${({ flipped }) =>
    flipped
      ? tw`inline-flex flex-row-reverse items-center space-x-1 space-x-reverse`
      : tw`inline-flex items-center space-x-1`};
`;

const Rating = React.forwardRef(
  (
    {
      value,
      children,
      character = <IconStar css={tw`fill-current`} />,
      max = 5,
      direction = 'ltr',
      unit = 'star',
    }: RatingProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const isHalf = Math.round(value) - value !== 0;
    const flipped = direction === 'rtl';
    const label = isHalf
      ? `Rating: ${value} point 5 out of ${max} ${unit}s`
      : `Rating: ${value} out of ${max} ${unit}s`;
    const arr = toRatingArray(value, max);

    return (
      <StyledBox flipped={flipped} ref={ref} role="img" aria-label={label}>
        {arr.map((type, i) => {
          switch (type) {
            case ItemType.Filled:
              return <RatingItem key={`active-rating-${i}`} index={i} count={max} character={character} active />;
            case ItemType.HalfFilled:
              return (
                <RatingItem
                  key="half-active-rating"
                  index={Math.ceil(value) - Math.floor(value)}
                  count={max}
                  flipped={flipped}
                  character={character}
                  active
                  half
                />
              );
            case ItemType.Empty:
              return (
                <RatingItem key={`inactive-rating-${i}`} index={i} count={max} character={character} active={false} />
              );
            default:
              return null;
          }
        })}
        <span css={tw`sr-only`}>{`${value} ${unit}${value > 1 ? 's' : ''}`}</span>
        {children}
      </StyledBox>
    );
  },
);

if (__DEV__) {
  Rating.displayName = 'Rating';
}

export default Rating;
export type { RatingItemProps };
