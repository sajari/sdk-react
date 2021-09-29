import { Rating } from '@sajari/react-components';
import React, { useCallback } from 'react';

import { useSearchUIContext } from '../ContextProvider';
import ListFilter from './ListFilter';
import { RatingFilterProps } from './types';

const RatingFilter = ({ name, title, hideCount, ratingMax }: Omit<RatingFilterProps, 'type'>) => {
  const { ratingMax: contextRatingMax, disableDefaultStyles, customClassNames } = useSearchUIContext();

  const renderRating = useCallback(
    (v: string) => (
      <Rating
        max={ratingMax ?? contextRatingMax}
        className={customClassNames.filter?.rating?.container}
        activeRatingItemClassName={customClassNames.filter?.rating?.activeRatingItem}
        activeHalfRatingItemClassName={customClassNames.filter?.rating?.activeHalfRatingItem}
        value={Number(v)}
        disableDefaultStyles={disableDefaultStyles}
      />
    ),
    [ratingMax, contextRatingMax, JSON.stringify(customClassNames.filter?.rating), disableDefaultStyles],
  );

  return (
    <ListFilter
      name={name}
      title={title}
      sort="alpha"
      sortAscending={false}
      pinSelected={false}
      itemRender={renderRating}
      hideCount={hideCount}
    />
  );
};

export default RatingFilter;
export type { RatingFilterProps };
