import { BoxProps } from '@sajari/react-components';

export interface MessageProps extends BoxProps {
  title: string;
  body?: string;
  loading?: boolean;
  appearance?: 'default' | 'loading';
}
