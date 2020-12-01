import React from 'react';

export interface HeaderProps {
  title: React.ReactNode;
  showReset?: boolean;
  onReset?: () => void;
}

export interface BoxProps extends HeaderProps {
  children: React.ReactNode;
}

interface BaseFilterProps {
  name: string;
  title: BoxProps['title'];
}

export interface ListFilterProps extends BaseFilterProps {
  type: 'list';
  itemRender?: (value: string) => React.ReactNode;
  /** Maximum number of items to show if the list is collapsed */
  limit?: number;
  /** If true, display an input for searching through items */
  searchable?: boolean;
  /** The placeholder for search input */
  placeholder?: string;
  /** If true, sort selected items on top */
  pinSelected?: boolean;
  /** How to sort the items */
  sort?: 'count' | 'alpha' | 'none';
  /** Sort in ascending order */
  sortAscending?: boolean;
}

export interface ColorFilterProps extends BaseFilterProps {
  type: 'color';
}

export interface RatingFilterProps extends BaseFilterProps {
  type: 'rating';
}

export interface TabFilterProps extends BaseFilterProps {
  type: 'tabs';
  /** Maxium number of tabs */
  limit?: ListFilterProps['limit'];
  /** How to sort the tabs */
  sort?: ListFilterProps['sort'];
  /** Sort in ascending order */
  sortAscending?: ListFilterProps['sortAscending'];
}

export type FilterProps = ListFilterProps | ColorFilterProps | RatingFilterProps | TabFilterProps;
