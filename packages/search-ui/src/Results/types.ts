import { ResultProps } from '../Result';

export interface ResultsProps {
  appearance?: ResultProps['appearance'];
}

// TODO: This should be a common type somewhere
export interface ResultValues {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  url: string;
}
