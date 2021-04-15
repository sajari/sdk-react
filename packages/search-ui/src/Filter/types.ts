import { RangeInputProps } from '@sajari/react-components';
import { Range, SortType } from '@sajari/react-hooks';
import * as React from 'react';

export interface HeaderProps {
  title: React.ReactNode;
  name?: string;
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
  /** Maximum number of items to initially show. Maximum is 100. */
  limit?: number;
  /** If true, display an input for searching through items */
  searchable?: boolean;
  /** The placeholder for search input */
  placeholder?: string;
  /** If true, sort selected items on top */
  pinSelected?: boolean;
  /** How to sort the items */
  sort?: SortType;
  /** Sort in ascending order */
  sortAscending?: boolean;
  /** How to format the values */
  format?: 'default' | 'price';
  /** Hide total items count */
  hideCount?: boolean;
}

export interface ColorFilterProps extends BaseFilterProps {
  type: 'color';
}

export interface RatingFilterProps extends BaseFilterProps {
  type: 'rating';
  /** Hide total items count */
  hideCount?: boolean;
}

export interface TabFilterProps
  extends BaseFilterProps,
    Pick<ListFilterProps, 'format' | 'limit' | 'sort' | 'sortAscending'> {
  type: 'tabs';
  /** Hide total items count */
  hideCount?: boolean;
}

export interface RangeFilterProps
  extends BaseFilterProps,
    Pick<RangeInputProps<Range>, 'format' | 'showInputs' | 'steps' | 'tick' | 'ticks'> {
  type: 'range';
}

export interface SelectFilterProps extends BaseFilterProps, Pick<ListFilterProps, 'format' | 'sort' | 'sortAscending'> {
  type: 'select';
  /** Hide total items count */
  hideCount?: boolean;
}

export type FilterProps =
  | ColorFilterProps
  | ListFilterProps
  | RangeFilterProps
  | RatingFilterProps
  | SelectFilterProps
  | TabFilterProps;
