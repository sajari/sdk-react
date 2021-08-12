import { BoxProps } from '@sajari/react-components';

export interface MessageProps extends BoxProps {
  title: string;
  body?: string;
  showReset?: boolean;
  onReset?: () => void;
  loading?: boolean;
  appearance?: 'default' | 'loading' | 'error';
}
