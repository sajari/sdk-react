import { ResultProps } from '../Result';

export interface ResultsProps {
  appearance?: ResultProps['appearance'];
}

export interface ResultValues {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  url: string;
}
