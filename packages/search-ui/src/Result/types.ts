import React from 'react';

export interface Result {
  url?: string;
  title: string;
  image?: string;
  description?: string;
  category?: string;
  rating?: number;
  price?: string;
}

interface Props extends Result {
  appearance?: 'row' | 'grid';
  ratingMax?: number;
}

export interface ResultProps extends Props, Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {}
