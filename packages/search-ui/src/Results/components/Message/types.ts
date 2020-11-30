export interface MessageProps {
  title: string;
  body?: string;
  loading?: boolean;
  appearance?: 'default' | 'loading' | 'error';
}
