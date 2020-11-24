import { BoxProps, ImageProps } from '@sajari/react-components';

export type ColumnValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GapValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ResultsProps extends BoxProps {
  appearance?: 'list' | 'grid';
  ratingMax?: number;
  imageAspectRatio?: ImageProps['aspectRatio'];
  imageObjectFit?: ImageProps['objectFit'];
  currencyCode?: string;
  columnMinWidth?: number;
  columns?: ColumnValue | Record<number, ColumnValue>;
  gap?: GapValue | Record<number, GapValue>;
}

export interface ResultValues {
  _id: string;
  url: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  rating?: number;
  price?: string | string[];
  inventory?: string;
}
