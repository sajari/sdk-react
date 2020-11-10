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
  // Maxium of shown items when the list is collapsed
  limit?: number;
  // If true, display an input for searching through filter items
  searchable?: boolean;
  // If true, sort selected items on top
  sortable?: boolean;
}

export interface ColorFilterProps extends BaseFilterProps {
  type: 'color';
}

export type FilterProps = ListFilterProps | ColorFilterProps;
