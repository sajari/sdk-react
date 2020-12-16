/* eslint-disable react/no-array-index-key */

import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import React from 'react';
import tw from 'twin.macro';

import { IconSmallStar } from '../assets/icons';
import Box from '../Box';
import { toRatingArray } from '../utils/rating';
import { RatingItem } from './RatingItem';
import { ItemType, RatingItemProps, RatingProps } from './types';

const Rating = React.forwardRef((props: RatingProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    value,
    children,
    character = <IconSmallStar />,
    max = 5,
    direction = 'ltr',
    unit = 'star',
    activeHalfRatingItemClassName,
    activeRatingItemClassName,
    ratingItemClassName,
    styles: stylesProp,
    disableDefaultStyles = false,
    ...rest
  } = props;

  if (Number.isNaN(value)) {
    return null;
  }

  const isHalf = Math.round(value) - value !== 0;
  const flipped = direction === 'rtl';
  const label = isHalf ? `Rating: ${value} point 5 out of ${max} ${unit}s` : `Rating: ${value} out of ${max} ${unit}s`;
  const arr = toRatingArray(value, max);

  const styles = getStylesObject(
    {
      container: flipped
        ? tw`inline-flex flex-row-reverse items-center space-x-1 space-x-reverse`
        : tw`inline-flex items-center space-x-1`,
    },
    disableDefaultStyles,
  );

  return (
    <Box ref={ref} role="img" aria-label={label} css={[styles.container, stylesProp]} {...rest}>
      {arr.map((type, i) => {
        switch (type) {
          case ItemType.Filled:
            return (
              <RatingItem
                key={`active-rating-${i}`}
                index={i}
                count={max}
                character={character}
                className={classnames(ratingItemClassName, activeRatingItemClassName)}
                disableDefaultStyles={disableDefaultStyles}
                active
              />
            );

          case ItemType.HalfFilled:
            return (
              <RatingItem
                key="half-active-rating"
                index={Math.ceil(value) - Math.floor(value)}
                count={max}
                flipped={flipped}
                character={character}
                className={classnames(ratingItemClassName, activeHalfRatingItemClassName)}
                disableDefaultStyles={disableDefaultStyles}
                active
                half
              />
            );

          case ItemType.Empty:
            return (
              <RatingItem
                key={`inactive-rating-${i}`}
                index={i}
                count={max}
                character={character}
                active={false}
                className={ratingItemClassName}
                disableDefaultStyles={disableDefaultStyles}
              />
            );

          default:
            return null;
        }
      })}
      <Box as="span" css={tw`sr-only`}>{`${value} ${unit}${value > 1 ? 's' : ''}`}</Box>
      {children}
    </Box>
  );
});

if (__DEV__) {
  Rating.displayName = 'Rating';
}

export default Rating;
export type { RatingItemProps };
