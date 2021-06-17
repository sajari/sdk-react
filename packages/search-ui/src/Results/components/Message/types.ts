import { BoxProps } from '@sajari/react-components';

export interface MessageProps extends BoxProps {
  title: string;
  body?: string;
  showReset?: boolean;
  loading?: boolean;
  appearance?: 'default' | 'loading' | 'error';
}
