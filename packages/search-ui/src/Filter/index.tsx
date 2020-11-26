import React from 'react';

import ColorFilter from './ColorFilter';
import ListFilter from './ListFilter';
import RatingFilter from './RatingFilter';
import { FilterProps } from './types';

const Filter = ({ type = 'list', ...rest }: FilterProps) => {
  if (type === 'color') {
    return <ColorFilter {...rest} />;
  }

  if (type === 'rating') {
    return <RatingFilter {...rest} />;
  }

  return <ListFilter {...rest} />;
};

export default Filter;
