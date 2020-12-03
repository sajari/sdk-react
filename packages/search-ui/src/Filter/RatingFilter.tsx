import { Rating } from '@sajari/react-components';
import React from 'react';

import { useSearchUIContext } from '../ContextProvider';
import ListFilter from './ListFilter';
import { RatingFilterProps } from './types';

const RatingFilter = ({ name, title }: Omit<RatingFilterProps, 'type'>) => {
  const { ratingMax, disableDefaultStyles, customClassNames } = useSearchUIContext();

  return (
    <ListFilter
      name={name}
      title={title}
      sort="none"
      pinSelected={false}
      itemRender={(v) => (
        <Rating
          max={ratingMax}
          className={customClassNames.filter?.rating?.container}
          activeRatingItemClassName={customClassNames.filter?.rating?.activeRatingItem}
          activeHalfRatingItemClassName={customClassNames.filter?.rating?.activeHalfRatingItem}
          value={Number(v)}
          disableDefaultStyles={disableDefaultStyles}
        />
      )}
    />
  );
};

export default RatingFilter;
export type { RatingFilterProps };
