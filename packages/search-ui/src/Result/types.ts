import React from 'react';

interface Props {
  appearance?: 'row' | 'grid';
  url: string;
  title: string;
  image?: string;
  description?: string;
  category?: string;
  rating?: number;
  ratingMax?: number;
  price?: string;
}

export interface ResultProps extends Props, Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {}
