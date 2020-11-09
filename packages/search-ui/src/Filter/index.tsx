import React from 'react';

import ColorFilter from './ColorFilter';
import ListFilter from './ListFilter';
import { FilterProps } from './types';

const Filter = ({ type = 'list', ...rest }: FilterProps) => {
  if (type === 'color') {
    return <ColorFilter {...rest} />;
  }

  return <ListFilter {...rest} />;
};

export default Filter;
