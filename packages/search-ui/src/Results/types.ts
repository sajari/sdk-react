import { BoxProps, ImageProps } from '@sajari/react-components';
import { ResultValues } from '@sajari/react-hooks';

export type Template = {
  html: string;
  css: string;
};

export type ColumnValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GapValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ApperanceValue = 'list' | 'grid';

export interface ResultsProps extends BoxProps {
  appearance?: ApperanceValue;
  defaultAppearance?: ApperanceValue;
  showImage?: boolean;
  showVariantImage?: boolean;
  showStatus?: boolean;
  imageAspectRatio?: ImageProps['aspectRatio'] | Record<ApperanceValue, ImageProps['aspectRatio']>;
  imageObjectFit?: ImageProps['objectFit'] | Record<ApperanceValue, ImageProps['objectFit']>;
  columnMinWidth?: number;
  columns?: ColumnValue | Record<number, ColumnValue>;
  gap?: GapValue | Record<number, GapValue>;
  template?: Template;
}

export { ResultValues };
