import { Rating } from '@sajari/react-components';
import React from 'react';

import { useSearchUIContext } from '../ContextProvider';
import ListFilter from './ListFilter';
import { RatingFilterProps } from './types';

const RatingFilter = ({ name, title }: Omit<RatingFilterProps, 'type'>) => {
  const { ratingMax } = useSearchUIContext();

  return <ListFilter name={name} title={title} itemRender={(v) => <Rating max={ratingMax} value={Number(v)} />} />;
};

export default RatingFilter;
export type { RatingFilterProps };
