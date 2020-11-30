import { BoxProps, ImageProps } from '@sajari/react-components';

export type ColumnValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GapValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ApperanceValue = 'list' | 'grid';

export interface ResultsProps extends Omit<BoxProps, 'children'> {
  appearance?: ApperanceValue;
  defaultAppearance?: ApperanceValue;
  ratingMax?: number;
  imageAspectRatio?: ImageProps['aspectRatio'] | Record<ApperanceValue, ImageProps['aspectRatio']>;
  imageObjectFit?: ImageProps['objectFit'] | Record<ApperanceValue, ImageProps['objectFit']>;
  currencyCode?: string;
  columnMinWidth?: number;
  columns?: ColumnValue | Record<number, ColumnValue>;
  gap?: GapValue | Record<number, GapValue>;
  children?: (results: Record<string, any>[], appearance: ApperanceValue, index: number) => React.ReactNode;
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
