import { BoxProps, ImageProps } from '@sajari/react-components';

export interface ResultsProps extends BoxProps {
  appearance?: 'list' | 'grid';
  ratingMax?: number;
  imageAspectRatio?: ImageProps['aspectRatio'];
  imageObjectFit?: ImageProps['objectFit'];
  currencyCode?: string;
}

export interface ResultValues {
  _id: string;
  url: string;
  title: string;
  image?: string;
  description?: string;
  category?: string;
  rating?: number;
  price?: string | string[];
}
