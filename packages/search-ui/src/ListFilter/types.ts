import React from 'react';

import { FilterBoxProps } from '../FilterBox/types';

export interface ListFilterProps {
  name: string;
  title: FilterBoxProps['title'];
  itemRender?: (value: string) => React.ReactNode;
  // Maxium of shown items when the list is collapsed
  limit?: number;
  // If true, display an input for searching through filter items
  searchable?: boolean;
  // If true, sort selected items on top
  sortable?: boolean;
}
